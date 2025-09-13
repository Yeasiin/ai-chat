import { aiClient } from "../llm/aiClient";
import { reviewRepository } from "../repository/review.repository";

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
      const prompt = `Summarize the following customers reviews into a short paragraph without using generic phrases such as 'mixed reviews', 'positive and negative' ,
      or 'overall feedback'. 
      ${joinedReviews}
      use plain text
      `;

      console.log("hello---x");
      const { message } = await aiClient.summarizeReview(prompt);
      console.log("hello---");
      if (message) {
         await reviewRepository.storeReviewSummary(productId, message);
      }
      return message;
   },
};
