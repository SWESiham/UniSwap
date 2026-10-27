//create seller
//login as seller
// add item 
import { Request, Response } from "express";
import { addSellerService, loginService } from "../services/user.service";

export const addSeller = async (req: Request, res: Response) => {
    try {
        const newSeller = await addSellerService(req.body);
        return res.status(201).json({ message: "تم إضافة البائع بنجاح", user: newSeller });
    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        // استدعاء السيرفيس للحصول على التوكن
        const token = await loginService(email, password);

        return res.status(200).json({ 
            message: "تم تسجيل الدخول بنجاح", 
            token 
        });
    } catch (err: any) {
        return res.status(401).json({ message: err.message });
    }
};