import dayjs from "dayjs";
import { prisma } from "../utils/dbClient";

export const reviewRepository = {
   getReviews: async (productId: number, limit = 10) => {
      return await prisma.review.findMany({
         where: { productId: productId },
         orderBy: { createdAt: "desc" },
         take: limit,
      });
   },
   getSummary: async (productId: number) => {
      const now = dayjs().toDate();
      return await prisma.summary.findFirst({
         where: { AND: [{ productId: productId }, { expiresAt: { gt: now } }] },
      });
   },
   storeReviewSummary: async (productId: number, summary: string) => {
      const now = dayjs().toDate();
      const expiresAt = dayjs().add(5, "minute").toDate();

      const data = {
         content: summary,
         expiresAt,
         generatedAt: now,
         productId: productId,
      };

      prisma.summary.upsert({
         where: { productId: productId },
         create: data,
         update: data,
      });
   },
};
