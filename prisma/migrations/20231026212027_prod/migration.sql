/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "game_goalie_stats" ADD COLUMN     "win" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "games" ALTER COLUMN "date" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");
