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
    subject: 'Fetch: Donation of INR ' + items.amount +" to " + items.donationDrive ,
    // text: 'Dear' + items.donor + ', thank you so much donating INR ' + items.amount +" to the nobel cause ' " + items.donationDrive +"' today. Your love is a contributing force for us to work harder to make",
    html:`<html>
    <head>
      <meta charset="utf-8" />
      <title>A simple, clean, and responsive HTML invoice template</title>
  
      <style>
        .invoice-box {
          max-width: 700px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          font-size: 16px;
          line-height: 24px;
          font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          color: #555;
        }
        .details{
            font-size: 22px;
          line-height: 24px;
          font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          color: #555;
        }
        .invoice-box table {
          width: 100%;
          line-height: inherit;
          text-align: left;
        }
  
        .invoice-box table td {
          padding: 5px;
          vertical-align: top;
        }
  
        .invoice-box table tr td:nth-child(2) {
          text-align: right;
        }
  
        .invoice-box table tr.top table td {
          padding-bottom: 20px;
        }
  
        .invoice-box table tr.top table td.title {
          font-size: 45px;
          line-height: 45px;
          color: #333;
        }
  
        .invoice-box table tr.information table td {
          padding-bottom: 40px;
        }
  
        .invoice-box table tr.heading td {
          background: #eee;
          border-bottom: 1px solid #ddd;
          font-weight: bold;
        }
  
        .invoice-box table tr.details td {
          padding-bottom: 20px;
          font-size: 16px;
          line-height: 24px;
          font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          color: #555;

        }
        .bold{
            font-weight: bold;
        }
        .invoice-box table tr.item td {
          border-bottom: 1px solid #eee;
        }
  
        .invoice-box table tr.item.last td {
          border-bottom: none;
        }
  
        .invoice-box table tr.total td:nth-child(2) {
          border-top: 2px solid #eee;
          font-weight: bold;
        }
  
        @media only screen and (max-width: 600px) {
          .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
          }
  
          .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
          }
        }
  
        /** RTL **/
        .invoice-box.rtl {
          direction: rtl;
          font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        }
  
        .invoice-box.rtl table {
          text-align: right;
        }
  
        .invoice-box.rtl table tr td:nth-child(2) {
          text-align: left;
        }
      </style>
    </head>
  
    <body>
      <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                
                  <td class="title">
                  <img src="https://i.ibb.co/gwT3frr/fetchlogo.png" style="float: center; width: 100%; max-width: 300px" alt="fetchlogo" border="0">
                  </td>
  
                  <td>

                    SUCCESS: Donation at Fetch <br />

                  </td>
                </tr>
              </table>
            </td>
          </tr>
  
         <tr>
             <td class="details">
               <p> Your love is what drives us to make this world a better place for animals.</p>
               <p class="bold"> Fetch promises:</p>
               <p>
                We shall ensure that your contribution reaches the receiver without the involvement of any third party and is used for the cause it is meant for. 
                </p>
                </td>
           
         </tr>
  
          <tr class="item">
            <td><img src="https://i.ibb.co/mSMgD7k/thanks.png" style="width: 100%; max-width: 700px"alt="thanks" border="0"></td>
  
           
          </tr>
  
         
        </table>
      </div>
    </body>
  </html>`
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