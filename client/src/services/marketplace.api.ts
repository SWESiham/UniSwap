import { api } from "./api";

export interface MarketplaceFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: "new" | "like_new" | "used" | "very_good" | "good" | "acceptable";
  type?: "sell" | "exchange" | "both";
  faculty?: string;
  department?: string;
}

export interface MarketplacePagination {
  page?: number;
  limit?: number;
}

// GET /listings
export const getMarketplaceListings = async (
  pagination: MarketplacePagination = {}
) => {
  const response = await api.get("/listings", {
    params: pagination,
  });

  return response.data;
};

// GET /listings/search
export const searchMarketplaceListings = async (query: string) => {
  const response = await api.get("/listings/search", {
    params: { q: query },
  });

  return response.data;
};

// GET /listings/filter
export const filterMarketplaceListings = async (
  filters: MarketplaceFilters
) => {
  const response = await api.get("/listings/filter", {
    params: filters,
  });

  return response.data;
};

// GET /listings/sort
export const sortMarketplaceListings = async (sort: "newest") => {
  const response = await api.get("/listings/sort", {
    params: { sort },
  });

  return response.data;
};