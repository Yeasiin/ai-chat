import { prisma } from "../utils/dbClient";

export const productRepository = {
   getProduct: async (productId: number) => {
      return await prisma.product.findUnique({
         where: { id: productId },
      });
   },
};
