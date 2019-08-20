import jwt from "jsonwebtoken";
require("dotenv").config();
export const APP_SECRET = process.env.APP_SECRET;

export const getUserId = ctx => {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }
  throw new Error("Not authenticated");
};
