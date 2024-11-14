/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `user_interactions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_interactions_user_id_article_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "user_interactions_user_id_key" ON "user_interactions"("user_id");
