import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  faculty?: string;
  department?: string;
  role: "student" | "admin";
  isBlocked: boolean;
  avatarUrl?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    faculty: String,
    department: String,
    role: { type: String, enum: ["student", "admin"], default: "student" },
    isBlocked: { type: Boolean, default: false },
    avatarUrl: String,
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
