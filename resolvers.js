import User from "./models/User";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { APP_SECRET, getUserId } from './utils';

const resolvers = {
  Mutation: {
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
