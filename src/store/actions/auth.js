import axios from 'axios'
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQAjyQ14bTO9wGCF8OLlprritzHTQipyc'
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQAjyQ14bTO9wGCF8OLlprritzHTQipyc'
        }
        const response = await axios.post(url, authData)
        const data = response.data;
        const expiration_date = new Date(new Date().getTime()) + data.expiresIn * 1000;
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('user_id', data.localId)
        localStorage.setItem('expirationDate', expiration_date)
        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }
}

export function autoLogin() {

}

export function autoLogout(expiresIn) {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout())
        }, expiresIn * 1000)
    }
}
export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('expirationDate')
    return {
        type : AUTH_LOGOUT
    }

}

export function authSuccess(token) {
    return {
        type : AUTH_SUCCESS,
        token
    }
}