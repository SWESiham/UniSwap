import Category from "../models/Category";
export async function getAvailableCategories() {
    return await Category.find({ isActive: true });
} 

