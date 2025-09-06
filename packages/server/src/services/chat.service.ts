import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type MessageResponse = {
   id: string | undefined;
   message: string | undefined;
};
export const chatService = {
   async sendMessage(
      prompt: string,
      history: {
         role: "user" | "model";
         parts: Array<{ text: string }>;
      }[]
   ): Promise<MessageResponse> {
      const response = await client.models.generateContent({
         model: "gemini-2.5-flash-lite",
         contents: [...history, { role: "user", parts: [{ text: prompt }] }],
         config: {
            temperature: 0.2,
            maxOutputTokens: 200,
         },
      });

      return {
         id: response.responseId,
         message: response.text,
      };
   },
};
