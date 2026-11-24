export interface Listing {
  _id: string;
  seller: string | {
    _id: string;
    username?: string;
  };

  title: string;
  description: string;
  brand?: string;

  category: string | {
    _id: string;
    name?: string;
  };

  price: number;

  condition:
    | "new"
    | "like_new"
    | "used"
    | "very_good"
    | "good"
    | "acceptable";

  department?: string;
  faculty?: string;

  images: string[];

  isApproved: boolean;
  approvalStatus: "pending" | "approved" | "rejected";
  rejectionReason?: string;

  status: "active" | "sold" | "deleted";
  type: "sell" | "exchange" | "both";
  isSold: boolean;

  pSpot?: string;
  pContact?: "chat" | "phone" | "whatsapp";
  exWith?: string;

  createdAt?: string;
  updatedAt?: string;
}