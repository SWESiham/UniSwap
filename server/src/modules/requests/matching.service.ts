import Listing from "../../models/Listing.model";
import { IRequestPost } from "../../models/Request.model";

// Simple keyword + category matching (V1). Can evolve into a smarter
// scored match later without changing the API contract.
export const findMatchingListings = async (request: IRequestPost) => {
  return Listing.find({
    status: "approved",
    category: request.category,
    title: { $regex: request.title.split(" ")[0], $options: "i" },
  }).limit(10);
};
