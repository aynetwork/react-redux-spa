import {CHANGE_NAME} from "../actions/actionTypes";

const initialState = {
    name : "Geod"
};

export default function myReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_NAME:
            return {
                ...state,
                name : "Геод"
            };
        default:
            return {
                ...state
            }
    }
}