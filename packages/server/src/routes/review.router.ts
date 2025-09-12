import express from "express";
import { reviewController } from "../controllers/review.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const reviewRouter = express.Router();

reviewRouter.get(
   "/api/v1/product/:id/review",
   asyncHandler(reviewController.getReviews)
);

reviewRouter.post(
   "/api/v1/product/:id/review/summarize",
   asyncHandler(reviewController.summarizeReview)
);
