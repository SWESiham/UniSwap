import { Schema, model, Document, Types } from "mongoose";

export interface IRequestPost extends Document {
  owner: Types.ObjectId;
  title: string;
  description: string;
  budget?: number;
  category: string;
}

const requestSchema = new Schema<IRequestPost>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: Number,
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IRequestPost>("RequestPost", requestSchema);
