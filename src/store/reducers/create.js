import {CREATE_QUIZ_QUIESTION, RESET_QUIZ_CREATION} from "../actions/actionTypes";
import axios from '../../axios/azios-quiz'
const initialState = {
    quiz : []
}

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUIZ_QUIESTION:
            return {
                ...state,
                quiz : [...state.quiz, action.item] //нам надо избежать мутирования, поэтому применяется такая конструкция
            }
        case RESET_QUIZ_CREATION:
            return {
                ...state,
                quiz : []
            }
        default:
            return state;

    }
}