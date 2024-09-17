/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Article";

-- CreateTable
CREATE TABLE "articles" (
    "article_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "keywords" TEXT[],
    "creator" TEXT,
    "video_url" TEXT,
    "description" TEXT,
    "pubDate" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "source_id" TEXT NOT NULL,
    "source_name" TEXT NOT NULL,
    "source_url" TEXT NOT NULL,
    "source_icon" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "country" TEXT[],
    "category" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "articles_article_id_key" ON "articles"("article_id");
