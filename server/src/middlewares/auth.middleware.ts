import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
    user?: { id: string; _id: string; role: "user" | "admin" };
}

export const authenticate = requireAuth;

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
    // الفرونت بيبعت: Authorization: Bearer TOKEN
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        res.status(401).json({ error: "Please log in first" });
        return;
    }

    let userId: string;
    let version: number;
    try {
        const payload = verifyToken(header.slice(7));
        if (typeof payload === "string" || !payload.sub ||
            !mongoose.isObjectIdOrHexString(payload.sub)) {
            throw new Error("Invalid token");
        }
        userId = payload.sub;
        version = Number(payload.version ?? 0);
    } catch {
        res.status(401).json({ error: "Invalid or expired token" });
        return;
    }

    try {
        // بنراجع الحساب مع كل طلب، علشان الحظر وتغيير الصلاحيات يتطبقوا فورًا.
        const user = await User.findById(userId);
        if (!user) {
            res.status(401).json({ error: "Account no longer exists" });
            return;
        }
        if (user.isBlocked) {
            res.status(403).json({ error: "Your account is blocked" });
            return;
        }
        if (version !== (user.tokenVersion ?? 0)) {
            res.status(401).json({ error: "Session expired. Please log in again" });
            return;
        }
        req.user = { id: user._id.toString(), _id: user._id.toString(), role: user.role };
        next();
    } catch {
        res.status(500).json({ error: "Could not verify account" });
    }
}
