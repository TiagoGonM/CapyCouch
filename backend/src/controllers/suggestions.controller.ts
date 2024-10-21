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

const makePrompt = async (genres: string, likes: string, dislikes: string) => {
  const prompt = `Recomiéndame 7 PELÍCULAS y 10 SERIES, basadas en la siguiente información: Me gustan los géneros: ${genres}; me gustan las peliculas o series como: ${likes}; no me gustan las peliculas o series como: ${dislikes}. Formatealo como un JSON con los campos: title, genres, description, type (siendo type entre "series" y "movie"), platforms (plataformas de streaming donde se puede ver).`;

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
    const list: Media[] = [];

    let [suggestions, prompt] = await makePrompt(genres, likes, dislikes);
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

    res.json({ prompt, suggestions });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al intentar realizar el prompt" });
    return;
  }
};
