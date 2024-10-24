import { createSlice } from "@reduxjs/toolkit";
import { Media } from "../interfaces/interfaces";

interface InitState {
  suggestions: Media[];
  type: "group" | "user";
  id: string;
}

export const suggestionSlice = createSlice({
  name: "suggestion",

  initialState: {
    suggestions: [],
    type: "user",
    id: "",
  } as InitState,
  
  reducers: {
    setSuggestions: (state, { payload }: { payload: Media[] }) => {
      state.suggestions = payload;
    },

    setMeta: (state, { payload }) => {
      state.type = payload.type;
      state.id = payload.id;
    }
  },
});

export const { setSuggestions, setMeta } = suggestionSlice.actions;
