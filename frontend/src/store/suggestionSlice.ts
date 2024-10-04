import { createSlice } from "@reduxjs/toolkit";
import { Media } from "../interfaces/interfaces";

interface InitialState {
  suggestions: Media[]
}

export const suggestionSlice = createSlice({
  name: "suggestion",
  
  initialState: {
    suggestions: []
  } as InitialState,

  reducers: {
    addSuggestion: (state, { payload }: { payload: Media[] }) => {
      state.suggestions = payload;
    },
  },
});

export const { addSuggestion } = suggestionSlice.actions;
