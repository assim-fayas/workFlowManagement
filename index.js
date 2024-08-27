const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/auth');
const schema = require('./graphql');

dotenv.config();

(async () => {
  const app = express();

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const operationName = req.body.operationName;
      const excludedOperations = ['loginUser', 'registerUser'];

      if (!excludedOperations.includes(operationName)) {
        await authMiddleware(req);
      }

      return { req };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
  });
})();
