import { applyMiddleware, createStore } from "redux";
import combineReducers from "./compineReducres.js"; // اسم الملف ثابت
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; // صحح الاستيراد

export const myStore = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
