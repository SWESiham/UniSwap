import { gCatByIdSer, getAvailableCategories } from "../services/category.service"
import { Request, Response } from 'express';
export const getCategories = async (_req: Request, res: Response) => {
    try {
        const cats = await getAvailableCategories();
        res.json(cats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to load categories" })
    }
}

export const gCatById = async (req: Request, res: Response) => {
    try {
        const cat = await gCatByIdSer((req.params.id)as string);

        if (!cat) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(cat);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to load category" });
    }
};