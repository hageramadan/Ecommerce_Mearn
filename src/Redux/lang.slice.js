import { createSlice } from "@reduxjs/toolkit";



export const langSlice = createSlice(
    {
        name : "lang",
        initialState : "en",
        reducers : {
            toggeleTheme : (state) => {
                (state === "en") ? state = "ar" : state = "en";
            }
        }
    }
)

export const { toggeleTheme } = langSlice.actions;

