import api from "./api";

export const register = (data: { name: string; email: string; password: string; faculty?: string; department?: string }) =>
  api.post("/auth/register", data);

export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const getMe = () => api.get("/users/me");
export const updateMe = (data: any) => api.patch("/users/me", data);
