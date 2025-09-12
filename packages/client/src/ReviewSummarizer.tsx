import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { summarizerApi } from "./api/summarizerApi";
import ReviewStar from "./components/ReviewStar";
import { Button } from "./components/ui/button";
import PageSkeleton from "./components/skeleton/PageSkeleton";
import { useEffect, useState } from "react";

type ReviewType = {
   author: string;
   content: string;
   createdAt: string;
   id: number;
   productId: number;
   rating: number;
};

export default function ReviewSummarizer() {
   const [summary, setSummary] = useState();
   const { id } = useParams();
   const productId = id ? +id : 5;
   console.log(productId, "---productId");
   const reviewsQuery = useQuery({
      queryKey: ["reviews", productId],
      queryFn: () => summarizerApi.getReviews(productId),
   });

   const summarizeMutation = useMutation({
      mutationFn: summarizerApi.summarizeReview,
   });

   useEffect(() => {
      setSummary(undefined); // reset immediately on route change
   }, [productId]);

   useEffect(() => {
      if (reviewsQuery.data?.summary) {
         setSummary(reviewsQuery.data.summary);
      }
   }, [reviewsQuery.data]);

   useEffect(() => {
      if (summarizeMutation.data?.summary) {
         setSummary(summarizeMutation.data.summary);
      }
   }, [summarizeMutation.data]);

   if (reviewsQuery.isLoading) {
      return (
         <div className="max-w-2xl mx-auto">
            <div className="pt-4 mb-6 space-y-5">
               <PageSkeleton />
               <PageSkeleton />
               <PageSkeleton />
            </div>
         </div>
      );
   }

   return (
      <div className="max-w-2xl mx-auto">
         <div className="pt-4 mb-6">
            {summary ? (
               <p>{summary}</p>
            ) : (
               <Button
                  onClick={() => summarizeMutation.mutate(productId)}
                  className="cursor-pointer"
                  disabled={summarizeMutation.isPending}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width={16}
                     height={16}
                     viewBox="0 0 24 24"
                  >
                     <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="m15 2l.539 2.392a5.39 5.39 0 0 0 4.07 4.07L22 9l-2.392.539a5.39 5.39 0 0 0-4.07 4.07L15 16l-.539-2.392a5.39 5.39 0 0 0-4.07-4.07L8 9l2.392-.539a5.39 5.39 0 0 0 4.07-4.07zM7 12l.385 1.708a3.85 3.85 0 0 0 2.907 2.907L12 17l-1.708.385a3.85 3.85 0 0 0-2.907 2.907L7 22l-.385-1.708a3.85 3.85 0 0 0-2.907-2.907L2 17l1.708-.385a3.85 3.85 0 0 0 2.907-2.907z"
                     />
                  </svg>
                  {summarizeMutation.isPending ? "Summarizing..." : "Summarize"}
               </Button>
            )}
            {summarizeMutation.isPending && (
               <div className="mt-4">
                  <PageSkeleton />
               </div>
            )}
         </div>

         <div className="space-y-5 mt-4">
            {reviewsQuery?.data?.reviews.map((each: ReviewType) => (
               <div key={each.id}>
                  <h3 className="font-medium mb-1">{each.author}</h3>
                  <ReviewStar rating={each.rating} />
                  <p className="mt-2">{each.content}</p>
               </div>
            ))}
         </div>
      </div>
   );
}
