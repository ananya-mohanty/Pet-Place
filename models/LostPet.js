const mongoose = require('mongoose');

const LostPetSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: 'lost'
    },
    lastseen: {
        type: String,
        required: false
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
    time: {
        type: String,
        required: false
    },
});

const LostPet = module.exports = mongoose.model('LostPet', LostPetSchema);