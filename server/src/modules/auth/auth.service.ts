import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.model";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  faculty?: string;
  department?: string;
}) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw { status: 400, message: "Email already in use" };

  const hashed = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashed });
  return signToken(user.id, user.role);
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw { status: 401, message: "Invalid credentials" };
  if (user.isBlocked) throw { status: 403, message: "Account is blocked" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 401, message: "Invalid credentials" };

  return { token: signToken(user.id, user.role), user };
};

const signToken = (id: string, role: string) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
