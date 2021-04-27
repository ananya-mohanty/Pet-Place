const express = require('express');
const router = express.Router();
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const config = require('config');
const crypto = require('crypto');
const auth = require('../../middleware/auth');
var multer = require('multer');

//message model
const {Message} = require('../../models/Message');
//user model
const User = require('../../models/User');

//files
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


router.get('/image/:filename', function (req, res) {
    console.log("idhr")
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
    console.log("popop")
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


//@route  GET api/messages/:id/:id_user2
//@desc   Get all messages between this user and user2
//@access Private
router.get('/:id/:id2', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            // res.json(user)
            var msgs=[]
            if(user.messages.has(req.params.id2))
            {
                msgs = user.messages.get(req.params.id2);
            }
            
                     res.json(msgs)
                    // global.gfs.files.find().toArray(function (err, files) {
                    //     if (err) console.log(err);
                    //     else
                    //     {
                    //         res.json({'msgs':msgs, 'files':files})
                    //     }
                    // })
        });
});

router.get('/:id', (req, res)=>{
    User.findById(req.params.id)
        .then(user => {
            var msgs = user.messages
            // global.gfs.files.find().toArray(function (err, files) {
            //     if (err) console.log(err);
            //     else
            //     {
            //         res.json({'msgs':msgs, 'files':files})
            //     }
            // })
            res.json(msgs)
        });
})

//@route  POST api/messages/:id/:id2
//@desc   add a message in chats of this user and user2
//@access Private
router.post('/:id/:id2', upload.array('files[]', 10), (req, res) => {
    const t=req.body.text
    const s = t.substring(0, Math.min(t.length, 10))

    User.findById(req.params.id)
        .then(user => {
            User.findById(req.params.id2)
                .then(user2 => {
                    const { text, position, type, uri } = req.body
                    console.log("here")
                    console.log(type)
                    var urivar = null
                    var typevar = type
                    if(type=='photo'){
                    urivar = "http://localhost:5000/api/messages/image/" + req.files[0].filename
                    }
                    else if(type=='video'){
                        console.log(uri)
                        console.log(req.files[0].filename)
                        try {  
                        urivar = "http://localhost:5000/api/messages/video/" + req.files[0].filename
                        } catch(err) {
                            console.log(err)
                        }
                        typevar = 'file'
                    }
                    else if(type!='text'){
                        console.log("here")
                    urivar = "http://localhost:5000/api/messages/document/" + req.files[0].filename
                    }
                    console.log("idhr")
                    const newMessage1 = new Message({
                        sender: user.name,
                        receiver: user2.name,
                        text: text,
                        position: 'right',
                        subtitle: s,
                        type: typevar,
                        data: {uri: urivar}
                    });
                    req.files.forEach(function (fileobj) {
                        newMessage1.files.push(fileobj.id);
                    })
                    newMessage1.save()
                    console.log(newMessage1)
                    temp = []

                    if (user.messages.has(req.params.id2)) {
                        temp = user.messages.get(req.params.id2)
                    }
                    temp.push(newMessage1)
                    user.messages.set(req.params.id2, temp)
                    // console.log(user.messages)
                    user.markModified('messages')
                    user.save()
                        .then(()=>{
                    const newMessage2 = new Message({
                        sender: user.name,
                        receiver: user2.name,
                        text: text,
                        position: 'left',
                        subtitle: s,
                        type: typevar,
                        data: {uri: urivar}
                    });
                    req.files.forEach(function (fileobj) {
                        newMessage2.files.push(fileobj.id);
                    })
                    newMessage2.save()
                    temp = []

                    if (user2.messages.has(req.params.id)) {
                        temp = user2.messages.get(req.params.id)
                    }
                    temp.push(newMessage2)
                    user2.messages.set(req.params.id, temp)
                    // console.log(user2.messages)
                    user2.markModified('messages')
                    user2.save()
                        .then(/*console.log(user2)*/)
                        .catch(err => console.log(err))
                })})})
                    .catch(err => console.log(err))})


//@route  DELETE api/items/:id1/:id2
//@desc   Delete an item
//@access Private
// router.delete('/:id1/:id2', auth, (req, res) => {
//     User.findById(req.params.id1)
//         .then(user => {
//             Item.findOne({_id: req.params.id2})
//                 .then(item => {
//                     var index = user.cartItems.indexOf(item);
//                     console.log("haaaaa"+index);
//                     user.cartItems.splice(index, 1);
//                     user.save();
//                     res.json(user);
//                 })
//         })
// });

// function auth(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     } else {
//         return res.status(401).json('Please login to make changes to cart')
//     }
// }



module.exports = router;