const express = require('express');
const router = express.Router();
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
//Post model
const LostPet = require('../../models/LostPet');
const config = require('config');
const crypto = require('crypto');
// const fs = require('fs');
// //file upload
var multer = require('multer');
var ipapi = require('ipapi.co');


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

router.get('/', (req, res) => {
    function custom_sort(a, b) {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    }
    LostPet.find({status: 'lost'}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).json("An error occured.");
        }
        else {
            global.gfs.files.find().toArray(function (err, files) {
                if (err) console.log(err);
                else {
                    items.sort(custom_sort)
                    res.json({ 'items': items, 'files': files })
                }
            })
        }
    });
});

router.post('/', upload.array('files[]', 10), (req, res, next) => {
    var callback = function (resp) {
        post.location = resp
        post.save().then(p => res.json(p));
    };
    const time = Date.now()
    const today = new Date(time)
    var post = new LostPet({
        description: req.body.description,
        lastseen: req.body.lastseen,
        time: today,
        user_id:JSON.parse(req.body.user).id
    })

    req.files.forEach(function (fileobj) {
        post.files.push(fileobj.id);
    })
    ipapi.location(callback)

});

router.get('/found', (req, res) => {
    function custom_sort(a, b) {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    }
    LostPet.find({status:'found'}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).json("An error occured.");
        }
        else {
            global.gfs.files.find().toArray(function (err, files) {
                if (err) console.log(err);
                else {
                    items.sort(custom_sort)
                    res.json({ 'items': items, 'files': files })
                }
            })
        }
    });
});

router.post('/found', upload.array('files[]', 10), (req, res, next) => {
    var callback = function (resp) {
        post.location = resp
        post.save().then(p => res.json(p));
    };
    const time = Date.now()
    const today = new Date(time)
    var post = new LostPet({
        description: req.body.description,
        lastseen: req.body.lastseen,
        time: today,
        status: 'found'
    })

    req.files.forEach(function (fileobj) {
        post.files.push(fileobj.id);
    })
    ipapi.location(callback)

});

router.get('/image/:filename', function (req, res) {
    gfs.files.findOne({ filename: req.params.filename }, function (err, file) {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            })
        }
        console.log(file.originalname);
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

module.exports = router;