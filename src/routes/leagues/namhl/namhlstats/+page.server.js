import prisma from '$lib/prisma';
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
        points += game.goals_scored;
        points += game.assists;
        touches += game.touches;
        toi += game.time_on_ice;
        gp++;
      });
    player.game_goalie_stats.forEach((game) => {
        shots += game.shots;
        goals_allowed += game.goals_allowed;
        saves += game.saves;
        touches += game.touches;
        toi += game.time_on_ice;
        gp++;
        points += game.goals_scored;
        points += game.assists;
        if(game.shutout === true){
            shutouts++;
        }
    });
    let ppg = 0;
    let gpg = 0;
    let pp15 = 0;
    let gp15 = 0;
    let toup15 = 0;
    let toupg = 0;
    if(gp > 0){
        ppg = parseFloat(points / gp).toFixed(2);
        gpg = parseFloat(goals / gp).toFixed(2);
        pp15 = parseFloat(points / toi * 900).toFixed(2);
        gp15 = parseFloat(goals / toi * 900).toFixed(2);
        toup15 = parseFloat(toi / gp * 900).toFixed(2);
        toupg = parseFloat(touches / goals * 900).toFixed(2);

   };
    const consolidatedPlayerObject = {
        ...player,
        skaterStats: {
            goals: goals,
            assists: assists,
            points: points,
            touches: touches,
            toi: toi,
            gp: gp,
            ppg: ppg,
            gpg: gpg,
            pp15: pp15,
            gp15: gp15,
            toup15: toup15,
            toupg: toupg,
        },
       
    };
    if(player.goalie){
        let savepercentage = 0;
        let gaa = 0;

        if(gp > 0){
            savepercentage = parseFloat(saves / shots).toFixed(2);
            gaa = parseFloat(goals_allowed / gp).toFixed(2);
       };        
        consolidatedPlayerObject.goalieStats = { 
            touches: touches,
            toi: toi,
            gp: gp,
            goals_allowed: goals_allowed,
            saves: saves,
            shots: shots,
            shutouts: shutouts,
            savepercentage: savepercentage,
            gaa: gaa,
        }
    }
    return consolidatedPlayerObject;
}
export const load = async ({}) => {
    const player = await prisma.player.findMany({
        //find a player in prisma where the username is equal to the username in the url or the uuid is equal to the uuid in the url
        where: {
            team: {
                league: {
                    id: 2,
                }
            }
        },
        include: {  
            //include the stats of the player
            game_player_stats:true,
            game_goalie_stats:true,
            }
        
    });
    const consolidatedPlayerObject = player.map((player) => flattenStats(player));
    return {
        player: consolidatedPlayerObject,
    }
}