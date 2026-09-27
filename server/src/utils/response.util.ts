import { Response } from "express";

export const ok = (res: Response, data: any, status = 200) => res.status(status).json(data);
export const fail = (res: Response, message: string, status = 400) =>
  res.status(status).json({ error: message });
