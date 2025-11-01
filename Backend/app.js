const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Demo users (in-memory database)
let users = [
  { id: 1, name: 'John Doe', email: 'demo@example.com', password: '123456' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: '123456' }
];

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt:', email);
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({
      success: true,
      message: 'Login successful',
      token: 'demo_jwt_token_' + user.id,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  console.log('Register attempt:', name, email);
  
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'User already exists'
    });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token: 'demo_jwt_token_' + newUser.id,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Company Backend API is running!',
    mode: 'Demo Mode (In-memory database)',
    timestamp: new Date().toISOString()
  });
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    users: users.map(u => ({ id: u.id, name: u.name, email: u.email }))
  });
});

module.exports = app;