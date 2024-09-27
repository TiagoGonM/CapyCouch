import { createSlice } from "@reduxjs/toolkit";
import { Group } from "../interfaces/interfaces";

interface InitialState {
    groups: Group[];
}

export const groupSlice = createSlice({
    name: "group",
    initialState: {
        groups: []
    } as InitialState,
    reducers: {
        addGroups: (state, { payload } ) => {
            state.groups = payload;
        },
    }
});


export const { addGroups } = groupSlice.actions;