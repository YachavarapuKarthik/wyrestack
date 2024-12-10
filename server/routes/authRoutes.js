const express = require('express');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User');

const router = express.Router();

/**
 * @route POST /signup
 * @desc Register a new user
 */
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ 
      email, 
      password: hashedPassword 
    });

    await newUser.save();

    res.status(201).json({ 
      message: 'User created successfully', 
      user: newUser 
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

/**
 * @route POST /login
 * @desc Log in an existing user
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ 
      message: 'Login successful', 
      user 
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

/**
 * @route GET /profile/:email
 * @desc Get a user's profile by email
 */
router.get('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Find user by email but exclude password from result
    const user = await UserModel.findOne({ email }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

/**
 * @route PUT /profile/:email
 * @desc Update the user's profile using email
 */
router.put('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { name, dob, phone, password } = req.body;

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Prepare the updated data
    const updatedData = {};

    // Include only valid fields
    if (name) updatedData.name = name;
    if (dob) updatedData.dob = dob;
    if (phone) updatedData.phone = phone;
    

    // // const existingUser = await UserModel.findOne({ email });
    // // console.log('Existing User:', existingUser);
    // console.log("upadated data",updatedData)

    const updatedUser = await UserModel.findOneAndUpdate(
      { email }, 
     updatedData, // Use $set to explicitly update the fields
     { new: true, runValidators: true }
    );
    
    console.log('Updated User:', updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
      message: 'Profile updated successfully', 
      user: updatedUser 
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

module.exports = router;
