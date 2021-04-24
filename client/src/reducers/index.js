import { combineReducers } from 'redux'

import authReducer from './authReducer'

process.removeAllListeners('warning')
export default combineReducers({
    auth: authReducer
})