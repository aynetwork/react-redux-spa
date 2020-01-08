import axios from "../../axios/azios-quiz"
import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR} from "./actionTypes"

export function fetchQuizes() {
    return async dispatch => {

        dispatch(fetchQuizesStart)

        try {
            const data = await axios.get("/quizes.json")
            const quizes = []


            Object.keys(data.data).forEach((key, index)=>{
                quizes.push({
                    id : key,
                    name : `test # ${index + 1}`
                })
            });

            dispatch(fetchQuizesSuccess(quizes))

            console.log(data.data)
        } catch (e) {
            dispatch(fetchQuizesError(e))

        }
    }
}

//ЭТО ТРИ ACTION CREATORA

//МЫ ДИСПАТЧИМ ДАННЫЕ
export function fetchQuizesStart() {
    return {
        type : FETCH_QUIZES_START
    }
}
export function fetchQuizesSuccess(quizes) {
    return {
        type : FETCH_QUIZES_SUCCESS,
        quizes
    }
}
export function fetchQuizesError(e) {
    return {
        type : FETCH_QUIZES_ERROR,
        error : e
    }
}