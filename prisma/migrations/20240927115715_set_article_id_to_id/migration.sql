/*
  Warnings:

  - The primary key for the `articles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `article_id` on the `articles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `articles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_interactions" DROP CONSTRAINT "user_interactions_article_id_fkey";

-- DropIndex
DROP INDEX "articles_article_id_key";

-- AlterTable
ALTER TABLE "articles" DROP CONSTRAINT "articles_pkey",
DROP COLUMN "article_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "articles_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "articles_id_key" ON "articles"("id");

-- AddForeignKey
ALTER TABLE "user_interactions" ADD CONSTRAINT "user_interactions_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
