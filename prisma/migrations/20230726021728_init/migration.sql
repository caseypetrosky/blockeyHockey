-- CreateEnum
CREATE TYPE "continents" AS ENUM ('Africa', 'Antarctica', 'Asia', 'Europe', 'Oceania', 'North America', 'South America');

-- CreateTable
CREATE TABLE "game_goalie_stats" (
    "goalie_stats_id" BIGSERIAL NOT NULL,
    "game_id" BIGINT NOT NULL,
    "player_id" BIGINT NOT NULL,
    "shots" INTEGER NOT NULL DEFAULT 0,
    "saves" INTEGER NOT NULL DEFAULT 0,
    "goals_against" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "game_goalie_stats_pkey" PRIMARY KEY ("goalie_stats_id")
);

-- CreateTable
CREATE TABLE "game_player_stats" (
    "player_stats_id" BIGSERIAL NOT NULL,
    "game_id" BIGINT NOT NULL,
    "player_id" BIGINT NOT NULL,
    "goals" SMALLINT NOT NULL DEFAULT 0,
    "assists" SMALLINT NOT NULL DEFAULT 0,
    "touches" SMALLINT NOT NULL DEFAULT 0,
    "time_on_ice" INTEGER NOT NULL DEFAULT 0,
    "blocks" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "game_player_stats_pkey" PRIMARY KEY ("player_stats_id")
);

-- CreateTable
CREATE TABLE "game_team_stats" (
    "team_stats_id" BIGSERIAL NOT NULL,
    "team_id" TEXT NOT NULL,
    "game_id" BIGINT NOT NULL,
    "goals_scored" BIGINT NOT NULL DEFAULT 0,
    "goals_conceded" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "game_team_stats_pkey" PRIMARY KEY ("team_stats_id")
);

-- CreateTable
CREATE TABLE "games" (
    "game_id" BIGSERIAL NOT NULL,
    "season_id" BIGINT NOT NULL,
    "game_date" DATE NOT NULL,
    "is_post_season" BOOLEAN NOT NULL DEFAULT false,
    "is_overtime" BOOLEAN NOT NULL DEFAULT false,
    "home_team_sh" TEXT NOT NULL,
    "away_team_sh" TEXT NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "league" (
    "league_id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "league_pkey" PRIMARY KEY ("league_id")
);

-- CreateTable
CREATE TABLE "player_master" (
    "UUID" UUID NOT NULL,
    "username" TEXT,
    "goalie" BOOLEAN NOT NULL DEFAULT false,
    "ingame_number" INTEGER NOT NULL DEFAULT 0,
    "managment_position" TEXT[],
    "awards" TEXT[],
    "player_id" BIGSERIAL NOT NULL,
    "team_sh" TEXT,

    CONSTRAINT "player_master_pkey" PRIMARY KEY ("UUID","player_id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "season_id" BIGSERIAL NOT NULL,
    "league_id" BIGINT NOT NULL,
    "start_date" DATE,
    "end_date" DATE,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("season_id")
);

-- CreateTable
CREATE TABLE "teams" (
    "team_name" TEXT NOT NULL,
    "league_id" BIGINT NOT NULL,
    "team_owner" TEXT,
    "championships" TEXT[],
    "team_char" TEXT NOT NULL DEFAULT ''
);

-- CreateIndex
CREATE UNIQUE INDEX "game_player_stats_player_stats_id_key" ON "game_player_stats"("player_stats_id");

-- CreateIndex
CREATE UNIQUE INDEX "game_team_stats_team_stats_id_key" ON "game_team_stats"("team_stats_id");

-- CreateIndex
CREATE UNIQUE INDEX "games_game_id_key" ON "games"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "player_master_UUID_key" ON "player_master"("UUID");

-- CreateIndex
CREATE UNIQUE INDEX "player_master_player_id_key" ON "player_master"("player_id");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_season_id_key" ON "seasons"("season_id");

-- CreateIndex
CREATE UNIQUE INDEX "teams_team_char_key" ON "teams"("team_char");

-- AddForeignKey
ALTER TABLE "game_goalie_stats" ADD CONSTRAINT "game_goalie_stats_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_player_stats" ADD CONSTRAINT "game_player_stats_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_team_stats" ADD CONSTRAINT "game_team_stats_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_team_stats" ADD CONSTRAINT "game_team_stats_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("team_char") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_away_team_sh_fkey" FOREIGN KEY ("away_team_sh") REFERENCES "teams"("team_char") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_home_team_sh_fkey" FOREIGN KEY ("home_team_sh") REFERENCES "teams"("team_char") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("season_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "player_master" ADD CONSTRAINT "player_master_team_sh_fkey" FOREIGN KEY ("team_sh") REFERENCES "teams"("team_char") ON DELETE SET DEFAULT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "league"("league_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "league"("league_id") ON DELETE RESTRICT ON UPDATE NO ACTION;
