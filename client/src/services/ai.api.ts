import api from "./api";
export async function analyzeImages(files: File[], lang: 'en' | 'ar') {
    const form = new FormData();
    for (const f of files)
        form.append('images', f);
    form.append("lang", lang);
    const res = await api.post("/ai/analyze", form);
    return res.data;
}