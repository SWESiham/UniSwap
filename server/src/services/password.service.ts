import { randomBytes, createHash } from "node:crypto";
import bcrypt from "bcryptjs";
import { createMailTransport } from "../utils/mail";
import User from "../models/User";
import { AuthError } from "../utils/AuthError";

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export async function forgotPassword(email: string) {
    // نفحص إعداد البريد قبل البحث عن الحساب؛ نفس الرد لكل الإيميلات.
    if (!process.env.SMTP_HOST || !process.env.MAIL_FROM || !process.env.CLIENT_URL) {
        throw new AuthError(503, "Password reset email is not configured");
    }
    let transport;
    try { transport = createMailTransport(); }
    catch { throw new AuthError(503, "Password reset email is not configured"); }
    const user = await User.findOne({ email, isBlocked: false });
    if (!user) return;
    const token = randomBytes(32).toString("hex");
    const digest = hashToken(token);
    await User.updateOne({ _id: user._id }, { $set: {
        resetTokenHash: digest, resetTokenExpires: new Date(Date.now() + 15 * 60 * 1000),
    } });
    const url = new URL("/reset-password", process.env.CLIENT_URL);
    url.searchParams.set("token", token);
    try {
        await transport.sendMail({ from: process.env.MAIL_FROM, to: user.email,
            subject: "UniSwap password reset",
            text: `Reset your password within 15 minutes: ${url.toString()}` });
    } catch {
        // نمسح الطلب ده فقط، من غير التأثير على طلب أحدث.
        await User.updateOne({ _id: user._id, resetTokenHash: digest }, {
            $unset: { resetTokenHash: 1, resetTokenExpires: 1 },
        });
        // نفس رد الإيميل غير الموجود؛ تفاصيل البريد لا تخرج للمستخدم.
        console.error("Password reset email delivery failed");
    }
}

export async function resetPassword(token: string, password: string) {
    const hash = await bcrypt.hash(password, 12);
    // عملية واحدة: التوكن يُستخدم مرة واحدة، ونلغي الجلسات القديمة.
    const user = await User.findOneAndUpdate({ resetTokenHash: hashToken(token),
        resetTokenExpires: { $gt: new Date() }, isBlocked: false }, {
        $set: { password: hash }, $inc: { tokenVersion: 1 },
        $unset: { resetTokenHash: 1, resetTokenExpires: 1 },
    });
    if (!user) throw new AuthError(400, "Invalid or expired reset token");
}

export async function changePassword(id: string, currentPassword: string, newPassword: string) {
    const user = await User.findById(id).select("+password");
    if (!user || !await bcrypt.compare(currentPassword, user.password)) {
        throw new AuthError(400, "Current password is incorrect");
    }
    const result = await User.updateOne({ _id: id, password: user.password, isBlocked: false }, {
        $set: { password: await bcrypt.hash(newPassword, 12) }, $inc: { tokenVersion: 1 },
        $unset: { resetTokenHash: 1, resetTokenExpires: 1 },
    });
    if (!result.modifiedCount) throw new AuthError(409, "Account changed. Please log in again");
}

export async function logout(id: string) {
    await User.updateOne({ _id: id }, { $inc: { tokenVersion: 1 } });
}
