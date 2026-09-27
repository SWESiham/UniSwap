import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as listingsService from "./listings.service";

export const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const listing = await listingsService.createListing(req.user!.id, req.body);
    res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const listing = await listingsService.getListingById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    res.json(listing);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const listing = await listingsService.updateListing(req.params.id, req.user!.id, req.body);
    res.json(listing);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await listingsService.deleteListing(req.params.id, req.user!.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const sold = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const listing = await listingsService.markSold(req.params.id, req.user!.id);
    res.json(listing);
  } catch (err) {
    next(err);
  }
};
