import { Request, Response, NextFunction } from "express";
import User from "../../models/User.model";
import Listing from "../../models/Listing.model";
import Report from "../../models/Report.model";
import Category from "../../models/Category.model";

export const getStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [totalUsers, totalListings, pendingReports] = await Promise.all([
      User.countDocuments(),
      Listing.countDocuments(),
      Report.countDocuments({ status: "open" }),
    ]);
    res.json({ totalUsers, totalListings, pendingReports });
  } catch (err) {
    next(err);
  }
};

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;
    const filter = search ? { name: { $regex: search as string, $options: "i" } } : {};
    res.json(await User.find(filter).select("-password"));
  } catch (err) {
    next(err);
  }
};

export const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await User.findByIdAndUpdate(req.params.id, { isBlocked: true }, { new: true }));
  } catch (err) {
    next(err);
  }
};

export const unblockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await User.findByIdAndUpdate(req.params.id, { isBlocked: false }, { new: true }));
  } catch (err) {
    next(err);
  }
};

export const listPendingListings = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Listing.find({ status: "pending" }));
  } catch (err) {
    next(err);
  }
};

export const approveListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Listing.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true }));
  } catch (err) {
    next(err);
  }
};

export const rejectListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Listing.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true }));
  } catch (err) {
    next(err);
  }
};

export const listReports = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Report.find().populate("listing").populate("reporter", "name"));
  } catch (err) {
    next(err);
  }
};

export const resolveReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Report.findByIdAndUpdate(req.params.id, { status: "resolved" }, { new: true }));
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json(await Category.create(req.body));
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
