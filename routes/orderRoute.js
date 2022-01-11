const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51IeAyzIv2ejY4IHnIju5MlJ9NB89SLoDoxsmIFywjzrnx5DoZ2NB6tDDV0okHOueew1wwDV5BuNnVnfprT5zEDL300JufcooMH"
);
const Order = require("../models/orderModel");
router.post("/placeOrder", async (req, res) => {
  const { token, subTotal, currentUser, cartItems } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: subTotal * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      const newOrder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subTotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          picode: token.card.address_zip,
        },
        transactionId: payment.source.id,
      });
      newOrder.save();
      res.send("payment Success");
    } else {
      res.send("payment failed");
    }
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
      error:error.stack
    });
  }
});
router.post('/getuserorder',async(req,res)=>{
    const {userid}=req.body
    try {
       const orders=await Order.find({userid}).sort({_id:'-1'})
       res.status(200).send(orders) 
    } catch (error) {
        res.status(400).json({
            message:'something went to wrong',
            error:error.stack
        })
    }
});
router.get('/alluserorder',async(req,res)=>{
    try {
       const orders=await Order.find()
       res.status(200).send(orders) 
    } catch (error) {
        res.status(400).json({
            message:'something went to wrong',
            error:error.stack
        })
    }
});
router.post('/deliverorder',async(req,res)=>{
  const orderid=req.body.orderid
    try {
       const order=await Order.findOne({_id:orderid})
       order.isDelivered=true
       await order.save()
       res.status(200).send('order deliver succuss') 
    } catch (error) {
        res.status(400).json({
            message:'order deliver fail',
            error:error.stack
        })
    }
});
module.exports = router;
