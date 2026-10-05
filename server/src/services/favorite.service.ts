import {favoriteModel}  from "../models/Favorite.js";



// ///////////////////////// ADD Favourite //////////////////////////////////
export async function addFavorite(userId: string, listingId: string) {
  const userFav = await favoriteModel.findOne({
    user: userId,
    listing: listingId,
  });

  if (userFav) {
    return null;
  }

  return await favoriteModel.create({
    user: userId,
    listing: listingId,
  });
}





// DELETE Favourite
export const deleteFavorite = async (
  idAuth: string,
  listing: string
) => {
  const userFav = await favoriteModel.findOne({
    user: idAuth,
    listing: listing
  });

  if (!userFav) {
    return null;
  }

  await favoriteModel.deleteOne({
    user: idAuth,
    listing: listing
  });

  return true;
};


// GET Favourite
export const getFavorites = async (
  idFavUser: string
) => {
  const favorites = await favoriteModel.find({
    user: idFavUser
  });

  return favorites;
};