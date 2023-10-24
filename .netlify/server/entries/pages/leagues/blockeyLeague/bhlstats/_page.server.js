import { p as prisma } from "../../../../../chunks/prisma.js";
let flattenStats = (player) => {
  let goals = 0;
  let assists = 0;
  let points = 0;
  let touches = 0;
  let toi = 0;
  let shots = 0;
  let goals_allowed = 0;
  let saves = 0;
  let gp = 0;
  let shutouts = 0;
  player.game_player_stats.forEach((game) => {
    goals += game.goals_scored;
    assists += game.assists;
    touches += game.touches;
    toi += game.time_on_ice;
    gp++;
  });
  player.game_goalie_stats.forEach((game) => {
    shots += game.shots;
    saves += game.saves;
    if (game.shutout === true) {
      shutouts++;
    }
  });
  points = goals + assists;
  goals_allowed = shots - saves;
  let ppg = gp > 0 ? parseFloat(points / gp).toFixed(2) : 0;
  let gpg = gp > 0 ? parseFloat(goals / gp).toFixed(2) : 0;
  let pp15 = toi > 0 ? parseFloat(points / toi * 900).toFixed(2) : 0;
  let gp15 = toi > 0 ? parseFloat(goals / toi * 900).toFixed(2) : 0;
  let toup15 = toi > 0 ? parseFloat(touches / toi * 900).toFixed(2) : 0;
  let toupg = goals > 0 ? parseFloat(touches / goals).toFixed(2) : 0;
  const consolidatedPlayerObject = {
    ...player,
    skaterStats: {
      goals,
      assists,
      points,
      touches,
      toi,
      gp,
      ppg,
      gpg,
      pp15,
      gp15,
      toup15,
      toupg
    }
  };
  if (player.goalie) {
    let savepercentage = 0;
    let gaa = 0;
    if (gp > 0) {
      savepercentage = parseFloat(saves / shots * 100).toFixed(2);
      gaa = parseFloat(goals_allowed / gp).toFixed(2);
    }
    consolidatedPlayerObject.goalieStats = {
      touches,
      toi,
      gp,
      goals_allowed,
      saves,
      shots,
      shutouts,
      savepercentage,
      gaa
    };
  }
  return consolidatedPlayerObject;
};
const load = async ({}) => {
  const player = await prisma.player.findMany({
    //find a player in prisma where the username is equal to the username in the url or the uuid is equal to the uuid in the url
    where: {
      team: {
        league: {
          id: 1
        }
      }
    },
    include: {
      //include the stats of the player
      game_player_stats: true,
      game_goalie_stats: true
    }
  });
  const consolidatedPlayerObject = player.map((player2) => flattenStats(player2));
  return {
    player: consolidatedPlayerObject
  };
};
export {
  load
};
