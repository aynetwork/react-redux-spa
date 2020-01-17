import axios from "../../axios/azios-quiz"
import {
    FETCH_QUIZ_ERROR,
    FETCH_QUIZ_START,
    FETCH_QUIZ_SUCCESS
} from "./actionTypes"

export function fetchQuiz() {
    return async dispatch => {

        dispatch(fetchQuizStart)

        try {
            const data = await axios.get("/quizes.json")
            const quizes = []


            Object.keys(data.data).forEach((key, index)=>{
                quizes.push({
                    id : key,
                    name : `test # ${index + 1}`
                })
            });

            dispatch(fetchQuizSuccess(quizes))

            console.log(data.data)
        } catch (e) {
            dispatch(fetchQuizError(e))

        }
    }
}

//ЭТО ТРИ ACTION CREATORA

//МЫ ДИСПАТЧИМ ДАННЫЕ

export function fetchQuizStart() {
    return {
        type : FETCH_QUIZ_START
    }
}
export function fetchQuizSuccess(quiz) {
    return {
        type : FETCH_QUIZ_SUCCESS,
        quiz
    }
}
export function fetchQuizError(e) {
    return {
        type : FETCH_QUIZ_ERROR,
        error : e
    }
}