const express = require("express");
const dotenv = require("dotenv");
const databaseConnection = require("./config/dbConnection");
const createApolloServer = require("./config/apolloServer");
dotenv.config();

(async () => {
  const app = express();

  // Database connection
  databaseConnection.dbconnect();

  // Apollo Server setup
  await createApolloServer(app);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
})();
