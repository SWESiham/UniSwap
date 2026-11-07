import { Request, Response } from "express";
import { loginService } from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        const token = await loginService(email, password);

        return res.status(200).json({ 
            message: "تم تسجيل الدخول بنجاح", 
            token 
        });
    } catch (err: any) {
        return res.status(401).json({ message: err.message });
    }
};