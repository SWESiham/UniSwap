import type { Response } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import type { AuthRequest } from "../middlewares/auth.middleware";
import User from "../models/User";
import Listing from "../models/Listing";
import { favoriteModel } from "../models/Favorite";
import "../models/Category";

const pagination = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(12),
});

export async function publicProfile(req: AuthRequest, res: Response) {
    const id = req.params.id;
    if (typeof id !== "string" || !mongoose.isObjectIdOrHexString(id)) {
        res.status(400).json({ error: "Invalid user id" }); return;
    }
    try {
        const user = await User.findOne({ _id: id, isBlocked: false })
            .select("name faculty department createdAt");
        if (!user) { res.status(404).json({ error: "User not found" }); return; }
        res.json({ user });
    } catch { res.status(500).json({ error: "Could not load user" }); }
}

export async function myItems(req: AuthRequest, res: Response) {
    const parsed = pagination.safeParse(req.query);
    if (!parsed.success) { res.status(400).json({ error: "Invalid pagination" }); return; }
    const { page, limit } = parsed.data;
    const skip = (page - 1) * limit;
    try {
        if (req.path === "/me/favorites") {
            const filter = { user: req.user!.id };
            const [items, total] = await Promise.all([
                favoriteModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
                    .populate({ path: "listing", match: { isApproved: true, status: "active", isSold: false } }),
                favoriteModel.countDocuments(filter),
            ]);
            res.json({ items, total, page, limit }); return;
        }
        const filter = req.path === "/me/sold" ? {
            seller: req.user!.id, $or: [{ isSold: true }, { status: "sold" as const }],
        } : { seller: req.user!.id, status: { $ne: "deleted" as const } };
        const [items, total] = await Promise.all([
            Listing.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("category", "name"),
            Listing.countDocuments(filter),
        ]);
        res.json({ items, total, page, limit });
    } catch { res.status(500).json({ error: "Could not load items" }); }
}

export async function dashboard(req: AuthRequest, res: Response) {
    try {
        const seller = req.user!.id;
        const [listings, sold, favorites] = await Promise.all([
            Listing.countDocuments({ seller, status: { $ne: "deleted" as const } }),
            Listing.countDocuments({ seller, $or: [{ isSold: true }, { status: "sold" as const }] }),
            favoriteModel.countDocuments({ user: seller }),
        ]);
        res.json({ listings, sold, favorites, requests: null, chats: null,
            unavailable: ["requests", "chats"] });
    } catch { res.status(500).json({ error: "Could not load dashboard" }); }
}

export function requestsUnavailable(_req: AuthRequest, res: Response) {
    res.status(501).json({ error: "Requests module is not implemented by the team yet" });
}
