import {ADD_MESSAGE, DELETE_MESSAGE, GET_MESSAGES} from '../actions/types'

const initialState = {
    userMessages: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MESSAGES:
            return {
                ...state,
                userMessages: action.payload
            };
        // case DELETE_MESSAGE:
        //     const ind = state.cartItems.findIndex(item => item._id === action.payload)
        //     return {
        //         ...state,
        //         cartItems: [...state.cartItems.slice(0, ind),
        //                     ...state.cartItems.slice(ind + 1)],
        //         displayCart: true
        //     };
        case ADD_MESSAGE:
            return {
                ...state,
                userMessages: [...state.userMessages, action.payload]
            }
        default:
            return state;
    }
}