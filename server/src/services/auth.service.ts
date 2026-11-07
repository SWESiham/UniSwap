import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const loginService = async (email: string, password: string) => {
    // 1. بندور على المستخدم بالإيميل (واستخدمنا select('+password') لأنك عاملة select: false في الـ Schema)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("الإيميل أو الرقم السري غير صحيح");
    }

    // 2. التأكد من إن الحساب مش معموله بلوك
    if (user.isBlocked) {
        throw new Error("هذا الحساب محظور");
    }

    // 3. مقارنة الباسوورد اللي دخله بالباسوورد المتشفر في الداتا بيز
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("الإيميل أو الرقم السري غير صحيح");
    }

    // 4. إنشاء الـ JWT Token
    // تأكدي إن عندك JWT_SECRET في ملف .env
    const token = jwt.sign(
        { id: user._id, role: user.role }, 
        process.env.JWT_SECRET as string, 
        { expiresIn: "7d" } // التوكن صالح لمدة 7 أيام
    );

    return token;
};