import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type MessageResponse = {
   id: string | undefined;
   message: string | undefined;
};
type PartsType = Array<
   | { text: string }
   | { text?: string; inlineData: { data: string; mimeType: string } }
>;

export const chatService = {
   async sendMessage(
      prompt: PartsType,
      history: {
         role: "user" | "model";
         parts: PartsType;
      }[]
   ): Promise<MessageResponse> {
      const response = await client.models.generateContent({
         model: "gemini-2.5-flash-lite",
         contents: [...history, { role: "user", parts: prompt }],
         config: {
            temperature: 0.2,
            maxOutputTokens: 1024,
         },
      });

      return {
         id: response.responseId,
         message: response.text,
      };
   },
};
