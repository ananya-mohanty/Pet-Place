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
    img:
    {
        data: Buffer,
        contentType: String
    },
    likes: {
        type: Number,
        required: true,
    },
    applicants: {
        type: Array,
        required: false
    },
});

const Post = module.exports = mongoose.model('Post', PostSchema);