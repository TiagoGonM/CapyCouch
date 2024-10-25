import React from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

type Props = {
  name: string;
  genres?: string[];
  image?: string;
  isGroup: boolean;
};

export const SuggestionContext = ({ name, genres, image, isGroup }: Props) => {
  return (
    <article className="flex">
      <aside>
        <img
          className="rounded-full"
          width={50}
          height={50}
          src={image || "https://via.placeholder.com/50x50"}
          alt={isGroup ? "group" : "name"}
        />
      </aside>
      <section className="pl-3 grid grid-flow-row grid-cols-1 grid-rows-2 shrink-0">
        <h1 className="text-[#c4853a] font-bold overflow-hidden">{name}</h1>
        {!genres?.length ? (
          <p className="text-[#ff7d7d]">No hay generos</p>
        ) : (
          <Stack direction="row" spacing={1}>
            {genres.map((genre, i) => (
              <Chip
                key={i.toString()}
                label={genre}
                size="small"
                variant="outlined"
                sx={{ color: "white", borderColor: "#53beff" }}
              />
            ))}
          </Stack>
        )}
      </section>
    </article>
  );
};
