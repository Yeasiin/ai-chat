import { type Request, type Response } from "express";
import z from "zod";
import { StatusCodes } from "http-status-codes";
import { aiClient } from "../llm/aiClient";

const textPartSchema = z.object({ text: z.string() });
const inlineDataSchema = z.object({
   inlineData: z.object({
      mimeType: z.string(),
      data: z.string(),
      text: z.string().optional(),
   }),
});
const messageSchema = z.object({
   role: z.enum(["user", "model"]),
   parts: z.tuple([textPartSchema, inlineDataSchema.optional()]),
});
const promptSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, "prompt text is required")
      .max(1000, "prompt length is too big"),
   userId: z.string().min(1, "User id is required"),
   sessionId: z.string().min(1, "Session is required"),
   history: z.preprocess((val) => {
      if (typeof val === "string") {
         try {
            return JSON.parse(val);
         } catch (error) {
            return [];
         }
      }
   }, z.array(messageSchema).optional().default([])),
});

export const chatController = {
   chat: async (req: Request, res: Response) => {
      const { prompt, userId, sessionId, history } = promptSchema.parse(
         req.body
      );
      const promptParts: Array<
         | { text: string }
         | { text?: string; inlineData: { data: string; mimeType: string } }
      > = [{ text: prompt }];

      if (req.file) {
         console.log(req.file.buffer.toString("base64"));
         promptParts.push({
            inlineData: {
               mimeType: req.file.mimetype,
               data: req.file.buffer.toString("base64"),
            },
         });
      }
      const { id, message } = await aiClient.sendMessage(
         promptParts,
         // @ts-ignore
         history
      );
      res.status(StatusCodes.OK).json({
         success: true,
         message: message,
      });
   },
};
