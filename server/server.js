const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

// Route Imports
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
// const reviewRoutes = require('./routes/reviewRoutes');
const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes'); // Path to your forgot-password.js file
const contactRoute = require('./routes/contactRoutes')
const paymentRoute = require('./routes/paymentRoutes')

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/wyst', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/forgot-password', forgotPasswordRoutes);
app.use('/contact',contactRoute)
app.use('/payment',paymentRoute)

// app.use('/reviews', reviewRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
