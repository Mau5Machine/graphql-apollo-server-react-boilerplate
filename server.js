import { ApolloServer } from "apollo-server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import mongoose from "mongoose";
import { findUser } from './controllers/userController'
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_CONNECTION_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to Mongo DB!"))
  .catch(err => console.error(`There was an error in the connection: ${err}`));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        currentUser = await findUser(authToken);
      }
    } catch (err) {
      console.error(`Unable to authenticate user with token ${err}`)
    }
    return { currentUser }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server is now listening on ${url}`);
});
