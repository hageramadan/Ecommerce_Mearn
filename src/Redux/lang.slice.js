import { createSlice } from "@reduxjs/toolkit";



export const langSlice = createSlice(
    {
        name : "lang",
        initialState : "en",
        reducers : {
            toggeleLang : (state) => {
                return (state === "en") ? state = "ar" : state = "en";
            }
        }
    }
)

export const { toggeleLang } = langSlice.actions;

