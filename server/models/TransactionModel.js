const mongoose = require('mongoose');

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  order_id: String,
  payment_id: String,
  status: String,
  amount: Number,
  currency: String,
  user_email: String,
  user_name: String,
});

// Creating model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
