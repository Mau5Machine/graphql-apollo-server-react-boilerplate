import User from "../models/User";
import { APP_SECRET } from '../utils'
import jwt from 'jsonwebtoken'

export const findUser = async token => {
  const authenticatedUserId = await verifyAuthToken(token);
  const user = await checkIfUserExists(authenticatedUserId);
  if (user) {
    return user
  }
  throw new Error("Could not authenticate this token")
}

const verifyAuthToken = async token => {
  if (token) {
    const authToken = token.replace("Bearer ", "");
    const { userId } = jwt.verify(authToken, APP_SECRET);
    return userId;
  }
  throw new Error("Not Authenticated!");
}

const checkIfUserExists = async _id => await User.findOne({ _id }).exec();