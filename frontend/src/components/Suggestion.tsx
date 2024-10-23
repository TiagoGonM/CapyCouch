import React from "react";

import Chip from "@mui/material/Chip";
import { Stack } from "@mui/material";

import { list } from "../utils/paths"

type Props = {
  type: string;
  name: string;
  genres: string[];
  description: string;
  platforms: string[];
};

export const Suggestion = ({
  type,
  name,
  genres,
  description,
  platforms,
}: Props) => {
  const idx = list.findIndex((media: { name: string, path: string }) => (media.name == name));
  console.log(idx);

  const getPath = () => { 
    const path = list.find(
      (media: { name: string, path: string }) =>
        media.name === name)?.path || "https://via.placeholder.com/250x250" 
    return path;
  };

  return (
    <article className="p-4 w-64 rounded-xl bg-gray-800">
      <img
        className="w-full"
        src=""
        alt="<Media image>"
      />

      <section>
        <h1 className="font-bold inline-block">{name}</h1>
        <span className="text-sm pl-3 text-slate-500">{type === "movie" ? "película" : "serie"}</span>

        <p className="text-gray-400">{description.concat(".")}</p>
        <p>Disponible en: {platforms.join(", ")}</p>
        <div className="pt-2">
          <Stack direction="row" spacing={1}>
            {genres.map((genre, i) => (
              <Chip key={i.toString()} label={genre} variant="outlined" sx={{ color: "white" }} />
            ))}
          </Stack>
        </div>
      </section>
    </article>
  );
};
