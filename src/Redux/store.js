import { configureStore } from "@reduxjs/toolkit"
import { langSlice } from "./lang.slice.js"
import { themeSlice } from "./theme.slice.js"
import { wishlistSlice } from "./wishlist.slice.js"

export const myStroe = configureStore(
    {
        reducer:
        {
            langReducer : langSlice.reducer,
            themeReducer : themeSlice.reducer,
            wishlistReducer : wishlistSlice.reducer
        }
    }
)