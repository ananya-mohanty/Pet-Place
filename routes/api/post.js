const express = require('express');
const router = express.Router();
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
//Post model
const Post = require('../../models/Post');
const config = require('config');
const crypto = require('crypto');
const auth = require('../../middleware/auth');

// const fs = require('fs');
// //file upload
var multer = require('multer');
const User = require('../../models/User');

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
const storage = new GridFsStorage({
    url: config.get('mongoURI'),
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                //  const filename = file.originalname;
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const original = file.originalname;
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                    metadata: original
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

router.get('/', auth, (req, res) => {
    function custom_sort(a, b) {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    }
    Post.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).json("An error occured.");
        }
        else {
            global.gfs.files.find().toArray(function (err, files) {
                if (err) console.log(err);
                else
                {
                    items.sort(custom_sort)
                    res.json({'items':items, 'files':files})
                }
            })
        }
    });
});

router.post('/', auth, upload.array('files[]', 10), (req, res, next) => {
    const time= Date.now()
    const today= new Date(time)
   console.log(req.body.user)
    var post = new Post({
        user_name: JSON.parse(req.body.user).name,
        user_id: JSON.parse(req.body.user).id,
        caption: req.body.caption,
        likes: 0,
        time: today,
    })
        
    req.files.forEach(function (fileobj) {
        post.files.push(fileobj.id);
    })
    post.save().then(res.json(post))
});

router.get('/image/:filename', function (req, res) {
    global.gfs.files.findOne({ filename: req.params.filename }, function (err, file) {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            })
        }
        //check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/jpg' || file.contentType === 'image/png') {
            //read output to browser
            const readStream = gfs.createReadStream(file.filename);
            readStream.pipe(res);
        } else {
            return res.status(404).json({
                err: 'Not an image'
            })
        }
    })
})

router.get('/video/:filename', function (req, res) {
    global.gfs.files.findOne({ filename: req.params.filename }, function (err, file) {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            })
        }

        //check if image
        if (file.contentType === 'video/mp4' || file.contentType === 'video/ogg' || file.contentType === 'video/webm') {
            //read output to browser
            const readStream = gfs.createReadStream(file.filename);
            readStream.pipe(res);
        } else {
            return res.status(404).json({
                err: 'Not a video'
            })
        }
    })


})


router.get('/document/:filename', function (req, res) {
    global.gfs.files.findOne({ filename: req.params.filename }, function (err, file) {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            })
        }
        //console.log(file.metadata);
        //check if image
        if (file.contentType === 'application/pdf' || file.contentType === 'application/octet-stream' || file.contentType === 'text/plain' || file.contentType === 'application/x-zip-compressed') {
            //read output to browser
            const readStream = gfs.createReadStream(file.filename);
            readStream.pipe(res);
        } else {
            return res.status(404).json({
                err: 'Not a document'
            })
        }
    })


})

router.post('/like/:id', auth, (req, res) => {
    Post.findById(req.params.id, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).json("An error occured.");
        }
        else 
        {
            items[0].likes++;
            items.save()
            res.json({'items':items})
        }
        }
    );
});

module.exports = router;