import api from "./api";

export const createListing = (data: any) => api.post("/listings", data);
export const getListing = (id: string) => api.get(`/listings/${id}`);
export const updateListing = (id: string, data: any) => api.patch(`/listings/${id}`, data);
export const deleteListing = (id: string) => api.delete(`/listings/${id}`);
export const markSold = (id: string) => api.patch(`/listings/${id}/sold`);

export const analyzeImage = (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  return api.post("/listings/ai/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
