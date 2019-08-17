import User from "./models/User";

const resolvers = {
  Mutation: {
    createUser(parent, args, ctx, info) {
      const { name, email } = args;
      const user = { name, email };
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
