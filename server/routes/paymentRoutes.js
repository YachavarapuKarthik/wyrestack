const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const Transaction = require('../models/TransactionModel'); // MongoDB model for transactions
require('dotenv').config();

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order Route
router.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    console.log("Creating order with amount:", amount / 100);

    // Create Razorpay order
    const order = await razorpayInstance.orders.create({
      amount: amount, // Amount in paise (1 INR = 100 paise)
      currency: currency || 'INR', // Default currency is INR if not provided
      receipt: `order_rcptid_${new Date().getTime()}`, // Unique receipt ID
    });

    console.log("Order process started");

    // Respond with order details
    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

    console.log("JSON sent");

  } catch (err) {
    console.error("Error creating order:", err.message || err);
    res.status(500).json({ success: false, message: 'Something went wrong while creating order!' });
  }
});

// Payment Success Route
router.post('/payment-success', async (req, res) => {
  const { order_id, payment_id, user_email, user_name } = req.body;

  // Log incoming request data
  console.log("Received payment success data:", req.body);

  // Validate payment_id
  if (!payment_id) {
    console.log("Paayment id is missing ")
    return res.status(400).json({ success: false, message: 'payment_id is missing' });
  }

  try {
    console.log("Verifying payment with ID:", payment_id);

    // Fetch payment details from Razorpay
    const paymentDetails = await razorpayInstance.payments.fetch(payment_id);

    // Log payment details
    console.log("Payment details:", paymentDetails);

    // Optionally capture payment explicitly if authorized
    if (paymentDetails.status === 'authorized') {
      await razorpayInstance.payments.capture(payment_id, paymentDetails.amount);
    }

    // Save transaction details in the database
    console.log("Saving transaction to the database");

    const transaction = new Transaction({
      order_id: order_id, // Order ID from the frontend
      payment_id: paymentDetails.id, // Razorpay payment ID
      status: paymentDetails.status, // Payment status (captured, failed, etc.)
      amount: paymentDetails.amount / 100, // Convert to INR
      currency: paymentDetails.currency, // Currency (e.g., INR)
      user_email: user_email, // User email from the frontend
      user_name: user_name, // User name from the frontend
    });

    // Log the transaction data
    console.log("Transaction data to be saved:", transaction);

    // Save to database
    await transaction.save();

    res.json({ success: true, message: 'Payment successful and transaction recorded!' });
    console.log('Payment successful and transaction recorded!');

  } catch (err) {
    console.error("Error capturing payment:", err.message || err);
    res.status(500).json({ success: false, message: 'Payment verification failed!' });
  }
});

module.exports = router;
