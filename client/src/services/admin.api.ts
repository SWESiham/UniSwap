import api from "./api";

export const getStats = () => api.get("/admin/stats");
export const listUsers = (search?: string) => api.get("/admin/users", { params: { search } });
export const blockUser = (id: string) => api.patch(`/admin/users/${id}/block`);
export const unblockUser = (id: string) => api.patch(`/admin/users/${id}/unblock`);
export const listPendingListings = () => api.get("/admin/listings");
export const approveListing = (id: string) => api.patch(`/admin/listings/${id}/approve`);
export const rejectListing = (id: string) => api.patch(`/admin/listings/${id}/reject`);
export const listReports = () => api.get("/admin/reports");
