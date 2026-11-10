import Category from "../models/Category";
export async function getAvailableCategories() {
    return await Category.find({ isActive: true });
} 

export async function gCatByIdSer(id:string) {
    return await Category.find({ _id: id, isActive: true });
}