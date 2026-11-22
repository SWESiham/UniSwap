import { api } from "./api";

export const cListing = async (data: any) => {
    // console.log("api listing", data);
    try {
        const res = await api.post('api/listings', data);
        return res.data.listing;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const rListing = async (id: string) => {
    try {
        const res = await api.get(`api/listings/${id}`);
        return res.data.listing;
    } catch (err) {
        console.error(err);
    }
}

export const rUserListing = async (sellerId: string) => {
    try {
        const res = await api.get(`api/listings/user/${sellerId}`);
        return res.data;

    } catch (err) {
        console.error(err);
    }
}

export const uListing = async (id: string,payload:any) => {
    try {
        const res = await api.patch(`api/listings/${id}`,payload);
        return res.data.listing;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const sListing = async (id: string) => {
     try {
        const res = await api.patch(`api/listings/${id}/sold`);
        return res.data.listing;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
export const dListing = async (id: string) => {
     try {
        const res = await api.delete(`api/listings/${id}`);
        return res.data.listing;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const rCategoryListings = async (categoryId: string) => {
  try {
    const res = await api.get(`api/listings?category=${categoryId}`);
    return res.data.listings || res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};