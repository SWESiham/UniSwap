import Listing from "../models/Listing";
import { cListingService, dListingService, rListingService, sListingService, uListingService } from "../services/listing.service";
import { Request, Response } from 'express';
import { ApiError } from "../utils/ApiError";
export const cListing = async (req: Request, res: Response) => {
    try {
        const seller = (req as any).user;
        const listingData = req.body;

        const nListing = await cListingService(listingData, seller._id);

        return res.status(201).json({
            message: "Listing created successfully",
            listing: nListing
        })

    } catch (err: any) {
        return res.status(500).json({
            message: "Error creating listing",
            error: err.message
        })
    }
}

export const rOneListing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as any;
        const listing = await rListingService(id);
        if (!listing) return ApiError(res, 404, "Listing not found")
        return res.status(200).json({ listing });
    } catch (err) {
        return ApiError(res, err, "Error fetching listing");
    }
}

export const uListing = async (req: Request, res: Response) => {
    try {

        const  seller = (req as any).user;
        const uListing = await uListingService(req.params.id as string, seller.id, req.body);
        return res.status(200).json({
            message: "Listing updated successfully",
            uListing,
        });
    } catch (err) {
        return ApiError(res, err, "Error updating listing");
    }
}

export const dListing = async (req: Request, res: Response) => {
    try {
        const seller = (req as any).user;
        const listing = await dListingService(req.params.id as string, seller.id);
        return res.status(200).json({
            message: "Listing deleted successfully"
        });
    } catch (err) {
        return ApiError(res, err, "Error deleting listing");
    }
};

export const sListing = async (req: Request, res: Response) => {
    try {
        const  seller  = (req as any).user;
        const listing = await sListingService(req.params.id as string, seller.id);
        return res.status(200).json({
            message: "Listing marked as sold",
            listing,
        });
    } catch (err) {
        return ApiError(res, err, "Error marking listing as sold");
    }
};