import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    FINISH_QUIZ,
    QUIZ_SET_STATE, QUIZ_NEXT_QUESTION, RETRY_TEST
} from "../actions/actionTypes";

const initialState = {
    quizes : [],
    loading: false,
    error : null,
    activeQuestion : 0,
    answerState : null,
    results : {},
    isFinished : false,
    quiz : null
}

export default function quizReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case (FETCH_QUIZES_START):
            //полнстью копируется state через ....state
            //далее loading меняется на true
            return {
                ...state, loading: true
            }
        case (FETCH_QUIZES_SUCCESS):
            return {
                ...state, loading: false, quizes: action.quizes
            }
        case (FETCH_QUIZES_ERROR):
            return {
                ...state, loading: false, error:action.error
            }
        case (FETCH_QUIZ_SUCCESS):
            return {
                ...state, loading: false, quiz: action.quiz
            }
        case (QUIZ_SET_STATE):
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            }
        case (FINISH_QUIZ):
            return {
                ...state,
                isFinished: action.isFinished,
            }
        case (QUIZ_NEXT_QUESTION):
            return {
                ...state,
                answerState: null,
                activeQuestion: action.number
            }
        case (RETRY_TEST):
            return {
                ...state,
                activeQuestion : 0,
                answerState : null,
                isFinished : false,
                results : {}
            }
        default:
            return state;

    }
}