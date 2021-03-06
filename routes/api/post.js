const express = require('express');
const router = express.Router();
const path = require('path');


const fs = require('fs');
//file upload
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

//Post model
const Post = require('../../models/Post');

router.get('/', (req, res) => {
    Post.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).json("An error occured.");
        }
        else {
            res.json(items);
        }
    });
});

router.post('/', upload.single('image'), (req, res, next) => {
    var post = new Post({
        caption: req.body.caption,
        likes: 0,
        img: {
            data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    })
    post.save()
    res.json("Post Uploaded")
});
module.exports = router;