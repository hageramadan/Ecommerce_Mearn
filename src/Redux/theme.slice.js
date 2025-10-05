import { createSlice } from "@reduxjs/toolkit";



export const themeSlice = createSlice(
    {
        name : "theme",
        initialState : "light",
        reducers : {
            toggeleTheme : (state) => {
               return (state === "light") ? state = "dark" : state = "light";
            }
        }
    }
)

export const { toggeleTheme } = themeSlice.actions;

