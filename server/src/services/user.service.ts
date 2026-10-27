import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const addSellerService = async (userData: any) => {
    // 1. التأكد إن الإيميل مش موجود قبل كدا
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("الإيميل ده مسجل بيه حساب قبل كدا");
    }

    // 2. تشفير الباسوورد
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // 3. إنشاء المستخدم وتحديد دوره كـ seller
    const newSeller = await User.create({
        ...userData,
        password: hashedPassword,
        role: "seller" // بنجبر الكود يخليه بائع
    });

    return newSeller;
};


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