const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {MessageSchema} = require('./Message')

//create schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    messages: {
        type: Map,
        of: [MessageSchema],
        default: {}
    },
    liked_posts: {
        type: Array,
        required:false,
        default:[]       
    }
});

module.exports = User = mongoose.model('user', UserSchema);