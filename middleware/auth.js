const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { AuthenticationError } = require('apollo-server-express');

const authMiddleware = async (req) => {
  const token = req.headers.authorization;
  if (!token) throw new AuthenticationError('Authentication token is required');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    if (!req.user) throw new AuthenticationError('User not found');
  } catch (err) {
    throw new AuthenticationError('Invalid/Expired token');
  }
};

module.exports = authMiddleware;
