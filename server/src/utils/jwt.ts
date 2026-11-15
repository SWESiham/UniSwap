import jwt from "jsonwebtoken";

function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is missing");
    return secret;
}

export function createToken(userId: string, version = 0) {
    // التوكن شايل رقم المستخدم فقط؛ الصلاحيات بنجيبها من الداتابيز.
    return jwt.sign({ version }, getSecret(), {
        subject: userId,
        algorithm: "HS256",
        expiresIn: "1h",
    });
}

export function verifyToken(token: string) {
    return jwt.verify(token, getSecret(), { algorithms: ["HS256"] });
}
