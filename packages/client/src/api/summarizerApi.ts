import { api } from "./api";

export const summarizerApi = {
   getReviews: (id: number) => {
      return api.get(`/product/${id}/review`).then((data) => data.data);
   },
   summarizeReview: (id: number) => {
      return api
         .post(`/product/${id}/review/summarize`)
         .then((data) => data.data);
   },
};
