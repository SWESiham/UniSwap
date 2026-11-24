
import { api } from "./api";

export const getFavorites = async () => {
  const response = await api.get("/favorites");
  return response.data;
};

export const addFavorite = async (listingId: string) => {
  const response = await api.post("/favorites", {
    listing: listingId,
  });
  return response.data;
};

export const deleteFavorite = async (listingId: string) => {
  const response = await api.delete("/favorites", {
    data: { listing: listingId },
  });
  return response.data;
};
