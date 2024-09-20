-- CreateTable
CREATE TABLE "sample_articles" (
    "article_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "keywords" TEXT[],
    "description" TEXT,
    "content" TEXT,
    "pubDate" TEXT NOT NULL,
    "full_description" TEXT,
    "image_url" TEXT NOT NULL,
    "source_id" TEXT NOT NULL,
    "category" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "sample_articles_article_id_key" ON "sample_articles"("article_id");
