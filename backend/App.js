const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth'); // Import your auth route

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors());         // Enable Cross-Origin Resource Sharing

// Routes
app.use('/api/auth', authRoute); // Register the auth route for user registration

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/your-database-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected')) // Log success
  .catch((err) => console.log('MongoDB connection error:', err)); // Log errors

// Set the port for the backend server
const PORT = process.env.PORT || 5000; // Default to 5000 if no environment variable is set
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log when server is running
});
