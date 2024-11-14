import { createSlice } from "@reduxjs/toolkit";
import { Group } from "../interfaces/interfaces";

interface InitState {
  groups: Group[];
  loading: boolean;
}

export const groupSlice = createSlice({
  name: "group",
  
  initialState: {
    groups: [],
    loading: true,
  } as InitState,

  reducers: {
    addGroups: (state, { payload }) => {
      state.groups = payload;
    },

    setLoading: (state, { payload }) => {
      state.loading = payload;
    }
  },
});

export const { addGroups, setLoading: setGroupLoading } = groupSlice.actions;
