import User from "../../models/User.model";

export const getMe = (id: string) => User.findById(id).select("-password");

export const updateMe = (id: string, data: Partial<{ name: string; avatarUrl: string; faculty: string; department: string }>) =>
  User.findByIdAndUpdate(id, data, { new: true }).select("-password");

export const getUserById = (id: string) => User.findById(id).select("-password");
