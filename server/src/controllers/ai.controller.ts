import { Request, Response } from 'express';
import fs from 'fs/promises'
import path from 'path';
import { randomUUID } from "crypto";
import { analyzeImages } from '../services/ai.service';
import Category from '../models/Category';

export const analyze = async (req: Request, res: Response) => {
    try {
        const files = (req.files as Express.Multer.File[]) || [];
        if (!files.length)
            return res.status(400).json({ message: "No Images" });
        const lang = req.body.lang === "ar" ? "ar" : "en";
        console.log("lang received:", req.body.lang, "→", lang);


        const uploadDir = path.join(__dirname, '../../uploads/');
        await fs.mkdir(uploadDir, { recursive: true });

        const imgUrls: string[] = [];
        for (const f of files) {
            const ext = f.mimetype === "image/png" ? 'png' : "jpg";
            const name = `${randomUUID()}.${ext}`;
            await fs.writeFile(path.join(uploadDir, name), f.buffer);
            imgUrls.push(`/uploads/${name}`);
        }

        try {
            const cats = await Category.find({ isActive: true });
            const names = cats.map((c: any) => c.name);
            const result = await analyzeImages(files, names, lang);
            const cat = cats.find((c) => c.name === result.category);
            res.json({ ...result, categoryId: cat?.id, images: imgUrls });

        } catch (err) {
            console.error("AI failed", err);
            return res.status(200).json({
                fallback: true,
                message: lang === "ar" ? "مقدرناش نحلل الصور، كمّل البيانات يدوياً" : "We couldn't analyze the images, please fill the details manually",
                images: imgUrls,
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}