const { AuthenticationError } = require('apollo-server-express');

const checkRole = (user, roles) => {
  if (!roles.includes(user.role)) {
    throw new AuthenticationError('Not authorized');
  }
};

module.exports = checkRole;
