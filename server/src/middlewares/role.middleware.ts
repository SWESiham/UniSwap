import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middleware";

// تتحط بعد requireAuth، مثل: requireAuth, requireRole("admin")
export function requireRole(role: "user" | "admin") {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(401).json({ error: "Please log in first" });
            return;
        }
        if (req.user.role !== role) {
            res.status(403).json({ error: "You do not have permission" });
            return;
        }
        next();
    };
}

export function authorizeRole(...roles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) { res.status(401).json({ error: "Please log in first" }); return; }
        // seller في مسارات الفريق معناها مستخدم مسجل يقدر يبيع.
        const canSell = roles.includes("seller") && req.user.role === "user";
        if (!roles.includes(req.user.role) && !canSell) { res.status(403).json({ error: "Access denied" }); return; }
        next();
    };
}
