import { api } from "./api";

export const cListing = async (data: any) => {
    // console.log("api listing", data);
    try {
        const res = await api.post('/listings', data);
        return res.data.listing;
    } catch (err) {
        console.error(err);
    }
}

export const rListing = async (id: string) => {
    try {
        const res = await api.get(`/listings/${id}`);
        return res.data.listing;
    } catch (err) {
        console.error(err);
    }
}

export const rUserListing = async (sellerId: string) => {
    try {
        const res = await api.get(`/listings/user/${sellerId}`);
        return res.data;

    } catch (err) {
        console.error(err);
    }
}