import { ApolloServer } from "apollo-server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import mongoose from "mongoose";
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_CONNECTION_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to Mongo DB!"))
  .catch(err => console.error(`There was an error in the connection: ${err}`));

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server is now listening on ${url}`);
});
