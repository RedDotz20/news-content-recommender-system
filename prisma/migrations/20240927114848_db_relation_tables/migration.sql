/*
  Warnings:

  - You are about to drop the column `content` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `full_description` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the `latest_articles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sample_articles` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `pubDate` on the `articles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "content",
DROP COLUMN "full_description",
DROP COLUMN "pubDate",
ADD COLUMN     "pubDate" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "latest_articles";

-- DropTable
DROP TABLE "sample_articles";

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "sports" INTEGER NOT NULL DEFAULT 0,
    "science_technology" INTEGER NOT NULL DEFAULT 0,
    "entertainment" INTEGER NOT NULL DEFAULT 0,
    "health" INTEGER NOT NULL DEFAULT 0,
    "politics" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_interactions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    "upvote" INTEGER NOT NULL DEFAULT 0,
    "downvote" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_interactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interactions" ADD CONSTRAINT "user_interactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interactions" ADD CONSTRAINT "user_interactions_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("article_id") ON DELETE CASCADE ON UPDATE CASCADE;
