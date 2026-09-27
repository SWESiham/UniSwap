import { Schema, model, Document, Types } from "mongoose";

export interface IFavorite extends Document {
  user: Types.ObjectId;
  listing: Types.ObjectId;
}

const favoriteSchema = new Schema<IFavorite>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
  },
  { timestamps: true }
);

favoriteSchema.index({ user: 1, listing: 1 }, { unique: true });

export default model<IFavorite>("Favorite", favoriteSchema);
