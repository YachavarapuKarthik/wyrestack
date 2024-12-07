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
 * @route GET /profile/:id
 * @desc Get a user's profile by ID
 */
router.get('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID but exclude password from result
    const user = await UserModel.findById(id).select('-password');

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
 * @route PUT /profile/:id
 * @desc Update the user's profile
 */
router.put('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dob, email, phone, password } = req.body;

    // Check for allowed fields to update
    const allowedFields = ['name', 'dob', 'email', 'phone', 'password'];
    const updatedData = {};

    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updatedData[key] = req.body[key];
      }
    });

    // If the password is being updated, hash it before saving
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    // Update the user in the database
    const updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, { 
      new: true, 
      runValidators: true 
    }).select('-password'); // Exclude password from response

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