const { ApolloError } = require('apollo-server-express');

const handleError = (message, code = 'INTERNAL_SERVER_ERROR') => {
  throw new ApolloError(message, code);
};

module.exports = handleError;
