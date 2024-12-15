const express = require('express');
const router = express.Router();
const razorpay = require('razorpay');
const Transaction = require('../models/TransactionModel');

// Initialize Razorpay instance
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order Route
router.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const order = await razorpayInstance.orders.create({
      amount: amount * 100, // Razorpay expects the amount in paise
      currency: currency || 'INR',
      receipt: `order_rcptid_${new Date().getTime()}`,
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.log("Error creating order:", err);
    res.status(500).send('Something went wrong!');
  }
});

// Payment Success Route
router.post('/payment-success', async (req, res) => {
  const { order_id, payment_id, user_email, user_name } = req.body;

  try {
    const paymentDetails = await razorpayInstance.payments.fetch(payment_id);

    if (paymentDetails.status === 'captured') {
      const transaction = new Transaction({
        order_id,
        payment_id: paymentDetails.id,
        status: paymentDetails.status,
        amount: paymentDetails.amount / 100,
        currency: paymentDetails.currency,
        user_email,
        user_name,
      });

      await transaction.save();

      res.json({ message: 'Payment successful and transaction recorded!' });
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  } catch (err) {
    console.log("Error capturing payment:", err);
    res.status(500).send('Something went wrong!');
  }
});

module.exports = router;
