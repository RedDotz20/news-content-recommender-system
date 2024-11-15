/*
  Warnings:

  - You are about to drop the column `downvote` on the `user_interactions` table. All the data in the column will be lost.
  - You are about to drop the column `upvote` on the `user_interactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_interactions" DROP COLUMN "downvote",
DROP COLUMN "upvote",
ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT true;
