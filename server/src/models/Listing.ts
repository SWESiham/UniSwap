
import mongoose, { Schema } from "mongoose";

export interface IListing {
    seller: mongoose.Types.ObjectId;
    title: string;
    description: string;
    brand?: string;
    category: mongoose.Types.ObjectId;
    price: number;
    condition: 'new' | 'like_new' | 'very_good' | 'good' | 'acceptable';
    department?: string;
    faculty?: string;
    images: string[];
    isApproved: boolean;
    status: 'active' | 'sold' | 'deleted';
    type: 'sell' | 'exchange';
}

const ListingSchema: Schema = new Schema(
    {
        seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        brand: { type: String },
        price: { type: Number, required: true },
        category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
        condition: { type: String, enum: ['new', 'like_new', 'very_good', 'good', 'acceptable'], required: true },
        department: { type: String },
        faculty: { type: String },
        images: [{ type: Array}],
        isApproved: { type: Boolean, default: true },
        status: { type: String, enum: ['active', 'sold', 'deleted'], default: 'active' },
        type: { type: String, enum: ['sell', 'exchange'], default: 'sell' },


    }, { timestamps: true }
)

export default mongoose.model<IListing>('Listing',ListingSchema)