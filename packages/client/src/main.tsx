import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";
import AIChatBot from "./AIChatBot";

import ReviewSummarizer from "./ReviewSummarizer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SummarizerLayout from "./components/SummarizerLayout";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      {/* <AIChatBot /> */}
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <Routes>
               <Route index element={<AIChatBot />} />
               <Route path="chat" element={<AIChatBot />} />
               <Route path="summarizer">
                  <Route index element={<Navigate to={"2"} replace />} />
                  <Route element={<SummarizerLayout />}>
                     <Route path=":id" element={<ReviewSummarizer />} />
                  </Route>
               </Route>
            </Routes>
         </BrowserRouter>
      </QueryClientProvider>
   </StrictMode>
);
