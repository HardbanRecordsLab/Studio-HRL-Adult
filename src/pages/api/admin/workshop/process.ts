import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdminSession } from "@/lib/adminSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!requireAdminSession(req, res)) {
    return;
  }

  const { mode, payload } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const HUGGING_FACE_TOKEN = process.env.HUGGING_FACE_TOKEN;

  try {
    switch (mode) {
      case "visual":
        // PRO HANDLING: Hugging Face (Model Flux.1 Schnell)
        const hfResponse = await fetch(
          "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
          {
            headers: {
              Authorization: `Bearer ${HUGGING_FACE_TOKEN}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: payload.prompt }),
          },
        );

        if (hfResponse.status === 503) {
          return res.status(503).json({
            status: "loading",
            message:
              "Model AI się wybudza (Cold Start). Spróbuj ponownie za ok. 30-60 sekund.",
          });
        }

        if (hfResponse.status === 429) {
          return res.status(429).json({
            status: "limit",
            message:
              "Osiągnięto darmowy limit Hugging Face. Odczekaj chwilę lub użyj klucza PRO.",
          });
        }

        if (!hfResponse.ok) {
          const errData = await hfResponse.json();
          throw new Error(
            errData.error || "Wystąpił błąd po stronie Hugging Face.",
          );
        }

        const arrayBuffer = await hfResponse.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString("base64");
        const dataUrl = `data:image/jpeg;base64,${base64Image}`;

        return res.status(200).json({
          status: "success",
          resultUrl: dataUrl,
          message: "Obraz wygenerowany pomyślnie.",
        });

      case "script":
        // PRO HANDLING: Gemini 1.5 Flash
        if (!GEMINI_API_KEY)
          throw new Error("Brak klucza GEMINI_API_KEY w konfiguracji.");

        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Jesteś ekspertem marketingu adult. Wygeneruj tekst typu ${payload.type} w tonie ${payload.tone}. Temat: ${payload.prompt}. Odpowiedź daj bezpośrednio, bez wstępów.`,
                    },
                  ],
                },
              ],
              generationConfig: { temperature: 0.8, maxOutputTokens: 1024 },
            }),
          },
        );

        const geminiData = await geminiResponse.json();
        const generatedText =
          geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

        return res.status(200).json({
          status: "success",
          text: generatedText?.trim(),
          message: "Skrypt wygenerowany pomyślnie.",
        });

      case "bio":
        // PRO BIO ARCHITECT: Gemini 1.5 Flash
        if (!GEMINI_API_KEY)
          throw new Error("Brak klucza GEMINI_API_KEY w konfiguracji.");

        const bioPrompt = `
          Jesteś ekspertem od kreowania wizerunku modelek w branży adult premium. 
          Na podstawie opisu: "${payload.prompt}" stwórz profesjonalne dane profilowe w formacie JSON.
          Ton: ${payload.tone}.
          
          ZASADA KRYTYCZNA: Nie podawaj żadnych cen, stawek ani kwot. 
          
          Wymagany format JSON (ściśle!):
          {
            "intro": "krótki zmysłowy cytat modelki (max 120 znaków)",
            "bio": "pełny, pociągający opis o mnie (ok. 500-800 znaków)",
            "characteristics": ["5-7 tagów cech"],
            "measurements": { "Wzrost": "...", "Waga": "...", "Biust": "...", "Talia": "...", "Biodra": "..." },
            "languages": ["Polski", "Angielski"],
            "likes": [
              { "title": "np. Spotkania", "description": "krótki elegancki opis lubienia danej rzeczy" },
              { "title": "np. Estetyka", "description": "opis" },
              { "title": "np. Emocje", "description": "opis" }
            ],
            "boundaries": ["lista 4-5 rzeczy, których modelka nie akceptuje, np. brak higieny, agresja"],
            "discretion": "profesjonalne oświadczenie o dyskrecji i bezpieczeństwie (1-2 zdania)"
          }
        `;

        const bioResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: bioPrompt }] }],
              generationConfig: { responseMimeType: "application/json" },
            }),
          },
        );

        const bioData = await bioResponse.json();
        const bioResult = JSON.parse(
          bioData.candidates?.[0]?.content?.parts?.[0]?.text,
        );

        return res.status(200).json({
          status: "success",
          data: bioResult,
          message:
            "BIO stworzone zgodnie z nowym szablonem Premium HRL (bez cen).",
        });

      default:
        return res.status(200).json({
          status: "info",
          message: "System gotowy do pracy w trybie darmowym.",
        });
    }
  } catch (error: any) {
    console.error("PRO API Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Błąd krytyczny: " + error.message,
    });
  }
}
