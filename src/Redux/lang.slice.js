import { createSlice } from "@reduxjs/toolkit";
import en from "../Local/en.js";
import ar from "../Local/ar.js";



export const langSlice = createSlice(
    {
        name : "lang",
        initialState :
        {
            lang : "en",
            content : en
        },
        reducers : {
            toggeleLang : (state) => {
                if (state.lang === "en") {
                    state.lang = "ar";
                    state.content = ar;
                } else {
                    state.lang = "en";
                    state.content = en;
                }
            }
        }
    }
)

export const { toggeleLang } = langSlice.actions;

