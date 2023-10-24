import { p as prisma } from "../../../../chunks/prisma.js";
const load = async ({ params }) => {
  const player = await prisma.player.findUnique({
    //find a player in prisma where the username is equal to the username in the url or the uuid is equal to the uuid in the url
    where: {
      uuid: params.uuid
    },
    include: {
      //include the stats of the player
      game_player_stats: {
        include: {
          game: true
          // Assuming 'game' is a relation that includes 'season' and 'isPlayoff'
        }
      },
      game_goalie_stats: {
        include: {
          game: true
          // Assuming 'game' is a relation that includes 'season' and 'isPlayoff'
        }
      },
      allTimeSkaterStats: true,
      allTimeGoalieStats: true,
      team: {
        select: {
          name: true,
          color: true,
          league: true
        }
      }
    }
  });
  let seasonsArray = [];
  player.game_player_stats.forEach((stat) => {
    const { game } = stat;
    const seasonKey = `${game.seasonId}`;
    const typeKey = game.isPlayoff ? "playoffs" : "regular";
    let seasonEntry = seasonsArray.find((s) => s.id === seasonKey) || {
      id: seasonKey,
      regular: { player: {}, goalie: {} },
      playoffs: { player: {}, goalie: {} }
    };
    seasonEntry[typeKey].player = {
      gp: (seasonEntry[typeKey].player.gp || 0) + 1,
      goals: (seasonEntry[typeKey].player.goals || 0) + stat.goals_scored,
      assists: (seasonEntry[typeKey].player.assists || 0) + stat.assists,
      points: (seasonEntry[typeKey].player.points || 0) + stat.goals_scored + stat.assists,
      touches: (seasonEntry[typeKey].player.touches || 0) + stat.touches,
      toi: (seasonEntry[typeKey].player.toi || 0) + stat.time_on_ice
    };
    if (!seasonsArray.some((s) => s.id === seasonKey)) {
      seasonsArray.push(seasonEntry);
    }
  });
  player.game_goalie_stats.forEach((stat) => {
    const { game } = stat;
    const seasonKey = `${game.seasonId}`;
    const typeKey = game.isPlayoff ? "playoffs" : "regular";
    let seasonEntry = seasonsArray.find((s) => s.id === seasonKey);
    if (!seasonEntry) {
      seasonEntry = {
        id: seasonKey,
        regular: { player: {}, goalie: {} },
        playoffs: { player: {}, goalie: {} }
      };
      seasonsArray.push(seasonEntry);
    }
    seasonEntry[typeKey].goalie = {
      shots: (seasonEntry[typeKey].goalie.shots || 0) + stat.shots,
      goals_allowed: (seasonEntry[typeKey].goalie.goals_allowed || 0) + stat.goals_allowed,
      saves: (seasonEntry[typeKey].goalie.saves || 0) + stat.saves,
      shutouts: (seasonEntry[typeKey].goalie.shutouts || 0) + (stat.shutout ? 1 : 0)
    };
  });
  const consolidatedPlayerObject = {
    ...player,
    seasonsArray
  };
  return {
    player: consolidatedPlayerObject
  };
};
export {
  load
};
