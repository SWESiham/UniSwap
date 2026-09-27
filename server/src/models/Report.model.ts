import { Schema, model, Document, Types } from "mongoose";

export interface IReport extends Document {
  reporter: Types.ObjectId;
  listing: Types.ObjectId;
  reason: string;
  status: "open" | "resolved";
}

const reportSchema = new Schema<IReport>(
  {
    reporter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["open", "resolved"], default: "open" },
  },
  { timestamps: true }
);

export default model<IReport>("Report", reportSchema);
