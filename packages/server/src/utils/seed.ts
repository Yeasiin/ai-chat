import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
   const products = [
      {
         name: "Wireless Bluetooth Headphones",
         description:
            "Noise-cancelling over-ear headphones with 30-hour battery life.",
         price: 99.99,
         reviews: [
            {
               author: "Alex",
               rating: 5,
               content:
                  "Amazing sound quality and deep bass, worth every penny.",
            },
            {
               author: "Sarah",
               rating: 4,
               content: "Very comfortable, great for long flights.",
            },
            {
               author: "Daniel",
               rating: 5,
               content:
                  "Battery lasts forever, and noise cancellation is top-notch.",
            },
            {
               author: "Mike",
               rating: 2,
               content: "Stopped connecting to my phone after two months.",
            },
            {
               author: "Rachel",
               rating: 1,
               content: "Build feels cheap, the hinge cracked within a week.",
            },
         ],
      },
      {
         name: "Smart Fitness Watch",
         description:
            "Tracks heart rate, sleep, and steps with a bright AMOLED display.",
         price: 149.99,
         reviews: [
            {
               author: "Emily",
               rating: 4,
               content: "Accurate step tracking and lightweight design.",
            },
            {
               author: "James",
               rating: 5,
               content: "Love the sleep insights, really improved my routine.",
            },
            {
               author: "Hannah",
               rating: 4,
               content: "Display is bright even in sunlight, very easy to use.",
            },
            {
               author: "Omar",
               rating: 2,
               content:
                  "Heart rate readings are often inaccurate during workouts.",
            },
            {
               author: "Priya",
               rating: 1,
               content: "Strap broke within a week, not durable.",
            },
         ],
      },
      {
         name: "Ergonomic Office Chair",
         description: "Adjustable lumbar support and breathable mesh back.",
         price: 229.99,
         reviews: [
            {
               author: "Tom",
               rating: 5,
               content:
                  "My back pain is gone! Super comfortable for 8-hour shifts.",
            },
            {
               author: "Megan",
               rating: 4,
               content: "Solid build quality, smooth wheels.",
            },
            {
               author: "Jordan",
               rating: 4,
               content: "Easy to assemble, great instructions.",
            },
            {
               author: "Chris",
               rating: 2,
               content: "Seat cushion got flat after 3 months.",
            },
            {
               author: "Bella",
               rating: 1,
               content: "Armrests wobble, not worth the price.",
            },
         ],
      },
      {
         name: "Electric Coffee Grinder",
         description: "Stainless steel burr grinder with 12 grind settings.",
         price: 79.99,
         reviews: [
            {
               author: "Oliver",
               rating: 5,
               content: "Perfect for espresso, very consistent grind.",
            },
            {
               author: "Chloe",
               rating: 4,
               content: "Compact and doesn’t make too much noise.",
            },
            {
               author: "Liam",
               rating: 4,
               content: "Easy to clean and feels sturdy.",
            },
            {
               author: "Nina",
               rating: 2,
               content: "Gets overheated if you grind for too long.",
            },
            {
               author: "Jack",
               rating: 1,
               content: "Stopped working after a month, terrible quality.",
            },
         ],
      },
      {
         name: "4K Ultra HD Smart TV (55”)",
         description: "55-inch 4K LED TV with HDR and built-in streaming apps.",
         price: 499.99,
         reviews: [
            {
               author: "Sophia",
               rating: 5,
               content: "Picture quality is stunning, colors really pop.",
            },
            {
               author: "Ethan",
               rating: 4,
               content: "Great value for money, sound is decent.",
            },
            {
               author: "Ava",
               rating: 5,
               content: "Super easy setup, streaming works perfectly.",
            },
            {
               author: "Leo",
               rating: 2,
               content: "Remote feels cheap and laggy.",
            },
            {
               author: "Mia",
               rating: 1,
               content: "Screen developed dead pixels within 2 weeks.",
            },
         ],
      },
   ];

   for (const product of products) {
      await prisma.product.create({
         data: {
            name: product.name,
            description: product.description,
            price: product.price,
            Review: {
               create: product.reviews,
            },
         },
      });
   }

   console.log("✅ Seed data inserted successfully!");
}

main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
   });
