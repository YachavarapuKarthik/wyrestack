require('dotenv').config();
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const validator = require('validator');
const UserModel = require('../models/User');

// Dummy "database"
let users = {};

// Rate limiter for OTP requests
const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: 'Too many OTP requests. Please try again later.'
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS
  }
});

router.post('/request-otp', otpLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpires = Date.now() + 10 * 60 * 1000;

    users[email] = { otp: hashedOtp, otpExpires };

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP for password reset is: ${otp}`
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const userData = users[email];
    if (!userData || Date.now() > userData.otpExpires) return res.status(400).json({ message: 'Invalid or expired OTP' });
    
    const isMatch = await bcrypt.compare(otp, userData.otp);
    if (!isMatch) return res.status(400).json({ message: 'Invalid OTP' });
    
    users[email].otp = null;
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.post('/reset-password', async (req, res) => {
    try {
      const { email, password, confirmPassword } = req.body;
      if (!email || !password || !confirmPassword) return res.status(400).json({ message: 'Email, password, and confirm password are required' });
      if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });
      
      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedPassword = {};

      if (password) updatedPassword.password = hashedPassword;

      const updatedUser = await UserModel.findOneAndUpdate(
        { email }, 
       updatedPassword, // Use $set to explicitly update the fields
       { new: true, runValidators: true }
      );
      
      if (updatedPassword){
        res.status(200).json({ message: 'Password reset successfully' });
      }
    //   else{
    //     res.status(500).json({ message: 'Password reset Failedd' });
    //   }

    //   if (password)
    //   users[email] = { password: hashedPassword, otp: null, otpExpires: null };
    //   res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });

module.exports = router;
