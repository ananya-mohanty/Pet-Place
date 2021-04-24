const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const NgoSchema = new Schema({
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
    contact:{
        type: String,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = Ngo = mongoose.model('ngo', NgoSchema);