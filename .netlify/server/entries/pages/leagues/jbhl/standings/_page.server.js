import { p as prisma } from "../../../../../chunks/prisma.js";
const load = async ({}) => {
  const team = await prisma.team.findMany({
    where: {
      leagueId: 3
    },
    include: {
      game_team_stats: true
    }
  });
  return {
    team
  };
};
export {
  load
};
