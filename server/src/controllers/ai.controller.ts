import { Request, Response } from 'express';
import fs from 'fs/promises'
import path from 'path';
import { analyzeImages } from '../services/ai.service';
import Category from '../models/Category';

export const analyze = async (req: Request, res: Response) => {
    try {
        const files = (req.files as Express.Multer.File[]) || [];
        if (!files.length)
            return res.status(400).json({ message: "No Images" });
        const lang = req.body.lang === "ar" ? "ar" : "en";
        const cats = await Category.find({ isActive: true });
        const names = cats.map((c: any) => c.name);

        const result = await analyzeImages(files, names, lang);
        const cat = cats.find((c) => c.name === result.category);

        const uploadDir = path.join(__dirname, '../../uploads/');
        await fs.mkdir(uploadDir, { recursive: true });

        const imgUrls: string[] = [];
        for (const f of files) {
            const ext = f.mimetype === "image/png" ? 'png' : "jpg";
            const name = `${crypto.randomUUID()}-${Math.round(Math.random() * 1e6)}.${ext}`;
            await fs.writeFile(path.join(uploadDir, name), f.buffer);
            imgUrls.push(`/uploads/${name}`);
        }

        res.json({ ...result, categoryId: cat?.id, images: imgUrls });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "AI analysis failed" });
    }
}