import User from "./models/User";

const resolvers = {
  Mutation: {
    createUser(_, { name, email, username, firstName, lastName, phone, password }, ctx) {
      const user = { name, email, username, firstName, lastName, phone, password };
      return new User(user).save();
    }
  },
  Query: {
    users(_, args, ctx, info) {
      return User.find({});
    }
  }
};

export default resolvers;
