import axios from "../../axios/azios-quiz"
import {
    CHANGE_NAME
} from "./actionTypes"

export function changeName() {
    return dispatch => {
        dispatch({
            type : CHANGE_NAME
        })
    }
}