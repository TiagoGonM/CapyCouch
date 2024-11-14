import { createSlice } from "@reduxjs/toolkit";
import { Media } from "../interfaces/interfaces";

interface InitState {
  suggestions: Media[];
  type: "group" | "user";
  id: string;
  loading: boolean;
  errorMessage: string;
}

export const suggestionSlice = createSlice({
  name: "suggestion",

  initialState: {
    suggestions: [],
    type: "user",
    id: "",
    loading: false,
    errorMessage: "",
  } as InitState,

  reducers: {
    setSuggestions: (state, { payload }: { payload: Media[] }) => {
      state.suggestions = payload;
    },

    setMeta: (state, { payload }) => {
      state.type = payload.type;
      state.id = payload.id;
    },

    setLoading: (state, { payload }: { payload: boolean }) => {
      state.loading = payload;
    },

    setErrorMessage: (state, { payload }: { payload: string }) => {
      state.errorMessage = payload;
    },
  },
});

export const {
  setSuggestions,
  setMeta,
  setLoading: setSuggestionLoading,
  setErrorMessage,
} = suggestionSlice.actions;
