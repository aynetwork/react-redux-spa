import {combineReducers} from "redux";
import quizReducer from "./quiz";
import createReducer from "./create";
import authReducer from "./auth";
import myReducer from "./my";

export default combineReducers({
    quiz: quizReducer,
    create : createReducer,
    my : myReducer,
    auth : authReducer
})