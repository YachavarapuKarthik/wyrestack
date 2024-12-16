const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const Transaction = require('../models/TransactionModel');
require('dotenv').config();

console.log(process.env.RAZORPAY_KEY_ID)
console.log(process.env.RAZORPAY_KEY_SECRET)

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order Route
router.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    console.log("Creating order with amount:", amount);

    const order = await razorpayInstance.orders.create({
      amount: amount * 100, // Convert to paise
      currency: currency || 'INR',
      receipt: `order_rcptid_${new Date().getTime()}`,
    });
    console.log("Ordeer process staarted")

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
    console.log("Jsonn sent")
  } catch (err) {
    console.error("Error creating order:", err.message || err);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
  }
  console.log("Failed")
});

// Payment Success Route
router.post('/payment-success', async (req, res) => {
  const { order_id, payment_id, user_email, user_name } = req.body;

  try {
    console.log("Verifying payment with ID:", payment_id);

    const paymentDetails = await razorpayInstance.payments.fetch(payment_id);

    // Optionally capture payment explicitly
    if (paymentDetails.status === 'authorized') {
      await razorpayInstance.payments.capture(payment_id, paymentDetails.amount);
    }

    // Save to database
    const transaction = new Transaction({
      order_id,
      payment_id: paymentDetails.id,
      status: 'captured',
      amount: paymentDetails.amount / 100,
      currency: paymentDetails.currency,
      user_email,
      user_name,
    });

    await transaction.save();

    res.json({ success: true, message: 'Payment successful and transaction recorded!' });
  } catch (err) {
    console.error("Error capturing payment:", err.message || err);
    res.status(500).json({ success: false, message: 'Payment verification failed!' });
  }
});

module.exports = router;
