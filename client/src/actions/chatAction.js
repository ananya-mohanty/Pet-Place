import {ADD_MESSAGE, DELETE_MESSAGE, GET_MESSAGES, GET_MESSAGE_LIST} from './types'
import axios from 'axios'

export const getMessages = (id_user2) => dispatch => {

    const user = JSON.parse(window.localStorage.getItem('user'))
    if(user == null)
    return;
    axios.get(`../api/messages/${user.id}/${id_user2}`)
        .then(res => {
            dispatch({
                type: GET_MESSAGES,
                payload: res.data
            })
        }
        )
        .catch(err => console.log(err));
};

export const getMessageList = () => dispatch => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user == null)
        return;
    axios.get(`../api/messages/${user.id}/`)
        .then(res => {
            dispatch({
                type: GET_MESSAGE_LIST,
                payload: res.data
            })
        }
        )
        .catch(err => console.log(err));
};

export const addMessage = (text, position, id_user2) => (dispatch, getState) => {
    console.log('I am in addMessage')
    
    const user = JSON.parse(window.localStorage.getItem('user'));
    if(user == null)
    return;
    axios({
        method: 'post',
        url: `../api/messages/${user.id}/${id_user2}`,
        data: {
          text: text,
          position: position
        }
      })
      .then(res => {
        dispatch({
            type: ADD_MESSAGE,
            payload: res.data
        })}
    )
      .catch(err => console.log(err));

};

// export const deleteMessage = (itemid) => (dispatch, getState) => {
//     const user = JSON.parse(window.localStorage.getItem('user'));
//     if(user == null)
//     return;
//     console.log("heyyyy")
//     axios.delete(`../api/cart/${user.id}/${itemid}`).then(res => {
//         console.log("hollaaa")
//         dispatch({
//             type: DELETE_ITEM,
//             payload: itemid
//         })}
//     )
//     .catch(err => console.log(err));

// };
