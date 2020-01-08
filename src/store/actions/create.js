import axios from "../../axios/azios-quiz"
import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISH_QUIZ,
    RETRY_TEST,
    QUIZ_NEXT_QUESTION
} from "./actionTypes"

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

export function quizSetState(answerState, results) {
    return {
        type : QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function quizSetFinished() {
    return {
        type : FINISH_QUIZ,
        isFinished : true
    }
}

export function quizNextQuestion(number) {
    return {
        type : QUIZ_NEXT_QUESTION,
        number
    }
}


export function fetchQuizById(quizId) {
    console.log(quizId)
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data;

            dispatch(fetchQuizSuccess(quiz))

        } catch (e){
            dispatch(fetchQuizesError(e))
        }
    }
}


export function quizAnswerClick(answerId) {

    return (dispatch, getState) =>{
        const state = getState().quiz;

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === "success") {
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results
        if (parseInt(question.rightAnswerId) === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetState({
                [answerId] : 'success'
            }, results))


            const timeout = window.setTimeout(()=>{
             if (quizFinished(state)){

                 dispatch(quizSetFinished({
                     isFinished : true
                 }, results))

                } else {
                    /*this.setState()*/
                 dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout);
            }, 1000);

        } else {

            results[question.id] = 'error'

            dispatch(quizSetState({
                [answerId] : 'error'
            }, results))

          /*  this.setState({
                answerState : {
                    [answerId] : 'error'
                },
                results
            }, function () {
                console.log(this.state);

            })*/
        }

        console.log('Answer id : ' + answerId);
    };
}

function quizFinished(state) {
    return !!state.activeQuestion >= state.quiz.length - 1
}

export function retryHandler() {
    return dispatch =>{
        dispatch(retr())
    }
}

export function retr() {
    return {
        type : RETRY_TEST
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
export function fetchQuizSuccess(quiz) {
    return {
        type : FETCH_QUIZ_SUCCESS,
        quiz
    }
}
export function fetchQuizesError(e) {
    return {
        type : FETCH_QUIZES_ERROR,
        error : e
    }
}