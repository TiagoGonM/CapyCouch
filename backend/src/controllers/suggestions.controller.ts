import { RequestHandler } from "express";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { Media } from "../interfaces/interfaces";

const makePrompt = async (genres: string, likes: string, dislikes: string) => {
  const prompt = `Recomiéndame 7 películas y 10 series, basadas en la siguiente información: Me gustan los géneros: ${genres};  me gustan las peliculas o series como: ${likes};  no me gustan las peliculas o series como: ${dislikes}. Formatealo como una lista que tenga, separando cada contenido con comas: <película o serie>,<breve descrpción>,[género],<tipo:pelicula o serie>,[plataformas donde ver].`;
  let { text } = await generateText({
    model: google("gemini-1.5-flash"),
    prompt,
  });

  return [text, prompt];
};

export const createSuggestion: RequestHandler = async (req, res) => {
  const { genres, likes, dislikes }: {genres: string, likes: string, dislikes: string} = req.body;

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

    res.json({ prompt, moviesList, seriesList });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al intentar realizar el prompt" });
    return;
  }
};
