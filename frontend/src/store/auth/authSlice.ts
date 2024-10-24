import { createSlice } from "@reduxjs/toolkit";

interface InitState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: {
    id?: string;
    username?: string;
    email?: string;
    firstTime?: boolean;
    genres?: string[];
    likes?: string[];
    dislikes?: string[];
    age?: number;
  };
  errorMessage?: string;
}

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    status: "not-authenticated",
    user: {},
    errorMessage: undefined,
  } as InitState,

  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },

    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },

    onLogout: (state) => {
      state.status = "not-authenticated";
      state.user = {};
    },

    onUser: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, onUser } = authSlice.actions;

export default authSlice.reducer;
