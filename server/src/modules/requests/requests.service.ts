import RequestPost from "../../models/Request.model";

export const createRequest = (ownerId: string, data: any) =>
  RequestPost.create({ ...data, owner: ownerId });

export const listRequests = (filter: any = {}) => RequestPost.find(filter).sort({ createdAt: -1 });

export const getRequestById = (id: string) => RequestPost.findById(id).populate("owner", "name faculty");

export const updateRequest = (id: string, ownerId: string, data: any) =>
  RequestPost.findOneAndUpdate({ _id: id, owner: ownerId }, data, { new: true });

export const deleteRequest = (id: string, ownerId: string) =>
  RequestPost.findOneAndDelete({ _id: id, owner: ownerId });
