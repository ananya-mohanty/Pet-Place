const express = require('express');
const router = express.Router();

const Donation = require('../../models/Donation');
const Contribute = require('../../models/Contribute');

var Razorpay = require('razorpay');
var key_secret= 'wOSIYB6DIw8rM8pa4z3eoS1K';
var instance = new Razorpay({
    key_id: 'rzp_test_7RXXwMYbbnrNza',
    key_secret: 'wOSIYB6DIw8rM8pa4z3eoS1K'
  });



router.post('/',  (req, res) => {
  console.log(req.body)
    const newContribute = new Contribute({
    

        donor: req.body.formData.name,
        cause: req.body.formData.cause,
        amount: req.body.formData.amount,
        user_ID: req.body.formData.userID,
        donationDrive: req.body.formData.donation,
        contactNo:  req.body.formData.contactNo,
        emailID:  req.body.formData.emailID

   
    });

    const time = Date.now()
    const today = new Date(time)
    newContribute.date_of_transaction = today;

    console.log(newContribute);

    newContribute.save().then(contribute => res.json(contribute));

});


router.post('/orders', (req, res) => {
    const newContribute = new Contribute({
        
        donor: req.body.donor,
        cause_ID: req.body.cause_ID,
        amount: req.body.amount,
        user_ID: req.body.user_ID,
        order_ID: 0
    });
    var options = {
        amount: newContribute.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid" 
      };
      instance.orders.create(options, function(err, order) {
        console.log(order.id);
        newContribute.order_ID = order.id;
        console.log(newContribute.order_ID);
        newContribute.save().then(contribute => res.json(contribute));
      });     
});

module.exports = router;