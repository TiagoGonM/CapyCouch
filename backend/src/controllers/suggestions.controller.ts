import { RequestHandler } from "express";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { Media } from "../interfaces/interfaces";
import prisma from "../db/prisma";
import { MediaType } from "@prisma/client";

export const getUserSuggestions: RequestHandler = async (req, res) => {
  const { uid: id } = req.body;

  const [total, suggestions] = await Promise.all([
    prisma.userSuggestion.count({ where: { authorId: id } }),
    prisma.userSuggestion.findMany({ where: { authorId: id } }),
  ]);

  res.json({ total, suggestions });
};

export const getGroupSuggestions: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const [total, suggestions] = await Promise.all([
    prisma.groupSuggestion.count({ where: { groupId: id } }),
    prisma.groupSuggestion.findMany({ where: { groupId: id } }),
  ]);

  res.json({ total, suggestions });
};

const makePrompt = async (genres: string, likes: string, dislikes: string) => {
  const prompt = `Recomiéndame 7 películas y 10 series, basadas en la siguiente información: Me gustan los géneros: ${genres};  me gustan las peliculas o series como: ${likes};  no me gustan las peliculas o series como: ${dislikes}. Formatealo como una lista que tenga, separando cada contenido con comas: <película o serie>,<breve descrpción>,[generos],<tipo:pelicula o serie>,[plataformas donde ver]. Ejemplo: 1. El Padrino, Una película de mafiosos, [Drama, Crimen], Película, [Netflix, Amazon Prime].`;

  let { text } = await generateText({
    model: google("gemini-1.5-flash"),
    prompt,
  });

  return [text, prompt];
};

export const createSuggestion: RequestHandler = async (req, res) => {
  const {
    genres,
    likes,
    dislikes,
  }: { genres: string; likes: string; dislikes: string } = req.body;

  const { id: groupId } = req.params;
  const { uid: userId } = req.body;

  try {
    const moviesList: Media[] = [];
    const seriesList: Media[] = [];

    let [text, prompt] = await makePrompt(genres, likes, dislikes);
    text = text.replaceAll("*", "");
    const series = text.substring(text.indexOf("## Series:"), text.length);

    console.log({ text, series, genres, likes, dislikes });

    // TODO: make this prettier
    for (let i = 1; i <= 7; i++) {
      const [_, str] = text.split(`${i}. `);

      let [title, description, ...rest] = str.split(", ");
      let rest2 = rest.join(", ");

      const endI = rest2.indexOf("]");
      let genres = rest2.substring(rest2.indexOf("[") + 1, endI);
      rest2 = rest2.substring(endI + 3);

      let type = rest2.substring(0, rest2.indexOf(","));
      rest2 = rest2.substring(rest2.indexOf("[") + 1);

      let platforms = rest2.substring(0, rest2.indexOf("]"));
      rest2 = rest2.substring(rest2.indexOf("]\n") + 3);

      console.log({ i, title, description, genres, type, platforms });

      moviesList.push({
        title,
        description,
        genres: genres.split(", "),
        type,
        platforms: platforms.split(", "),
      });
    }

    for (let i = 1; i <= 10; i++) {
      const [_, str] = series.split(`${i}. `);

      let [title, description, ...rest] = str.split(", ");
      let rest2 = rest.join(", ");

      const endI = rest2.indexOf("]");
      let genres = rest2.substring(rest2.indexOf("[") + 1, endI);
      rest2 = rest2.substring(endI + 3);

      let type = rest2.substring(0, rest2.indexOf(","));
      rest2 = rest2.substring(rest2.indexOf("[") + 1);

      let platforms = rest2.substring(0, rest2.indexOf("]"));
      rest2 = rest2.substring(rest2.indexOf("]\n") + 3);

      console.log({ i, title, description, genres, type, platforms });

      seriesList.push({
        title,
        description,
        genres: genres.split(", "),
        type,
        platforms: platforms.split(", "),
      });
    }
    
    const list = moviesList.concat(seriesList);

    if (groupId) {
      list.forEach(async (suggestion) => {
        const { type, ...rest } = suggestion;
        await prisma.groupSuggestion.create({
          data: {
            type: type === "Serie" ? MediaType.series : MediaType.movie,
            group: {
              connect: {id: groupId}
            },
            ...rest
          },
        })
      })
    } else {
      list.forEach(async (suggestion) => {
        const { type, ...rest } = suggestion;
        await prisma.userSuggestion.create({
          data: {
            type: type === "Serie" ? MediaType.series : MediaType.movie,
            author: {
              connect: {id: userId}
            },
            ...rest
          },
        })
      })
    }

    res.json({ prompt, moviesList, seriesList });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al intentar realizar el prompt" });
    return;
  }
};
