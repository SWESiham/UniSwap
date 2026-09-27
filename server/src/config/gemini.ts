import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY as string;
export const genAI = new GoogleGenerativeAI(apiKey);

// Used by modules/listings/ai/ai.service.ts to analyze an uploaded product image
// and return { name, category, brand, condition, description }.
