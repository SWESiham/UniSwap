import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    university: { type: String },
    faculty: { type: String },
    department: { type: String },
    studentId: { type: String },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['buyer','seller', 'admin'], default: 'buyer' },
    isBlocked: { type: Boolean, default: false },
}, { timestamps: true });

export default model('User', userSchema);