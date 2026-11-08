import { z } from "zod";

// بنراجع البيانات قبل ما نحاول نحفظ أي حاجة في الداتابيز.
export const registerSchema = z.object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(8).refine(
        (value) => Buffer.byteLength(value, "utf8") <= 72,
        "Password must not exceed 72 bytes"
    ),
    faculty: z.string().trim().max(100).optional(),
    department: z.string().trim().max(100).optional(),
}).strict(); // بنرفض أي حقول زيادة، زي role أو isBlocked.

export type RegisterInput = z.infer<typeof registerSchema>;
