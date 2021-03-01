const express = require('express');
const router = express.Router();

const {Donation} = require('../../models/Donation');

// router.get('/donations', (req, res) => {
//     Donation.find()
//         .sort({date: -1})
//         .then(donations => res.json(donations))
// });
// router.get('/donations/:id', (req, res) => {
//     Donation.findOne({_id:req.params.id})
//         .then(donation => res.json(donation))
// });

router.post('/donations', auth, (req, res) => {
    // const newDonation = new Donation({
    //     name: req.body.name,
    //     image: req.body.image,
    //     currentAmount: req.body.currentAmount,
    //     targetAmount: req.body.targetAmount,
    //     category: req.body.category,
    //     startDate: req.body.startDate,
    //     endDate: req.body.endDate,
    //     location: req.body.location,
    //     description: req.body.description
    // });

    res.send(newDonation);
    // newDonation.save().then(donation => res.json(donation));
});

// function auth(req, res, next) {
//     //console.log(req.user)
//     if (req.isAuthenticated()) {
//         return next();
//     } else {
//         return res.status(401).json('Please login to make changes to cart')
//     }
// }

module.exports = router;