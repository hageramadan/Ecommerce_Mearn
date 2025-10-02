import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./CartSlice";

export const myStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
