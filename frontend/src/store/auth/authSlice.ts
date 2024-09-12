import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking",
    user: {},
    errorMessage: undefined,
  },

  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },

    onLogin: (state, { payload }) => {
      state.status = "aunthenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },

    onLogout: () => {},
  },
});

export const { onChecking, onLogin } = authSlice.actions;

export default authSlice.reducer;