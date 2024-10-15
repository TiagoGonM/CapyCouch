import { createSlice } from "@reduxjs/toolkit";
import { User } from '../interfaces/interfaces';

// TODO: Crear slice y respectivo hook para los usuarios (a lo mejor dsp habria que crear otro para los usuarios de un grupo)

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

export const { setUsers, setLoading } = userSlice.actions;
