/*
  Warnings:

  - You are about to drop the `old_all_time_player_stats` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `season` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `leagueId` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "old_all_time_player_stats";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "allTimeSkaterStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "seasons_played" INTEGER NOT NULL DEFAULT 0,
    "games_played" INTEGER NOT NULL DEFAULT 0,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "allTimeSkaterStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "allTimeGoalieStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "seasons_played" INTEGER NOT NULL DEFAULT 0,
    "games_played" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "shutouts" INTEGER NOT NULL DEFAULT 0,
    "shots" INTEGER NOT NULL DEFAULT 0,
    "goals_allowed" INTEGER NOT NULL DEFAULT 0,
    "saves" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "allTimeGoalieStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_game_goalie_stats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "shots" INTEGER NOT NULL DEFAULT 0,
    "saves" INTEGER NOT NULL DEFAULT 0,
    "goals_allowed" INTEGER NOT NULL DEFAULT 0,
    "time_on_ice" INTEGER NOT NULL DEFAULT 0,
    "gameId" INTEGER NOT NULL,
    "shutout" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "game_goalie_stats_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_goalie_stats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_game_goalie_stats" ("gameId", "goals_allowed", "id", "playerId", "saves", "shots") SELECT "gameId", "goals_allowed", "id", "playerId", "saves", "shots" FROM "game_goalie_stats";
DROP TABLE "game_goalie_stats";
ALTER TABLE "new_game_goalie_stats" RENAME TO "game_goalie_stats";
CREATE TABLE "new_game_team_stats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamId" TEXT NOT NULL,
    "goals_scored" INTEGER NOT NULL DEFAULT 0,
    "goals_allowed" INTEGER NOT NULL DEFAULT 0,
    "gameId" INTEGER NOT NULL,
    "playoff" BOOLEAN NOT NULL DEFAULT false,
    "overtime" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "game_team_stats_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_team_stats_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_game_team_stats" ("gameId", "goals_allowed", "goals_scored", "id", "teamId") SELECT "gameId", "goals_allowed", "goals_scored", "id", "teamId" FROM "game_team_stats";
DROP TABLE "game_team_stats";
ALTER TABLE "new_game_team_stats" RENAME TO "game_team_stats";
CREATE TABLE "new_games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "home_teamId" TEXT NOT NULL DEFAULT 'FA',
    "away_teamId" TEXT NOT NULL DEFAULT 'FA',
    "date" DATETIME NOT NULL,
    "is_playoff" BOOLEAN NOT NULL DEFAULT false,
    "is_overtime" BOOLEAN NOT NULL DEFAULT false,
    "leagueId" INTEGER NOT NULL,
    "seasonId" TEXT NOT NULL,
    CONSTRAINT "games_home_teamId_fkey" FOREIGN KEY ("home_teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_away_teamId_fkey" FOREIGN KEY ("away_teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "season" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_games" ("date", "id", "is_overtime", "is_playoff", "seasonId") SELECT "date", "id", "is_overtime", "is_playoff", "seasonId" FROM "games";
DROP TABLE "games";
ALTER TABLE "new_games" RENAME TO "games";
CREATE TABLE "new_Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "team_owner" TEXT NOT NULL DEFAULT '',
    "championships" TEXT,
    "leagueId" INTEGER NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#FFFFFF',
    "description" TEXT NOT NULL DEFAULT '',
    "capSpace" INTEGER NOT NULL DEFAULT 36000,
    CONSTRAINT "Team_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("championships", "id", "leagueId", "name", "team_owner") SELECT "championships", "id", "leagueId", "name", "team_owner" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 0,
    "goalie" BOOLEAN NOT NULL DEFAULT false,
    "awards" TEXT,
    "league_roles" TEXT,
    "teamId" TEXT NOT NULL,
    "contractTier" TEXT NOT NULL DEFAULT 'Amateur',
    "contractLength" INTEGER NOT NULL DEFAULT 1,
    "contractPrice" INTEGER NOT NULL DEFAULT 1500,
    CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("awards", "goalie", "id", "league_roles", "number", "teamId", "username", "uuid") SELECT "awards", "goalie", "id", "league_roles", "number", "teamId", "username", "uuid" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_uuid_key" ON "Player"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "allTimeSkaterStats_playerId_key" ON "allTimeSkaterStats"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "allTimeGoalieStats_playerId_key" ON "allTimeGoalieStats"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "season_name_key" ON "season"("name");
