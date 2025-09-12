/*
  Warnings:

  - Added the required column `generatedAt` to the `Summary` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Summary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "generatedAt" DATETIME NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "Summary_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Summary" ("content", "expiresAt", "id", "productId") SELECT "content", "expiresAt", "id", "productId" FROM "Summary";
DROP TABLE "Summary";
ALTER TABLE "new_Summary" RENAME TO "Summary";
CREATE UNIQUE INDEX "Summary_productId_key" ON "Summary"("productId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
