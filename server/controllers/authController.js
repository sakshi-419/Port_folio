const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });
};

// @desc  Register admin user (one-time setup)
// @route POST /api/auth/register
// @access Public (but only works if no admin exists)
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ role: 'admin' });
    if (existingUser) {
      return res.status(403).json({ message: 'Admin already exists. Registration is closed.' });
    }
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }
    const user = await User.create({ username, email, password });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Login
// @route POST /api/auth/login
// @access Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Check if admin exists
// @route GET /api/auth/check-admin
// @access Public
const checkAdmin = async (req, res) => {
  const admin = await User.findOne({ role: 'admin' });
  res.json({ adminExists: !!admin });
};

// @desc  Get current user
// @route GET /api/auth/me
// @access Private
const getMe = async (req, res) => {
  res.json({ _id: req.user._id, username: req.user.username, email: req.user.email });
};

module.exports = { register, login, checkAdmin, getMe };
