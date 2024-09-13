import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: {};
  errorMessage: string | undefined;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
    user: {},
    errorMessage: undefined
  } as InitialState,

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
  },
});

export const { onChecking, onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;