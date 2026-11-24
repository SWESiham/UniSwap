import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { getUserProfile } from "../services/user.service";
import { updateUserProfile } from "../services/user.service";
import { z } from "zod";
const profileSchema = z.object({
    name: z.string().trim().min(1).max(100).optional(),
    faculty: z.string().trim().max(100).optional(),
    department: z.string().trim().max(100).optional(),
}).strict().refine(data => Object.keys(data).length > 0, "Send at least one field");

export async function updateMe(req: AuthRequest, res: Response) {
    const result = profileSchema.safeParse(req.body);
    if (!result.success) { res.status(400).json({ error: "Invalid profile fields" }); return; }
    try {
        const user = await updateUserProfile(req.user!.id, result.data);
        if (!user) { res.status(404).json({ error: "User not found" }); return; }
        res.json({ user });
    } catch { res.status(500).json({ error: "Could not update profile" }); }
}
export async function getMe(req: AuthRequest, res: Response) {
    try {
        const user = await getUserProfile(req.user!.id);
        if (!user) { res.status(404).json({ error: "User not found" }); return; }
        res.json({ user });
    } catch { res.status(500).json({ error: "Could not load profile" }); }
}
