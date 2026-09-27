import Listing from "../../models/Listing.model";

export const searchListings = async (query: {
  search?: string;
  category?: string;
  price?: string;
  condition?: string;
  faculty?: string;
  department?: string;
  page?: string;
}) => {
  const filter: any = { status: "approved" };
  if (query.search) filter.title = { $regex: query.search, $options: "i" };
  if (query.category) filter.category = query.category;
  if (query.condition) filter.condition = query.condition;
  if (query.faculty) filter.faculty = query.faculty;
  if (query.department) filter.department = query.department;
  if (query.price) filter.price = { $lte: Number(query.price) };

  const page = Number(query.page) || 1;
  const limit = 20;

  const [items, total] = await Promise.all([
    Listing.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Listing.countDocuments(filter),
  ]);

  return { items, total, page, pages: Math.ceil(total / limit) };
};
