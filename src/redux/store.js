import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from './wishlist.slice.js'
const mystore = configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
});

export default mystore