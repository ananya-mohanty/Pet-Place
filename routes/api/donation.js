const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Donation = require('../../models/Donation');

router.post('/',  (req, res) => {
    const newDonation = new Donation({
        name: req.body.name,
        image: req.body.image,
        currentAmount: req.body.currentAmount,
        targetAmount: req.body.targetAmount,
        category: req.body.category,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        location: req.body.location,
        description: req.body.description
    });

    // res.send(newDonation);
    newDonation.save().then(donation => res.json(donation));
});

module.exports = router;