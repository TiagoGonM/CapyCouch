import { RequestHandler } from "express";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { Media } from "../interfaces/interfaces";
import { MediaType } from "@prisma/client";
import prisma from "../db/prisma";

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

const makePrompt = async (
  genres: string[],
  likes: string[],
  dislikes: string[],
  moviesLimit: number,
  seriesLimit: number
) => {
  const prompt = `Recomiéndame ${moviesLimit} PELÍCULAS y ${seriesLimit} SERIES, basadas en la siguiente información: Me gustan los géneros: ${genres}; me gustan las películas o series como: ${likes}; no me gustan las películas o series como: ${dislikes}. Formatéalo como un JSON BIEN HECHO con los campos: title, genres, description, type (siendo type entre "series" y "movie"), platforms (plataformas de streaming donde se puede ver). Reemplaza cualquier doble comilla (") que pueda tener el título o la descripción por comillas simples ('). No recomiendes las películas o series que ya haya visto, es decir, las que me gustan y las que no me gustan.`;

  let { text } = await generateText({
    model: google("gemini-1.5-flash"),
    prompt,
  });

  return [text, prompt];
};

export const createSuggestion: RequestHandler = async (req, res) => {
  let { series, movies } = req.query;

  const {
    genres,
    likes,
    dislikes,
  }: { genres: string[]; likes: string[]; dislikes: string[] } = req.body;

  const { id: groupId } = req.params;
  const { uid: userId } = req.body;

  try {
    const list: Media[] = [];

    let [suggestions, prompt] = await makePrompt(genres, likes, dislikes, 5, 5);

    suggestions = JSON.parse(suggestions.substring(7, suggestions.length - 3));
    for (let suggestion of suggestions as any) {
      list.push({
        title: suggestion.title,
        description: suggestion.description,
        genres: suggestion.genres,
        type: suggestion.type === "series" ? MediaType.series : MediaType.movie,
        platforms: suggestion.platforms,
      });
    }

    if (groupId) {
      return list.forEach(async (suggestion) => {
        await prisma.groupSuggestion.create({
          data: {
            ...suggestion,
            group: {
              connect: { id: groupId },
            },
          },
        });
      });
    }

    list.forEach(async (suggestion) => {
      await prisma.userSuggestion.create({
        data: {
          ...suggestion,
          author: {
            connect: { id: userId },
          },
        },
      });
    });

    return res.json({ prompt, suggestions });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "Error al intentar realizar el prompt" });
  }
};

export const deleteSuggestionsByGroup: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.groupSuggestion.deleteMany({ where: { groupId: id } });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "Error al intentar eliminar las sugerencias del grupo" });
  }
};

export const deleteSuggestionsByUser: RequestHandler = async (req, res) => {
  const { uid } = req.body;

  try {
    await prisma.userSuggestion.deleteMany({ where: { authorId: uid } });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "Error al intentar eliminar las sugerencias del grupo" });
  }
};
