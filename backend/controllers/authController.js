const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }
    const hashedPassword = await bcrypt.hash(password, config.bcryptRounds);
    await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    res.json({ message: 'Login successful.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 