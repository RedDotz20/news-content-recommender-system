/*
  Warnings:

  - You are about to drop the column `country` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `source_icon` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `source_name` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `source_url` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `video_url` on the `articles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "country",
DROP COLUMN "language",
DROP COLUMN "source_icon",
DROP COLUMN "source_name",
DROP COLUMN "source_url",
DROP COLUMN "video_url",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "full_description" TEXT,
ALTER COLUMN "image_url" DROP NOT NULL,
ADD CONSTRAINT "articles_pkey" PRIMARY KEY ("article_id");

-- CreateTable
CREATE TABLE "latest_articles" (
    "article_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "keywords" TEXT[],
    "creator" TEXT,
    "description" TEXT,
    "full_description" TEXT,
    "content" TEXT,
    "image_url" TEXT,
    "source_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "pubDate" TEXT NOT NULL,

    CONSTRAINT "latest_articles_pkey" PRIMARY KEY ("article_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "latest_articles_article_id_key" ON "latest_articles"("article_id");
