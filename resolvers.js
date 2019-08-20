import User from "./models/User";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { APP_SECRET, getUserId } from './utils';
import { AuthenticationError } from "apollo-server";

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in!");
  }
  return next(root, args, ctx, info)
}

const resolvers = {
  Mutation: {
    deleteUser: authenticated(async (_, args, ctx) => {
      const deletedUser = await User.findOneAndDelete({ _id: args.userId }).exec();
      return deletedUser
    }),
    createUser: (async (_, args, ctx) => {
      const password = await bcrypt.hash(args.password, 10);
      const user = await new User({ ...args, password }).save();
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          userId: user.id
        },
        APP_SECRET
      )
      return {
        token,
        user
      };
    }),
    login: (async (_, args, ctx) => {
      const user = await User.findOne({ username: args.username });
      if (!user) {
        throw new Error("User does not exist!");
      }
      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          userId: user.id
        },
        APP_SECRET
      )
      return {
        token,
        user
      }
    })
  },
  Query: {
    users(_, args, ctx, info) {
      return User.find({});
    }
  }
};

export default resolvers;
