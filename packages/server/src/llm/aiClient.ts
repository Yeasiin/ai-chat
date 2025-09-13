import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { InferenceClient } from "@huggingface/inference";
import template from "./prompts/chatbot.txt";
// HUGGING_FACE_API_KEY
const gemini_client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const hugging_face_client = new InferenceClient(
   process.env.HUGGING_FACE_API_KEY
);

const parkInfo = fs.readFileSync(
   path.join(__dirname, "prompts", "WonderWorld.md"),
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

export const aiClient = {
   async sendMessage(
      prompt: PartsType,
      history: {
         role: "user" | "model";
         parts: PartsType;
      }[]
   ): Promise<MessageResponse> {
      const response = await gemini_client.models.generateContent({
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
   async summarizeReview(prompt: string): Promise<MessageResponse> {
      const chatCompletion = await hugging_face_client.chatCompletion({
         provider: "together",
         model: "meta-llama/Llama-3.2-3B-Instruct",
         messages: [
            {
               role: "user",
               content: prompt,
            },
         ],
      });

      const message = chatCompletion.choices[0]?.message.content;

      return {
         id: "1",
         message: message,
      };
   },
};
