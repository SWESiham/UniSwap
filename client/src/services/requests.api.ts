import api from "./api";

export const createRequest = (data: any) => api.post("/requests", data);
export const listRequests = () => api.get("/requests");
export const getRequest = (id: string) => api.get(`/requests/${id}`);
export const updateRequest = (id: string, data: any) => api.patch(`/requests/${id}`, data);
export const deleteRequest = (id: string) => api.delete(`/requests/${id}`);
