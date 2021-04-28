const express = require('express');
const router = express.Router();
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
//Post model
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

var multer = require('multer');

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


//User model
const User = require('../../models/User');
const Ngo = require('../../models/Ngo');
//@desc Register new user
//@access Public
router.post('/', upload.array('files[]', 10), (req, res) => {
    console.log(req.files)
    const { name, email, password } = req.body;
    
    //simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' }); //bad request

    }
    //check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            const newUser = new User({
                name,
                email,
                password
            });

            //create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.profile_pic=(req.files[0].filename);
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )
                        });
                })
            })
        })
});

router.get('/image/:user/', function (req, res) {
    console.log('getting image')
    User.findById(req.params.user, (err, user)=>{
        global.gfs.files.findOne({filename:user.profile_pic}, function (err, file) {
            if (user == null) return
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
})

router.get('/image/ngo/:user/', function (req, res) {
    console.log('hi')
    Ngo.findById(req.params.user, (err, user) => {
        if(user==null) return
        global.gfs.files.findOne({ filename: user.profile_pic }, function (err, file) {
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
})

router.get('/isuser/:id', function (req, res) {
    User.findById(req.params.id, (err, user) => {
        if(user!=null)
            res.json({flag:true})

        else res.json({flag:false})
    })
})

module.exports = router;