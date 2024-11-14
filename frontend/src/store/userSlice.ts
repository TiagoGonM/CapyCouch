import { createSlice } from "@reduxjs/toolkit";
import { User } from '../interfaces/interfaces';

interface InitState {
  users: User[];
  loading: boolean;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
  } as InitState,
  reducers: {
    setUsers(state, { payload }) {
      state.users = payload;
    },

    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
});

export const { setUsers, setLoading: setUserLoading } = userSlice.actions;
