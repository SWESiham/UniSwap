import Listing from "../../models/Listing.model";

export const createListing = (ownerId: string, data: any) =>
  Listing.create({ ...data, owner: ownerId });

export const getListingById = (id: string) => Listing.findById(id).populate("owner", "name faculty");

export const updateListing = (id: string, ownerId: string, data: any) =>
  Listing.findOneAndUpdate({ _id: id, owner: ownerId }, data, { new: true });

export const deleteListing = (id: string, ownerId: string) =>
  Listing.findOneAndDelete({ _id: id, owner: ownerId });

export const markSold = (id: string, ownerId: string) =>
  Listing.findOneAndUpdate({ _id: id, owner: ownerId }, { status: "sold" }, { new: true });
