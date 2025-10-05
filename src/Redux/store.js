import { configureStore } from "@reduxjs/toolkit"
import { langSlice } from "./lang.slice.js"

export const myStroe = configureStore(
    {
        reducer:
        {
            langReducer : langSlice.reducer
        }
    }
)