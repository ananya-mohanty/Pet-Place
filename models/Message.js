const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    avatar: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true,
        default: ""
    },
    text:{
        type: String,
        required: true,
        default: ""
    },
    unread:{
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        required: true,
        default: 'text'
    },
    position: {
        type: String,
        required: true,
        default: 'right'
    }
}, {timestamps : true});

module.exports.MessageSchema = MessageSchema
module.exports.Message = mongoose.model('Message', MessageSchema);