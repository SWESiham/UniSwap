import { Schema, model} from "mongoose";


 const favoriteSchema = new Schema(
  {
    user: {
       type: Schema.Types.ObjectId, 
       ref: "User", 
       required: true
       },

    listing: {
       type: Schema.Types.ObjectId,
        ref: "Listing", 
        required: true
       },
  },
  { timestamps: true }
);

export const favoriteModel = model("Favorite", favoriteSchema);
