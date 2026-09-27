import { Schema, model, Document, Types } from "mongoose";

export interface IExchangeProposal extends Document {
  listing: Types.ObjectId;
  proposer: Types.ObjectId;
  offeredItem: string;
  status: "pending" | "accepted" | "declined";
}

const exchangeSchema = new Schema<IExchangeProposal>(
  {
    listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
    proposer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    offeredItem: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
  },
  { timestamps: true }
);

export default model<IExchangeProposal>("ExchangeProposal", exchangeSchema);
