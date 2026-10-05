import { getAvailableCategories } from "../services/category.service"
import { Request, Response } from 'express';
export const getCategories = async (_req: Request, res: Response) => {
    try {
        const cats = await getAvailableCategories();
        res.json(cats);
    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Failed to load categories"})
    }
} 