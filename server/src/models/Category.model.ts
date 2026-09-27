import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  nameAr?: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  nameAr: String,
});

export default model<ICategory>("Category", categorySchema);
