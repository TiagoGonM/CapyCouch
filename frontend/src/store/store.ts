import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  suggestionSlice,
  groupSlice,
  userSlice,
  ctxSuggestionSlice,
} from ".";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    group: groupSlice.reducer,
    suggestion: suggestionSlice.reducer,
    user: userSlice.reducer,
    // ctxSuggestion: ctxSuggestionSlice.reducer, // FIXME: used before declaration error
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
