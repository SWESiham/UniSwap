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
    const prompt = `You are helping a university student sell a used item on a marketplace.
Look at the photos and fill the listing. Write title and description in ${lang === "ar" ? "Arabic" : "English"
        }. Pick the category ONLY from the allowed list. Be honest about condition.
If the image is not a sellable item, set title to an empty string.`;
    const response = await generateWithRetry(() => {
        return ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: [{ role: "user", parts: [...imageParts, { text: prompt }] }],
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        category: { type: Type.STRING, enum: categories },
                        brand: { type: Type.STRING },
                        condition: {
                            type: Type.STRING,
                            enum: ["New", "Like New","Used"],
                        },
                        description: { type: Type.STRING },
                    },
                    required: ["title", "category", "condition", "description"],
                },
            },
        })
    });
    return JSON.parse(response.text as string);
}