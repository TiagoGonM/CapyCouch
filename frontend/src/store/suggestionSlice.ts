import { createSlice } from "@reduxjs/toolkit";
import { Media } from "../interfaces/interfaces";

interface InitialState {
  suggestions: Media[];
}

export const suggestionSlice = createSlice({
  name: "suggestion",

  initialState: {
    suggestions: [],
  } as InitialState,

  reducers: {
    setSuggestions: (state, { payload }: { payload: Media[] }) => {
      state.suggestions = payload;
    },
  },
});

export const { setSuggestions } = suggestionSlice.actions;
