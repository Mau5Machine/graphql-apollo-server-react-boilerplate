import jwt from 'jsonwebtoken'

export const APP_SECRET = "Hj1ThT0147"

export const getUserId = ctx => {
  const Authorization = ctx.request.get("Authorization")
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }
  throw new Error("Not authenticated")
}

