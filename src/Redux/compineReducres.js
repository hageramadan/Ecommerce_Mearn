import { combineReducers } from "redux";
import loginReducer from "./Reducers/loginReducer.js";

export default combineReducers({
    auth: loginReducer  // Changed from 'token' to 'auth' for better naming
});