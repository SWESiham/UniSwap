import { ApiError, GoogleGenAI, Type } from "@google/genai";
const sleep = (ms: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms);
    })
}
// TODO: timeout for Gemini call
async function generateWithRetry<T>(task: () => Promise<T>) {
    for (let i = 1; i <= 3; i++) {
        try {
            return await task();
        }
        catch (error) {
            // console.log(error);
            const isRetryable = error instanceof ApiError && (error.status === 429 || error.status === 503);
            if (!isRetryable)
                throw (error);
            if (i === 3) throw (error);
            await sleep(1000);

        }
    }
    throw new Error("DONE");
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
export async function analyzeImages(
    files: Express.Multer.File[],
    categories: string[],
    lang: "en" | 'ar'
) {
    const imageParts = files.map((f) => ({
        inlineData: { mimeType: f.mimetype, data: f.buffer.toString('base64') }
    }));
    const langName = lang === "ar" ? "Arabic" : "English";

    const prompt = `You are helping a university student sell used items on a marketplace.
You receive ${files.length} photo(s). The FIRST photo is the cover.

OUTPUT LANGUAGE: "title" and "description" must be written in ${langName}. All other fields follow their schema.

STEP 1: Look at ALL ${files.length} photos. Count how many distinct items appear across them.
- If every photo shows the same item (different angles): it is a SINGLE item.
- If photos show different items: it is a BUNDLE. You MUST include every distinct item, not only the first.

SINGLE item:
- title: short and specific (brand + model if visible).
- description: 2-3 sentences: what it is, who it suits, visible condition.
- brand: the manufacturer/publisher (e.g. Casio, Springer). If the brand is not visible, write a short generic label in ${langName} such as "Generic" or "No brand". Never use an author name and never leave it empty.
BUNDLE:
- title: join ALL item names with " + " (max 100 characters; shorten names if needed).
- description: first line states the number of items in ${langName}. Then one line per item starting with "• " and a line break between lines. Each line: item name and its condition. Finish with one short sentence about overall condition.
- brand: if all items share the same brand/publisher, use it. Otherwise write a short generic label in ${langName} that describes the group, such as "Books", "Study Supplies" or "Mixed Items". Never use an author name and never leave it empty.
RULES:
- category: choose ONLY from the allowed list, based on the first item.
- condition: be honest. For a bundle use the worst condition.
- Describe only what you can see. Do not invent specs.
- price: a whole number in Egyptian Pounds (EGP), no symbol, never 0. A fair resale price for university students, usually 30-60% of the new price for used items. For a bundle it is the TOTAL for all items.
- If no photo shows a sellable item, set title to an empty string.

REMINDER: Mention ALL ${files.length} photos' items. Write title and description in ${langName}.`;
    
    const response = await generateWithRetry(() => {
        return ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: [{ role: "user", parts: [{ text: prompt }, ...imageParts] }],
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        category: { type: Type.STRING, enum: categories },
                        brand: { type: Type.STRING },
                        price: { type: Type.NUMBER },
                        condition: {
                            type: Type.STRING,
                            enum: ["New", "Like New", "Used"],
                        },
                        description: { type: Type.STRING },
                    },
                    required: ["title", "category", "condition", "description", 'brand', 'price'],
                },
            },
        })
    });
    return JSON.parse(response.text as string);
}