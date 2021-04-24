import axios from 'axios'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
} from './types'

import history from '../history'


export const register = ({ name, email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    
    const body = JSON.stringify({ name, email, password })
    axios.post('/api/users', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            history.push('/')
            history.go(0)
            
        })
        .catch(err => {
            dispatch({
                type: REGISTER_FAIL
            })
        })
}
export const registerngo = ({ name, email, password, contact, address }) => dispatch => {
    console.log(name, email, address)
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password, contact, address })
    axios.post('/api/ngoregister', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            history.push('/')
            history.go(0)
        })
        .catch(err => {
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

export const login = ({ email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    console.log("huaa")
    const body = JSON.stringify({ email, password })
    console.log(email)
    axios.post('/api/auth', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            
            history.push('/')
            history.go(0)
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

export const logout = () => {
    return ({
        type: LOGOUT_SUCCESS
    })
}