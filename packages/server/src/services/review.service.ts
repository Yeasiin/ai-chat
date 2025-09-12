import { reviewRepository } from "../repository/review.repository";
import { chatService } from "./chat.service";

export const reviewService = {
   getReviews: async (productId: number) => {
      return reviewRepository.getReviews(productId);
   },
   summarizeReviews: async (productId: number) => {
      const reviews = await reviewRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((each) => each.content).join("\n\n");
      const prompt = `Summarize the following customer reviews into a short paragraph highlighting key themes, both positive and negative: ${joinedReviews}`;
      const summary = await chatService.summarizeReview([{ text: prompt }]);
      return summary;
   },
};
