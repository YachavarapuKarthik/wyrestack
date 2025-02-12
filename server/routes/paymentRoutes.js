// const express = require('express');
// const router = express.Router();
// const Razorpay = require('razorpay');
// const Transaction = require('../models/TransactionModel'); // MongoDB model for transactions
// require('dotenv').config();

// // Initialize Razorpay instance
// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create Order Route
// router.post('/create-order', async (req, res) => {
//   const { amount, currency } = req.body;

//   try {
//     console.log("Creating order with amount:", amount / 100);

//     // Create Razorpay order
//     const order = await razorpayInstance.orders.create({
//       amount: amount, // Amount in paise (1 INR = 100 paise)
//       currency: currency || 'INR', // Default currency is INR if not provided
//       receipt: `order_rcptid_${new Date().getTime()}`, // Unique receipt ID
//     });

//     console.log("Order process started");

//     // Respond with order details
//     res.json({
//       success: true,
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//     });

//     console.log("JSON sent");

//   } catch (err) {
//     console.error("Error creating order:", err.message || err);
//     res.status(500).json({ success: false, message: 'Something went wrong while creating order!' });
//   }
// });

// // Payment Success Route
// router.post('/payment-success', async (req, res) => {
//   const { order_id, payment_id, user_email, user_name } = req.body;

//   console.log("Payment success route hit with data:", req.body);

//   if (!payment_id) {
//     return res.status(400).json({ success: false, message: 'payment_id is missing' });
//   }

//   try {
//     console.log("Fetching payment details for ID:", payment_id);
//     const paymentDetails = await razorpayInstance.payments.fetch(payment_id);

//     if (!paymentDetails) {
//       throw new Error('Payment details not found!');
//     }

//     console.log("Payment details fetched:", paymentDetails);

//     if (paymentDetails.status === 'authorized') {
//       console.log("Capturing authorized payment...");
//       await razorpayInstance.payments.capture(payment_id, paymentDetails.amount);
//     }

//     console.log("Saving transaction to the database...");
//     const transaction = new Transaction({
//       order_id,
//       payment_id,
//       status: paymentDetails.status,
//       amount: paymentDetails.amount / 100,
//       currency: paymentDetails.currency,
//       user_email,
//       user_name,
//     });

//     await transaction.save();

//     res.json({ success: true, message: 'Payment successful and transaction recorded!' });
//   } catch (err) {
//     console.error("Error in payment-success route:", err.message || err);
//     res.status(500).json({ success: false, message: 'Payment verification or recording failed!' });
//   }
// });

// module.exports = router;
