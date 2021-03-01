const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    currentAmount:{
        type: String,
        required: true,
        default:"0"
    },
    targetAmount: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        default: "" 
    },
});

module.exports = Donation = mongoose.model('donation', DonationSchema);