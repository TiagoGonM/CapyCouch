import { createSlice } from "@reduxjs/toolkit";

export const groupSlice = createSlice({
    name: "group",
    initialState: {
        groups: {}
    },
    reducers: {
        addGroup: (state, { payload } ) => {
            state.groups = payload;
        },
    }
});


export const { addGroup } = groupSlice.actions;