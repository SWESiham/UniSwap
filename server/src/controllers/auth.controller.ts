import type { Request, Response } from "express";
import { registerSchema } from "../validators/auth.validator";
import { registerUser } from "../services/auth.service";

export async function register(req: Request, res: Response) {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            error: "Invalid registration data",
            details: result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
        return;
    }

    try {
        const user = await registerUser(result.data);
        res.status(201).json({ message: "Account created successfully", user });
    } catch (error) {
        // الـunique index بيمنع تكرار الإيميل حتى لو طلبين وصلوا في نفس الوقت.
        if (error instanceof Error && "code" in error && error.code === 11000) {
            res.status(409).json({ error: "Email is already registered" });
            return;
        }
        // ما نكشفش تفاصيل الداتابيز أو بيانات المستخدم في رسالة الخطأ.
        res.status(500).json({ error: "Could not create account. Please try again later." });
    }
}
