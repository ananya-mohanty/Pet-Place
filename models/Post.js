const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: false
    },
    caption: {
        type: String,
        required: false
    },
    files:
    {
        type: Array,
        required: false
    },

    filetype:
    {
        type: String
    },

    likes: {
        type: Number,
        required: true,
    },
    applicants: {
        type: Array,
        required: false
    },
    time:{
        type: String,
        required: false
    }
});

const Post = module.exports = mongoose.model('Post', PostSchema);