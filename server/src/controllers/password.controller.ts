import type { Response } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { AuthError } from "../utils/AuthError";
import * as service from "../services/password.service";

const password = z.string().min(8).refine(value => Buffer.byteLength(value, "utf8") <= 72);
const schemas = {
    forgot: z.object({ email: z.string().trim().toLowerCase().email() }).strict(),
    reset: z.object({ token: z.string().regex(/^[a-f0-9]{64}$/), password }).strict(),
    change: z.object({ currentPassword: z.string().min(1).max(200), newPassword: password }).strict(),
};

// نفس طريقة معالجة الخطأ في العمليات الثلاث، لتجنب تكرارها.
function fail(res: Response, error: unknown) {
    res.status(error instanceof AuthError ? error.status : 500).json({
        error: error instanceof AuthError ? error.message : "Could not complete request",
    });
}
export async function forgot(req: AuthRequest, res: Response) {
    const data = schemas.forgot.safeParse(req.body);
    if (!data.success) { res.status(400).json({ error: "Invalid email" }); return; }
    try {
        await service.forgotPassword(data.data.email);
        res.json({ message: "If the account is eligible, a reset email will be sent" });
    } catch (error) { fail(res, error); }
}
export async function reset(req: AuthRequest, res: Response) {
    const data = schemas.reset.safeParse(req.body);
    if (!data.success) { res.status(400).json({ error: "Invalid token or password" }); return; }
    try {
        await service.resetPassword(data.data.token, data.data.password);
        res.json({ message: "Password reset. Please log in again" });
    } catch (error) { fail(res, error); }
}
export async function change(req: AuthRequest, res: Response) {
    const data = schemas.change.safeParse(req.body);
    if (!data.success) { res.status(400).json({ error: "Invalid password data" }); return; }
    try {
        await service.changePassword(req.user!.id, data.data.currentPassword, data.data.newPassword);
        res.json({ message: "Password changed. Please log in again" });
    } catch (error) { fail(res, error); }
}
export async function logout(req: AuthRequest, res: Response) {
    try {
        await service.logout(req.user!.id);
        res.json({ message: "Logged out from all sessions" });
    } catch (error) { fail(res, error); }
}
