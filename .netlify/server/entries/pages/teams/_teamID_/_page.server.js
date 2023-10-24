import { p as prisma } from "../../../../chunks/prisma.js";
const defaultBHLSeason = "BHLS19";
const defaultNAMHLSeason = "NAMHL9";
const defaultJBHLSeason = "JBHLS13";
const getSeasonsArray = {
  bhl: defaultBHLSeason,
  namhl: defaultNAMHLSeason,
  jbhl: defaultJBHLSeason
};
const load = async ({ params }) => {
  const team = await prisma.team.findUnique({
    where: {
      id: params.teamID
    },
    include: {
      game_team_stats: true
    }
  });
  const league = await prisma.league.findUnique({
    where: {
      id: team.leagueId
    }
  });
  const players = await prisma.player.findMany({
    where: {
      teamId: params.teamID
    },
    include: {
      game_player_stats: true,
      game_goalie_stats: true
    }
  });
  let currentSeason = getSeasonsArray[league.name.toLowerCase()];
  const games = await prisma.games.findMany({
    where: {
      OR: [
        {
          home_teamId: params.teamID
        },
        {
          away_teamId: params.teamID
        }
      ],
      seasonId: currentSeason
    },
    include: {
      home_team: {
        select: {
          name: true,
          id: true,
          leagueId: true,
          game_team_stats: true
        }
      },
      away_team: {
        select: {
          name: true,
          id: true,
          leagueId: true,
          game_team_stats: true
        }
      },
      season: true
    }
  });
  if (team.leagueId == 1) {
    let capHit = team.capSpace;
    let totalSalary = 0;
    players.forEach((player) => {
      capHit -= player.contractPrice;
      totalSalary += player.contractPrice;
    });
    team.capHit = capHit;
    team.totalSalary = totalSalary;
  }
  return {
    games,
    team,
    players,
    league
  };
};
export {
  load
};
