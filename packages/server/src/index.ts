import { config } from "dotenv";
config();

import cors from "cors";
import morgan from "morgan";
import express, {
   type Request,
   type Response,
   type NextFunction,
} from "express";
import z from "zod";
import { StatusCodes } from "http-status-codes";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";
import { chatService } from "./services/chat.service";

const app = express();

app.use(
   cors({
      credentials: true,
      origin: "http://localhost:5173",
   })
);
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api", (req: Request, res: Response) => {
   res.json({
      message: "Yep! Working",
   });
});

const messageSchema = z.object({
   role: z.enum(["user", "model"]),
   parts: z.array(z.object({ text: z.string() })),
});

const promptSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, "prompt text is required")
      .max(1000, "prompt length is too big"),
   userId: z.string().min(1, "User id is required"),
   sessionId: z.string().min(1, "Session is required"),
   history: z.array(messageSchema).optional().default([]),
});

app.post("/api/v1/chat", async (req: Request, res: Response) => {
   const { prompt, userId, sessionId, history } = promptSchema.parse(req.body);
   const { id, message } = await chatService.sendMessage(prompt, history);

   res.status(StatusCodes.OK).json({
      success: true,
      message: message,
   });
});

const PORT = process.env.PORT || 5000;

// handle no router found
app.use((req: Request, res: Response, next: NextFunction) => {
   next(new AppError(`Can't find ${req.originalUrl} on server`, 400));
});
// handle error
app.use(globalErrorHandler);

app.listen(PORT, () => {
   console.log(`app listening on port http://localhost:${PORT}`);
});
