import mongoose, { Schema } from "mongoose";
export interface ICategory{
    name: string;
    description: string;
    isActive: boolean;
}

const CategorySchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        isActive:{type:Boolean , default:true}
    }
)
export default mongoose.model<ICategory>('Category', CategorySchema);