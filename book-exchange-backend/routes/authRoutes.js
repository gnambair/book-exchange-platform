const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Helper function to create JWT
function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'yourSecretKey', { expiresIn: '1h' });
}

// Register Route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    const savedUser = await newUser.save();

    // Generate a token
    const token = createToken(savedUser._id);

    // Send the token and user info in the response
    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        email: savedUser.email,
      },
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login error: User not found for email:', email);
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Login error: Password does not match for email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a token
    const token = createToken(user._id);

    // Send the token and user info in the response
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
