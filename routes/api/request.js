const express = require('express');
const router = express.Router();
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
//Post model
const AdoptPet = require('../../models/Adopt');
const Adopter = require('../../models/Adopter');
const config = require('config');
const crypto = require('crypto');
// const fs = require('fs');
// //file upload
var multer = require('multer');
var ipapi = require('ipapi.co');

router.get('/:id', (req, res) => {

    Adopter.find({ownerID:req.params.id}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).json("An error occured.");
        }
        else {
            global.gfs.files.find().toArray(function (err, files) {
                if (err) console.log(err);
                else {
                    console.log('hello')
                    // items.sort(custom_sort)
                    res.json({ 'items': items})
                    console.log(items)

                }
            })
        }
    });
    console.log(req.params)
    
});


router.put('/', (req, res) => {
    // console.log(req.body.formData.donationID)
    // let t = parseInt(req.body.formData.currentAmount) + parseInt(req.body.formData.amount);
     Adopter.findByIdAndUpdate(req.body.formData.applicationID,{status: 'Approved'},(err,doc)=>{
      //this will give you the document what you want to update.. then 
     if(err){
       console.log(err)
     }
     else{
         console.log('Application approved successfully')
   
   }
      });
     
      console.log('HELLO')

    console.log(req.params.formData)
    
});

module.exports = router;