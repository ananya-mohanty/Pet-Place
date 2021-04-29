const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdopterSchema = new Schema({
    userID: {

        type: String,
        required: true
    },
    postID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sex:{
        type: String
    },
    annualIncome:{
        type: Number
    },
    age: {
        type: Number,
        required: true
    },
    marital_status:{
        type: String,
        required: true
    },
   
    location: {
        type: Object
    },
    description: {
        type: String,
    }

});

const Adopter = module.exports = mongoose.model('Adopter', AdopterSchema);