import { createSlice } from "@reduxjs/toolkit";
import { Group } from "../interfaces/interfaces";

interface InitialState {
  groups: Group[];
  loading: boolean;
}

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    groups: [],
    loading: true,
  } as InitialState,
  reducers: {
    addGroups: (state, { payload }) => {
      state.groups = payload;
    },
    setGroupLoading: (state, { payload }) => {
      state.loading = payload;
    }
  },
});

export const { addGroups, setGroupLoading } = groupSlice.actions;
