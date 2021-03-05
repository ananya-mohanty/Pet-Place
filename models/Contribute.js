const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContributeSchema = new Schema({
    donor: {
        type: String,
        required: true
    },
    cause_ID: {
        type: String
    },
    amount:{
        type: Number,
        default:0
    },
    date_of_transaction: {
        type: String
       
    },
    user_ID: {
        type: String,
        required: true
    },
    order_ID: {
        type: String,
        required: true
    }

});

module.exports = Contribute = mongoose.model('contribute', ContributeSchema);