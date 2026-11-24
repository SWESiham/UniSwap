import bcrypt from "bcryptjs";
import User from "../models/User";
import type { RegisterInput, LoginInput } from "../validators/auth.validator";
import { AuthError } from "../utils/AuthError";
import { createToken } from "../utils/jwt";

export async function registerUser(data: RegisterInput) {
    // الـhash قيمة لا يمكن استرجاع الباسورد الأصلي منها.
    const passwordHash = await bcrypt.hash(data.password, 12);

    // بناخد الحقول المسموحة بس. المستخدم ما يقدرش يسجل نفسه كأدمن.
    const user = await User.create({
        name: data.name,
        email: data.email,
        password: passwordHash,
        ...(data.faculty !== undefined ? { faculty: data.faculty } : {}),
        ...(data.department !== undefined ? { department: data.department } : {}),
        role: "user",
        isBlocked: false,
    });

    // create بيرجع الباسورد المشفر؛ عشان كده بنكوّن الرد من حقول آمنة فقط.
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        faculty: user.faculty,
        department: user.department,
        role: user.role,
        createdAt: user.createdAt,
    };
}

export async function loginUser(data: LoginInput, adminOnly = false) {
    // الباسورد مخفي في الموديل؛ بنطلبه هنا بس علشان نقارنه.
    const user = await User.findOne({ email: data.email }).select("+password");
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
        throw new AuthError(401, "Incorrect email or password");
    }
    if (user.isBlocked) {
        throw new AuthError(403, "Your account is blocked");
    }
    if (adminOnly && user.role !== "admin") throw new AuthError(403, "Admin access required");

    return {
        token: createToken(user._id.toString(), user.tokenVersion ?? 0),
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
}

