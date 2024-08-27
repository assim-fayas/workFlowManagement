// apolloServer.js
const { ApolloServer } = require("apollo-server-express");
const authMiddleware = require("../middleware/auth");
const schema = require("../graphql");

const createApolloServer = async (app) => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const operationName = req.body.operationName;
      const excludedOperations = ["loginUser", "registerUser"];

      if (!excludedOperations.includes(operationName)) {
        await authMiddleware(req);
      }

      return { req };
    },
  });

  await server.start();
  server.applyMiddleware({ app });
  return server;
};

module.exports = createApolloServer;
