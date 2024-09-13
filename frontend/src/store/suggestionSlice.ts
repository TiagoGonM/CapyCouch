import { createSlice } from "@reduxjs/toolkit";

export const suggestionSlice = createSlice({
    name: "suggestion",
    initialState: {
        suggestions: {}
    },
    reducers: {
        addSuggestion: (state, { payload }) => {
            state.suggestions = payload;
        }
    }
});


export const { addSuggestion } = suggestionSlice.actions;