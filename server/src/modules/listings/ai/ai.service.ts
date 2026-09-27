import { genAI } from "../../../config/gemini";

// Sends an image buffer to Gemini and parses out structured listing data.
// If Gemini fails or the response isn't valid JSON, throws so the controller
// can return a clean fallback (user fills the form manually).
export const analyzeProductImage = async (imageBuffer: Buffer, mimeType: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are analyzing a product photo for a university marketplace listing.
Return ONLY valid JSON with these exact keys: name, category, brand, condition, description.
condition must be one of: new, like_new, used, for_parts.`;

  const result = await model.generateContent([
    prompt,
    { inlineData: { data: imageBuffer.toString("base64"), mimeType } },
  ]);

  const text = result.response.text();
  return JSON.parse(text); // TODO: wrap in try/catch upstream for malformed JSON
};
