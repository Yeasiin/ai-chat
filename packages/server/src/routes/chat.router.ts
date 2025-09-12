import express from "express";
import { multerUpload } from "../utils/storage";
import { chatController } from "../controllers/chat.controller";

export const chatRouter = express.Router();

chatRouter.post(
   "/api/v1/chat",
   multerUpload.single("image"),
   chatController.chat
);
