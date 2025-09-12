import express from "express";
import { reviewController } from "../controllers/review.controller";

export const reviewRouter = express.Router();

reviewRouter.get("/api/v1/product/:id/review", reviewController.getReviews);

reviewRouter.post(
   "/api/v1/product/:id/review/summarize",
   reviewController.summarizeReview
);
