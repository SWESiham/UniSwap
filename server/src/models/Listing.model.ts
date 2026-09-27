import { Schema, model, Document, Types } from "mongoose";

export interface IListing extends Document {
  owner: Types.ObjectId;
  title: string;
  description: string;
  price?: number;
  category: string;
  condition: "new" | "like_new" | "used" | "for_parts";
  type: "sell" | "exchange";
  wantedInExchange?: string;
  images: string[];
  faculty?: string;
  department?: string;
  status: "pending" | "approved" | "rejected" | "sold";
}

const listingSchema = new Schema<IListing>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: Number,
    category: { type: String, required: true },
    condition: {
      type: String,
      enum: ["new", "like_new", "used", "for_parts"],
      required: true,
    },
    type: { type: String, enum: ["sell", "exchange"], default: "sell" },
    wantedInExchange: String,
    images: [String],
    faculty: String,
    department: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "sold"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default model<IListing>("Listing", listingSchema);
