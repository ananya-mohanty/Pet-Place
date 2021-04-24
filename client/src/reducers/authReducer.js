import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
} from '../actions/types'


const initialState = {
    isLoading: false,
    user: JSON.parse(window.localStorage.getItem('user'))
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            window.localStorage.setItem('user', JSON.stringify(action.payload.user))
            return {
                ...state,
                isLoading: false,
            }

        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            window.localStorage.removeItem('user')
            return {
                ...state,
                isLoading: false
            }

        default:
            return state
    }
}