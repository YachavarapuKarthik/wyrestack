const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Import Contact model
const nodemailer = require('nodemailer');

// Create a transporter for Nodemailer using environment variables for email and password
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or use your preferred email service
  auth: {
    user: process.env.EMAIL_USER, // Get the email from environment variable
    pass: process.env.EMAIL_PASS  // Get the password from environment variable
  }
});

// POST route to handle form submission
router.post('/', async (req, res) => {
  try {
    // Create a new contact document using the request body
    const newContact = new Contact(req.body);
    await newContact.save();

    // Send a confirmation email to the user
    const mailOptions = {
      from: process.env.MAIL_USER,  // Use the email from the environment variable
      to: req.body.email,           // User's email address from the form
      subject: 'Contact Form Submission Confirmation',
      text: `Hello ${req.body.name},\n\nThank you for reaching out! We have received your contact form submission.\n\nBest regards,\nneuron.ai`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email', details: error.message });
      }
      console.log('Email sent: ' + info.response);
    });

    // Respond with success message
    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(400).json({ error: 'Failed to submit the form', details: error.message });
  }
});

module.exports = router;
