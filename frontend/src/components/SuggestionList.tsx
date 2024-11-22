import React from "react";
import Carousel from "react-slick";

import { Suggestion } from "./Suggestion";
import { useSuggestionStore } from "../hooks/stores";

export const SuggestionList = () => {
  const { suggestions, loading } = useSuggestionStore();

  return (
    <div className="w-[1200px] ml-10">
      <div className="slider-container">
        {!suggestions.length ? (
          <h1 className="text-[#707070] text-center pl-5 pb-3">
            {!loading ? "No hay sugerencias" : "Cargando sugerencias..."}
          </h1>
        ) : (
          <Carousel slidesToShow={4} slidesToScroll={4}>
            {suggestions.map((suggestion, i) => (
              <>
              <p>{i}</p>
              <Suggestion
                key={suggestion.description}
                type={suggestion.type}
                name={suggestion.title}
                description={suggestion.description}
                genres={suggestion.genres}
                platforms={suggestion.platforms}
              />
              </>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};
