import api from "./api";

export const searchListings = (params: Record<string, string>) =>
  api.get("/listings", { params });

export const getFavorites = () => api.get("/favorites");
export const addFavorite = (listingId: string) => api.post("/favorites", { listingId });
export const removeFavorite = (id: string) => api.delete(`/favorites/${id}`);
