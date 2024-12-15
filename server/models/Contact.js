const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email' ]
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [ /^\d{10}$/, 'Phone number must be 10 digits' ]
  },
  time: {
    type: String,
    required: [true, 'Preferred contact time is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
