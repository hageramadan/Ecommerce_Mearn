import { applyMiddleware, createStore } from "redux";
import combineReducers from "./compineReducres.js"; // Fixed filename
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

export const myStore = createStore(
    combineReducers, 
    composeWithDevTools(applyMiddleware(thunk))
);