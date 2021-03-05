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
    const newContribute = new Contribute({
        
        donor: req.body.donor,
        cause_ID: req.body.cause_ID,
        amount: req.body.amount,
        user_ID: req.body.user_ID,
        date_of_transaction: req.body.date_of_transaction
   
    });
    

    newContribute.save().then(contribute => res.json(contribute));
});


router.post('/orders', (req, res) => {
    const newContribute = new Contribute({
        
        donor: req.body.donor,
        cause_ID: req.body.cause_ID,
        amount: req.body.amount,
        user_ID: req.body.user_ID,
        order_ID: 0
        // receipt: user_ID + "_" + cause_ID,

   
    });
   
    var options = {
        amount: newContribute.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      instance.orders.create(options, function(err, order) {
        console.log(order.id);
        newContribute.order_ID = order.id;
        console.log(newContribute.order_ID);
        newContribute.save().then(contribute => res.json(contribute));
      });

     
});

module.exports = router;