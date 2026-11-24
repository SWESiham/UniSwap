import nodemailer from "nodemailer";

// نفس الإعدادات يستخدمها استرجاع الباسورد واختبار البريد.
export function createMailTransport() {
    const host = process.env.SMTP_HOST;
    if (!host || !process.env.MAIL_FROM) throw new Error("Mail settings are missing");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS?.replace(/\s/g, "");
    if (user && !pass) throw new Error("SMTP_PASS is missing: enter an App Password locally");
    return nodemailer.createTransport({
        host, port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 20000,
        ...(user ? { auth: { user, pass: pass! } } : {}),
    });
}
