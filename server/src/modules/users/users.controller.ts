import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { getMe, updateMe, getUserById } from "./users.service";

export const me = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await getMe(req.user!.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const editMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await updateMe(req.user!.id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
