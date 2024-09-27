import { createSlice } from "@reduxjs/toolkit";
import { Media } from "../interfaces/interfaces";

interface InitialState {
  suggestions: {
    movies: Media[];
    series: Media[];
  };
}

export const suggestionSlice = createSlice({
  name: "suggestion",
  initialState: {
    suggestions: {
      movies: [],
      series: [],
    },
  } as InitialState,
  reducers: {
    addSuggestion: (state, { payload }) => {
    //   payload.map((media) => {
    //     if (media.type === MediaType.Película)
    //       state.suggestions.movies.push(media);
    //     else state.suggestions.series.push(media);
    //   });
    },
  },
});

export const { addSuggestion } = suggestionSlice.actions;
