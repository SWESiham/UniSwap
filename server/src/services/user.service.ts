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


