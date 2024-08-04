/*
  Warnings:

  - You are about to drop the column `lettersPerSecond` on the `GameInfo` table. All the data in the column will be lost.
  - Added the required column `lettersPerMinute` to the `GameInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameInfo" DROP COLUMN "lettersPerSecond",
ADD COLUMN     "lettersPerMinute" DOUBLE PRECISION NOT NULL;
