import Favorite from "../../models/Favorite.model";

export const addFavorite = (userId: string, listingId: string) =>
  Favorite.findOneAndUpdate(
    { user: userId, listing: listingId },
    { user: userId, listing: listingId },
    { upsert: true, new: true }
  );

export const removeFavorite = (userId: string, listingId: string) =>
  Favorite.findOneAndDelete({ user: userId, listing: listingId });

export const getFavorites = (userId: string) =>
  Favorite.find({ user: userId }).populate("listing");
