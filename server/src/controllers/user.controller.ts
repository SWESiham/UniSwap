//create seller
//login as seller
// add item 
import { Request, Response } from "express";
import { addSellerService } from "../services/user.service";

export const addSeller = async (req: Request, res: Response) => {
    try {
        const newSeller = await addSellerService(req.body);
        return res.status(201).json({ message: "Seller added successfully", user: newSeller });
    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const currentUser = (req as any).user;
        return res.status(200).json({user:currentUser});
    } catch (err:any) {
        return res.status(500).json({ message: err.message });
    }
}
