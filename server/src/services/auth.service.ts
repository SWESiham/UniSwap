import bcrypt from "bcryptjs";
import User from "../models/User";
import type { RegisterInput } from "../validators/auth.validator";

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
