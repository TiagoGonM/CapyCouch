import React from "react";

import { useSuggestionStore } from "../hooks/stores";

interface Props {
  name: string;
  image: string | null;
  minAge: number;
  maxAge: number;
  id: string;
}

export const Group = ({ name, image, minAge, maxAge, id }: Props) => {
  const { getSuggestionsById } = useSuggestionStore();

  return (
    <div className={`pb-2`}>
      <article
        onClick={() => getSuggestionsById(id)}
        className="flex bg-gradient-to-r hover:rounded-xl hover:translate-x-5 rounded-tl-lg rounded-bl-lg pl-1 transition-all cursor-pointer"
      >
        <aside>
          <img
            className="rounded-full"
            width={50}
            height={50}
            src={image || "https://via.placeholder.com/50x50"}
            alt="group"
          />
        </aside>
        <section className="pl-3 grid grid-flow-row grid-cols-1 grid-rows-2 shrink-0">
          <h1 className="text-[#c4853a] font-bold overflow-clip">{name}</h1>
          <p>
            {minAge}-{maxAge}
          </p>
        </section>
      </article>
    </div>
  );
};
