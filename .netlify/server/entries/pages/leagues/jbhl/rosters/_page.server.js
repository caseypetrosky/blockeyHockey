import { p as prisma } from "../../../../../chunks/prisma.js";
const load = async ({}) => {
  const team = await prisma.team.findMany({
    where: {
      leagueId: 3
    },
    include: {
      players: {
        include: {
          game_player_stats: true,
          game_goalie_stats: true
        }
      }
    }
  });
  return {
    team
  };
};
export {
  load
};
