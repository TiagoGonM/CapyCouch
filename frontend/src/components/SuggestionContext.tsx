import React from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import { useGroupStore, useSuggestionStore } from "../hooks/stores";

export const ContextGroup = ({}) => {
  const { id } = useSuggestionStore();
  const { groups } = useGroupStore();

  const relatedGroup = groups.find((group) => group.id === id);
  if (!relatedGroup) return null;

  return (
    <article className="flex">
      <aside>
        <img
          className="rounded-full"
          width={50}
          height={50}
          src={relatedGroup.image || "https://via.placeholder.com/50"}
          alt="group"
        />
      </aside>
      <section className="pl-3 grid grid-flow-row grid-cols-1 grid-rows-2 shrink-0">
        <h1 className="text-[#c4853a] font-bold overflow-hidden">{relatedGroup.name}</h1>
        {!relatedGroup.genres.length && <p className="text-[#ff7d7d]">No hay generos</p>}
        <Stack direction="row" spacing={1}>
            {relatedGroup.genres.map((genre, i) => (
              <Chip key={i.toString()} label={genre} size="small" variant="outlined" sx={{ color: "white", borderColor: "#53beff" }} />
            ))}
        </Stack>
      </section>
    </article>
  );
  // TODO: mover el form de sugerencias -> autoagregar los likes, dislikes y los generos al crear un grupo
};
