const express = require('express');
const router = express.Router();

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

// router.post('/:id',   (req, res, next) =>{


//   console.log(req.body)
//     const newContribute = new Contribute({
    

//         donor: req.body.formData.name,
//         cause: req.body.formData.cause,
//         amount: req.body.formData.amount,
//         user_ID: req.body.formData.userID,
//         donationDrive: req.body.formData.donation,
//         contactNo:  req.body.formData.contactNo,
//         emailID:  req.body.formData.emailID,
//         donationID: req.body.formData.donationID

   
//     });

//     const time = Date.now()
//     const today = new Date(time)
//     newContribute.date_of_transaction = today;

//     console.log(newContribute);
//     var options = {
//       amount: newContribute.amount*100,  // amount in the smallest currency unit
//       currency: "INR",
//       receipt: "order_rcptid",
//       key_id: instance.key_id,
//       key_secret: instance.key_secret
//     };
//      instance.orders.create(options,  function(err, order) {
//       // console.log(order.id);
//       // // await wait(5 * 1000);
//       // newContribute.order_ID = order.id;
//       // console.log(newContribute.order_ID);
//       // newContribute.save().then(contribute => res.json(contribute));
//     });   

//     // res.render('./../../index.html')
//     // var rzp1 = new Razorpay(options);
//     // let rzp1 = new window.Razorpay(options);
//     // await wait(5 * 1000);
//     // newContribute.save().then(contribute => res.json(contribute));
//     // updateStatus(req,res);
// });



// router.post('/orders', (req, res) => {
//     const newContribute = new Contribute({
        
//         donor: req.body.donor,
//         cause_ID: req.body.cause_ID,
//         amount: req.body.amount,
//         user_ID: req.body.user_ID,
//         order_ID: 0
//     });
//     var options = {
//         amount: 500,  // amount in the smallest currency unit
//         currency: "INR",
//         receipt: "order_rcptid" 
//       };
//       instance.orders.create(options, function(err, order) {
//         console.log(order.id);
//         newContribute.order_ID = order.id;
//         console.log(newContribute.order_ID);
//         newContribute.save().then(contribute => res.json(contribute));
//       });     
//       updateStatus(req,res);


// });
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

      // THE PAYMENT IS LEGIT & VERIFIED
      // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

      // res.json({
      //     msg: "success",
      //     orderId: razorpayOrderId,
      //     paymentId: razorpayPaymentId,
      // });
     
    //   Contribute.findOneAndUpdate({orderID:req.body.razorpayOrderId},{status:'SUCCESS'}, (err, items) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).json("An error occured.");
    //     }
    //     else {
    //        console.log('success bitch')
    //                 res.json({ 'items': items})
                  
          
    //     }
    // });

  } catch (error) {
      res.status(500).send(error);
  }
  updateStatus(req,res);
  updateCurrentAmount(req,res);
});


function updateStatus(req, res) {
  console.log("tring to update")
  Contribute.findOneAndUpdate({orderID:req.body.razorpayOrderId},{status:'SUCCESS'}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).json("An error occured.");
        }
        else {
           console.log('success')
          
                  
          
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