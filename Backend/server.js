// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');




dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contactHere', require('./routes/contactHere'));

app.use("/api/authadmin", require("./routes/authRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));


// Test Route
app.get('/', (req, res) => {
  res.send('✅ Backend is running successfully');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));