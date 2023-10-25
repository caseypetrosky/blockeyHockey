-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "active_expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Key" (
    "id" TEXT NOT NULL,
    "hashed_password" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team_owner" TEXT NOT NULL DEFAULT '',
    "championships" TEXT,
    "leagueId" INTEGER NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#FFFFFF',
    "description" TEXT NOT NULL DEFAULT '',
    "capSpace" INTEGER NOT NULL DEFAULT 36000,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
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

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "season" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "leagueId" INTEGER NOT NULL,

    CONSTRAINT "season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "home_teamId" TEXT NOT NULL DEFAULT 'FA',
    "away_teamId" TEXT NOT NULL DEFAULT 'FA',
    "date" TIMESTAMP(3) NOT NULL,
    "is_playoff" BOOLEAN NOT NULL DEFAULT false,
    "is_overtime" BOOLEAN NOT NULL DEFAULT false,
    "leagueId" INTEGER NOT NULL,
    "seasonId" TEXT NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_team_stats" (
    "id" SERIAL NOT NULL,
    "teamId" TEXT NOT NULL,
    "goals_scored" INTEGER NOT NULL DEFAULT 0,
    "goals_allowed" INTEGER NOT NULL DEFAULT 0,
    "gameId" INTEGER NOT NULL,
    "playoff" BOOLEAN NOT NULL DEFAULT false,
    "overtime" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "game_team_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_player_stats" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "goals_scored" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "touches" INTEGER NOT NULL DEFAULT 0,
    "blocks" INTEGER NOT NULL DEFAULT 0,
    "time_on_ice" INTEGER NOT NULL DEFAULT 0,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "game_player_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_goalie_stats" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "shots" INTEGER NOT NULL DEFAULT 0,
    "saves" INTEGER NOT NULL DEFAULT 0,
    "goals_allowed" INTEGER NOT NULL DEFAULT 0,
    "time_on_ice" INTEGER NOT NULL DEFAULT 0,
    "gameId" INTEGER NOT NULL,
    "shutout" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "game_goalie_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allTimeSkaterStats" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "seasons_played" INTEGER NOT NULL DEFAULT 0,
    "games_played" INTEGER NOT NULL DEFAULT 0,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "allTimeSkaterStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allTimeGoalieStats" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "seasons_played" INTEGER NOT NULL DEFAULT 0,
    "games_played" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "shutouts" INTEGER NOT NULL DEFAULT 0,
    "shots" INTEGER NOT NULL DEFAULT 0,
    "goals_allowed" INTEGER NOT NULL DEFAULT 0,
    "saves" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "allTimeGoalieStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE INDEX "Session_user_id_idx" ON "Session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Key_id_key" ON "Key"("id");

-- CreateIndex
CREATE INDEX "Key_user_id_idx" ON "Key"("user_id");

-- CreateIndex
CREATE INDEX "Logs_user_id_idx" ON "Logs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Player_uuid_key" ON "Player"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "season_name_key" ON "season"("name");

-- CreateIndex
CREATE UNIQUE INDEX "allTimeSkaterStats_playerId_key" ON "allTimeSkaterStats"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "allTimeGoalieStats_playerId_key" ON "allTimeGoalieStats"("playerId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Key" ADD CONSTRAINT "Key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "season" ADD CONSTRAINT "season_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_home_teamId_fkey" FOREIGN KEY ("home_teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_away_teamId_fkey" FOREIGN KEY ("away_teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "season"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_team_stats" ADD CONSTRAINT "game_team_stats_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_team_stats" ADD CONSTRAINT "game_team_stats_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_player_stats" ADD CONSTRAINT "game_player_stats_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_player_stats" ADD CONSTRAINT "game_player_stats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_goalie_stats" ADD CONSTRAINT "game_goalie_stats_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_goalie_stats" ADD CONSTRAINT "game_goalie_stats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allTimeSkaterStats" ADD CONSTRAINT "allTimeSkaterStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allTimeGoalieStats" ADD CONSTRAINT "allTimeGoalieStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
