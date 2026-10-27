import Listing from "../models/Listing"
import { ApiError } from "../utils/ApiError";
// create -> c
export const cListingService = async (listing: any, sellerId: string) => {
    const { title, description, price, category, condition, images } = listing;
    return Listing.create({
        title, description, price, category, condition, images,
        seller: sellerId,
        approvalStatus: "pending"
    });
};
// retrieve -> r
export const rListingService = async (id: string) => {
    return Listing.findById(id).populate('seller', "name university faculty")
}
// update -> u
export const uListingService = async (id: string, sellerId: string, data: any) => {
    const { title, description, price, category, condition, images } = data;
    const listing = await Listing.findOneAndUpdate(
        { _id: id, seller: sellerId, isSold: false },
        { title, description, price, category, condition, images },
        { returnDocument: "after" , runValidators: true })
    if (!listing)
        throw { status: 404, message: "Listing not found, not yours, or already sold" };

    return listing;

}
// delete -> d 
export const dListingService = async (id:string,sellerId:string) => {
    const listing = await Listing.findOneAndDelete(
        { _id: id, seller: sellerId },
    )
    if (!listing)
        throw { status: 404, message: "Listing not found or not yours" };
}
// switch to issold -> s 
export const sListingService = async (_id: string, seller: string) => {
    const listing = await Listing.findOneAndUpdate(
        { _id, seller,isSold:false },
        {isSold:true},
        // [{ $set:{isSold :{$not:["$isSold"]}} }], // toggle
         { returnDocument: "after" }
    );
    if (!listing)
        throw { status: 404, message: "Listing not found or not yours" };
    return listing;
}