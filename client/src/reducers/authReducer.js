import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
} from '../actions/types'


const initialState = {
    isLoading: false,
    token:null,
    user: JSON.parse(window.localStorage.getItem('user')),
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            window.localStorage.setItem('user', JSON.stringify(action.payload.user))
            window.localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                isLoading: false,
            }

        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            window.localStorage.removeItem('user')
            window.localStorage.removeItem('token')
            return {
                ...state,
                isLoading: false
            }

        default:
            return state
    }
}