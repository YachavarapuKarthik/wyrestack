const mongoose = require('mongoose');

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  payment_id: { type: String,required: true,unique: true },
  status: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  user_email: { type: String, required: true },
  user_name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

// Creating model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
