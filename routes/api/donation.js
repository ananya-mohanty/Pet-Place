const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const path = require('path');

const GridFsStorage = require('multer-gridfs-storage');
const Donation = require('../../models/Donation');
const config = require('config');
const crypto = require('crypto');
var ipapi = require('ipapi.co');



// const fs = require('fs');
// //file upload
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

function custom_sort(a, b) {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
}
router.get('/', (req, res) => {
    Donation.find({}, (err, items) => {
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
                        res.json({ 'items': items, 'files': files })
                    }
            })
        }
    });
});



router.get('/:id', (req, res) => {
    Donation.findOne({_id:req.params.id})
        .then(donation => res.json(donation))
});


router.post('/', upload.array('files[]', 10),  (req, res, next) => {
    var callback = function (resp) {
        newDonation.location = resp
        newDonation.save().then(donation => res.json(donation));
    };
    
    const newDonation = new Donation({
        name: req.body.name,
        targetAmount: req.body.targetAmount,
        category: req.body.category,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description
    });

    req.files.forEach(function (fileobj) {
        newDonation.files.push(fileobj.id);
    })
    ipapi.location(callback)
    // res.send(newDonation)
});

module.exports = router;