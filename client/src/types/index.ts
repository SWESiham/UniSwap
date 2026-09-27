export interface User {
  id: string;
  name: string;
  email: string;
  faculty?: string;
  department?: string;
  role: "student" | "admin";
  avatarUrl?: string;
}

export interface Listing {
  id: string;
  owner: User | string;
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
  createdAt: string;
}

export interface RequestPost {
  id: string;
  owner: User | string;
  title: string;
  description: string;
  budget?: number;
  category: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversation: string;
  sender: string;
  content: string;
  createdAt: string;
}
