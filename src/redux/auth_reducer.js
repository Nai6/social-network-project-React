import { stopSubmit } from "redux-form";
import { authAPI, secureAPI } from "../api/api";

const SET_USER_DATA = 'AUTH/SET_USER_DATA'
const GET_CAPTCHA_SUCCESS = 'AUTH/GET_CAPTCHA_SUCCESS'

let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
    captchaURL: null

}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }
        case GET_CAPTCHA_SUCCESS: {
            return {
                ...state,
                captchaURL: action.captchaURL
            }
        }
        default:
            return state;
    }
}

export const setUserData = (email, id, login, isAuth) => ({ type: SET_USER_DATA, data: { email, id, login, isAuth } })
export const getCaptchaSuccess = (captchaURL) => ({ type: GET_CAPTCHA_SUCCESS, captchaURL })

export const getUserData = () => {
    return async (dispatch) => {
        const response = await authAPI.headerGet()
        
        if (response.data.resultCode === 0) {
            let { email, id, login } = response.data.data
            dispatch(setUserData(email, id, login, true))
        }
    }
}

export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe, captcha)

        if (response.data.resultCode === 0) {
            dispatch(getUserData())
        }
        else {
            if (response.data.resultCode===10) {
                const response = await secureAPI.getCaptcha()
                dispatch(getCaptchaSuccess(response.data.url))
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(stopSubmit("login", { _error: message }))
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        const response = await authAPI.logout()

        if (response.data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false))
        }
    }
}

export default authReducer;