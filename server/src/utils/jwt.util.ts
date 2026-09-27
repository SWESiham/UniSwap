import jwt from "jsonwebtoken";

export const signToken = (payload: object, expiresIn = "7d") =>
  jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn });

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET as string);
