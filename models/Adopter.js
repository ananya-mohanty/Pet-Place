const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdopterSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    marital_status:{
        type: String,
        required: true

    },

    files:
    {
        type: Array,
        required: false
    },
    location: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        
    },
    status:{
        type: String,
        default:'available'
    }

});

const Adopter = module.exports = mongoose.model('Adopter', AdopterSchema);