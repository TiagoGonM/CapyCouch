import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  type: "user" | "group";
  id: string;
}

export const ctxSuggestionSlice = createSlice({
  name: "ctxSuggestion",
  initialState: {
    type: "user",
    id: "",
  } as InitialState,
  reducers: {
    setCurrent: (state, { payload }) => {
      state.type = payload.type;
      state.id = payload.id;
    },
  },
});

export const { setCurrent } = ctxSuggestionSlice.actions;
