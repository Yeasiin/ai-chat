import type { Request, Response } from "express";
import AppError from "../utils/appError";
import { productRepository } from "../repository/product.repository";
import { StatusCodes } from "http-status-codes";
import { reviewRepository } from "../repository/review.repository";
import { reviewService } from "../services/review.service";

export const reviewController = {
   getReviews: async (
      req: Request<{
         id: string;
      }>,
      res: Response
   ) => {
      const productId = +req.params.id;
      if (isNaN(productId)) {
         throw new AppError("Invalid Product id.", StatusCodes.NOT_FOUND);
      }
      const product = await productRepository.getProduct(productId);

      if (!product) {
         throw new AppError("Product Not Found.", StatusCodes.NOT_FOUND);
      }
      const reviews = await reviewService.getReviews(productId);
      // const summary = await reviewService.getSummary(productId)

      res.json({
         success: true,
         product,
         reviews,
         // summary
      });
   },
   summarizeReview: async (req: Request<{ id: string }>, res: Response) => {
      const productId = +req.params.id;
      if (isNaN(productId)) {
         throw new AppError("Invalid Product id.", StatusCodes.NOT_FOUND);
      }
      const product = await productRepository.getProduct(productId);
      if (!product) {
         throw new AppError("Product Not Found.", StatusCodes.NOT_FOUND);
      }
      const summary = reviewService.summarizeReviews(productId);
      res.json({ summary });
   },
};
