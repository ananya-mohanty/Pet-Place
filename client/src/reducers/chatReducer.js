import {ADD_MESSAGE, DELETE_MESSAGE, GET_MESSAGES, GET_MESSAGE_LIST} from '../actions/types'

const initialState = {
    userMessages: [],
    messageList: [],
    // files: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MESSAGES:
            // console.log(action.payload)
            return {
                ...state,
                userMessages: action.payload,
                // files: action.payload.files
            };
        
        case GET_MESSAGE_LIST:
            return{
                ...state,
                messageList: action.payload
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