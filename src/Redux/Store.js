import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./langSlice.js";

export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});
