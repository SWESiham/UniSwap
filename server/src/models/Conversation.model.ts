import { Schema, model, Document, Types } from "mongoose";

export interface IConversation extends Document {
  participants: Types.ObjectId[];
  listing?: Types.ObjectId;
}

const conversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    listing: { type: Schema.Types.ObjectId, ref: "Listing" },
  },
  { timestamps: true }
);

export default model<IConversation>("Conversation", conversationSchema);
