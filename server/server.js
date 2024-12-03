// Import express
const express = require('express');

// Initialize the Express app
const app = express();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define a sample API endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'This is a simple backend API' });
});

// Start the server on port 5000
app.listen(5000, () => {
  console.log('Backend server is running on http://localhost:5000');
});
