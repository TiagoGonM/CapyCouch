import React from "react";
import Chip from "@mui/material/Chip";
import { Stack } from "@mui/material";

type Props = {
  type: "Película" | "Serie";
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
  return (
    <article className="p-4 w-64 rounded-xl bg-gray-800">
      <section>
        <img
          className="w-full"
          src="https://via.placeholder.com/250x250"
          alt="Media image"
        />
      </section>
      <section>
        <h1 className="font-bold inline-block">{name}</h1>
        <span className="text-sm pl-3 text-slate-500">{type}</span>

        <p className="text-gray-400">{description}</p>
        <p>Disponible en: {platforms}</p>
        <div className="pt-2">
          <Stack direction="row" spacing={1}>
            {genres.map((genre) => (
              <Chip key={name} label={genre} variant="outlined" sx={{color: "white"}} />
            ))}
          </Stack>
        </div>
      </section>
    </article>
  );
};
