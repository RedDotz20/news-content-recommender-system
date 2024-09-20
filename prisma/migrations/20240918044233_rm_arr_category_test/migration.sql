-- AlterTable
ALTER TABLE "articles" ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "category" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "sample_articles" ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "category" SET DATA TYPE TEXT;
