const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Donation = require('../../models/Donation');
const Contribute = require('../../models/Contribute');

var Razorpay = require('razorpay');
var key_secret= 'WPxl0fvyGeV0d9t0Q4JkmHOu';
var instance = new Razorpay({
    key_id: 'rzp_test_vD3ROTXl5eQm7N',
    key_secret: 'WPxl0fvyGeV0d9t0Q4JkmHOu'
  });

  const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

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

// function updateStatus(req, res) {
//  console.log(req.body.formData.donationID)
//  let t = parseInt(req.body.formData.currentAmount) + parseInt(req.body.formData.amount);
//   Donation.findByIdAndUpdate(req.body.formData.donationID,{currentAmount: t},(err,doc)=>{
//    //this will give you the document what you want to update.. then 
//   if(err){
//     console.log(err)
//   }
//   else{
//   console.log('cureent' + doc.currentAmount + ' ' + req.body.formData.amount )
//   // });
// }
//    });
  
//    console.log('HELLO')


//   }

  router.post("/orders", async (req, res) => {
    try {
      const newContribute = new Contribute({
        
        donor: req.body.formData.name,
                cause: req.body.formData.cause,
                amount: req.body.formData.amount,
                user_ID: req.body.formData.userID,
                donationDrive: req.body.formData.donation,
                contactNo:  req.body.formData.contactNo,
                emailID:  req.body.formData.emailID,
                donationID: req.body.formData.donationID,
                status:'In Transit'
            });
        const options = {
          amount: req.body.formData.amount*100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
            user_ID: req.body.formData.userID
        };

        const order = await instance.orders.create(options);
        newContribute.orderID = order.id
        const time = Date.now()
        const today = new Date(time)
        newContribute.date_of_transaction = today;
        console.log(newContribute)
        newContribute.save().then(contribute => res.json(contribute));

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/success", async (req, res) => {
  try {
    console.log("HERE")
      // getting the details back from our font-end
      const {
          orderCreationId,
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
          amount, 
          currentAmount, 
          donationID
      } = req.body;
      console.log(req.body)
     
      const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

      const digest = shasum.digest("hex");

      // comaparing our digest with the actual signature
      if (digest !== razorpaySignature)
          return res.status(400).json({ msg: "Transaction not legit!" });
      else{
        
      }

  } catch (error) {
      res.status(500).send(error);
  }

  
  updateStatus(req,res);
  updateCurrentAmount(req,res);
  
});

function sendMail(items) {

  // console.log(req.body);
  // console.log(res);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: "flash24news7@gmail.com",
      pass: "rohinimc123",
      clientId: "209620419831-bsbiom12plh9vj8knep0vckplbh4gt8g.apps.googleusercontent.com",
      clientSecret: "Oeb21GDqKHp-tjD29tVOV6oc",
      refreshToken: "1//04JA4EUtza34kCgYIARAAGAQSNwF-L9IrSjQsZYBAbImB7aa_uDMwYG3p9B5VENAxYO6rTGk1qT3p7OQNzS43vAO5gQmRi1eB_wQ"
    }
  });

  let mailOptions = {
    from: "flash24news7@gmail.com",
    to: items.emailID,
    subject: 'Fetch: RECEIPT',
    text: 'Thank you so much for donating INR' + items.amount +" to the nobel cause " + items.donationDrive +" at "+ items.date_of_transaction
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      
    }
  });

}
async function updateStatus(req, res) {
  console.log("tring to update")
  console.log(req.body)
  Contribute.findOneAndUpdate({orderID:req.body.razorpayOrderId},{status:'SUCCESS'}, (err, items) => {
        if (err) {
            console.log(err);
            
            res.status(500).json("An error occured.");
        }
        else {
          
          
           console.log('success')
           console.log(items)

           sendMail(items)
          
                  
          
        }
    });

}

function updateCurrentAmount(req, res) {
  console.log("NGO DRIVE: tring to update")
  Donation.findOneAndUpdate({_id:req.body.donationID},{currentAmount:parseInt(req.body.currentAmount)+ (parseInt(req.body.amount)/100) }, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).json("An error occured.");
        }
        else {
           console.log('success')
                  
          
        }
    });

}


module.exports = router;