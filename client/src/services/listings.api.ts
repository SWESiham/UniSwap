import axios from "axios";
import { api } from "./api";

export const cListing = async (data: any) => {
    console.log("api listing",data);
    
    const res = await api.post('/listings', data);
    return res.data.listing;
}