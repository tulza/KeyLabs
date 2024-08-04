/*
  Warnings:

  - You are about to drop the column `difficulty` on the `GameInfo` table. All the data in the column will be lost.
  - You are about to drop the column `playerName` on the `GameInfo` table. All the data in the column will be lost.
  - Added the required column `accuracy` to the `GameInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerId` to the `GameInfo` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Player` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GameInfo" DROP COLUMN "difficulty",
DROP COLUMN "playerName",
ADD COLUMN     "accuracy" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "playerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
