import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import template from "../llm/prompts/chatbot.txt";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const parkInfo = fs.readFileSync(
   path.join(__dirname, "..", "llm", "prompts", "WonderWorld.md"),
   "utf-8"
);
const instruction = template.replace("{{info}}", parkInfo);

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
            systemInstruction: instruction,
         },
      });

      return {
         id: response.responseId,
         message: response.text,
      };
   },
   async summarizeReview(prompt: PartsType): Promise<MessageResponse> {
      const response = await client.models.generateContent({
         model: "gemini-2.5-flash-lite",
         contents: [{ role: "user", parts: prompt }],
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
