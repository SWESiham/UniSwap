import mongoose, { Schema } from "mongoose";

// شكل بيانات المستخدم في TypeScript. دي Schema مبدئية حسب متطلبات المشروع.
export interface IUser {
    name: string;
    email: string;
    password: string;
    faculty?: string;
    department?: string;
    role: "user" | "admin";
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// الـSchema بتحدد قواعد تخزين البيانات في MongoDB.
const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true, maxlength: 100 },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            // MongoDB بيعمل unique index لمنع تكرار الإيميل.
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        password: {
            type: String,
            required: true,
            // خدمة التسجيل هتشفّر الباسورد قبل الحفظ؛ الـModel مش بيشفّره تلقائيًا.
            // select: false بيخفيه من نتائج الاستعلامات العادية.
            select: false,
        },
        faculty: { type: String, trim: true, maxlength: 100 },
        department: { type: String, trim: true, maxlength: 100 },
        role: {
            type: String,
            enum: ["user", "admin"],
            // التسجيل العادي هيستخدم القيمة الافتراضية، ومش هياخد role من الطلب.
            default: "user",
        },
        isBlocked: { type: Boolean, default: false },
    },
    // Mongoose بيضيف createdAt وupdatedAt ويديرهم تلقائيًا.
    { timestamps: true }
);

// الاسم User هو نفس الاسم المستخدم في علاقات الإعلانات والمفضلة.
export default mongoose.model<IUser>("User", userSchema);
