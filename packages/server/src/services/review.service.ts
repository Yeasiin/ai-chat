import { reviewRepository } from "../repository/review.repository";
import { chatService } from "./chat.service";

export const reviewService = {
   getReviews: async (productId: number) => {
      return reviewRepository.getReviews(productId);
   },
   getReviewSummary: async (productId: number) => {
      return reviewRepository.getSummary(productId);
   },
   summarizeReviews: async (productId: number) => {
      const summary = await reviewRepository.getSummary(productId);
      if (summary) {
         return summary;
      }
      const reviews = await reviewRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((each) => each.content).join("\n\n");
      const prompt = `Summarize the following customer reviews into a short paragraph  highlighting key themes, both positive and negative: 
      ${joinedReviews}
      use plain text
      `;

      const { message } = await chatService.summarizeReview([{ text: prompt }]);
      if (message) {
         await reviewRepository.storeReviewSummary(productId, message);
      }
      return message;
   },
};
