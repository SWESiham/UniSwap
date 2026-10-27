import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');
import User from "../models/User";
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer '))
        return res.status(401).json({ message: 'no token provided' });
    const token = authHeader.split(' ')[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id).select('-password');
        if (!user) return res.status(404).json({ message: 'user not found' })
        if (user.isBlocked) return res.status(403).json({ message: 'Account blocked' });
        (req as any).user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token is not valid or expired' })
    }
}