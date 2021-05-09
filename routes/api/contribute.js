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

router.post('/:id',  (req, res) => {


  console.log(req.body)
    const newContribute = new Contribute({
    

        donor: req.body.formData.name,
        cause: req.body.formData.cause,
        amount: req.body.formData.amount,
        user_ID: req.body.formData.userID,
        donationDrive: req.body.formData.donation,
        contactNo:  req.body.formData.contactNo,
        emailID:  req.body.formData.emailID,
        donationID: req.body.formData.donationID

   
    });

    const time = Date.now()
    const today = new Date(time)
    newContribute.date_of_transaction = today;

    console.log(newContribute);

    newContribute.save().then(contribute => res.json(contribute));
    updateStatus(req,res);
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
      updateStatus(req,res);


});
router.route("/update").put(function(req, res) {
  myteam.updateOne({ name: "Sadio Mane" }, { country: "Senegal" }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

function updateStatus(req, res) {
 console.log(req.body.formData.donationID)
 let t = parseInt(req.body.formData.currentAmount) + parseInt(req.body.formData.amount);
  Donation.findByIdAndUpdate(req.body.formData.donationID,{currentAmount: t},(err,doc)=>{
   //this will give you the document what you want to update.. then 
  if(err){
    console.log(err)
  }
  else{
  console.log('cureent' + doc.currentAmount + ' ' + req.body.formData.amount )
  // });
}
   });
  
   console.log('HELLO')


  }

module.exports = router;