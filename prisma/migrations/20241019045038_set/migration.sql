/*
  Warnings:

  - Added the required column `category` to the `user_interactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "articles" ALTER COLUMN "authors" DROP NOT NULL,
ALTER COLUMN "date" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "user_interactions" ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_preferences" ALTER COLUMN "preferences" SET DEFAULT '[]';
