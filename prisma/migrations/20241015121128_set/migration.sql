/*
  Warnings:

  - You are about to drop the column `creator` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `keywords` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `pubDate` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `source_id` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `entertainment` on the `user_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `health` on the `user_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `politics` on the `user_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `science_technology` on the `user_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `sports` on the `user_preferences` table. All the data in the column will be lost.
  - Added the required column `authors` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headline` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferences` to the `user_preferences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "creator",
DROP COLUMN "description",
DROP COLUMN "image_url",
DROP COLUMN "keywords",
DROP COLUMN "pubDate",
DROP COLUMN "source_id",
DROP COLUMN "title",
ADD COLUMN     "authors" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "headline" TEXT NOT NULL,
ADD COLUMN     "short_description" TEXT;

-- AlterTable
ALTER TABLE "user_preferences" DROP COLUMN "entertainment",
DROP COLUMN "health",
DROP COLUMN "politics",
DROP COLUMN "science_technology",
DROP COLUMN "sports",
ADD COLUMN     "preferences" JSONB NOT NULL;
