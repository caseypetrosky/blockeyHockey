import prisma from '$lib/prisma';

export const load = async ({ params }) => {
    const player = await prisma.player.findUnique({
        //find a player in prisma where the username is equal to the username in the url or the uuid is equal to the uuid in the url
        where: {
            uuid: params.uuid,
        },
        include: {  
            //include the stats of the player
            game_player_stats:true,
            game_goalie_stats:true,
            allTimeSkaterStats:true,
            allTimeGoalieStats:true,
            team: {
                select: {
                    name: true,
                    color:true,
                    league : true,
            }}
        }
    });
    let seaonalGoals = 0;
    let seasonalAssists = 0;
    let seasonalPoints = 0;
    let seasonaltouches = 0;
    let seasonaltoi = 0;
    let seasonalshots = 0;
    let seasonalgoals_allowed = 0;
    let seasonalsaves = 0;
    let seasonalgp = 0;
    let seasonalshutouts = 0;

    player.game_player_stats.forEach((game) => {
        seasonalgp++;
        seaonalGoals += game.goals_scored;
        seasonalAssists += game.assists;
        seasonalPoints += game.goals_scored;
        seasonalPoints += game.assists;
        seasonaltouches += game.touches;
        seasonaltoi += game.time_on_ice;
      });
    player.game_goalie_stats.forEach((game) => {
        seasonalshots += game.shots;
        seasonalgoals_allowed += game.goals_allowed;
        seasonalsaves += game.saves;
        if(game.shutout === true){
            seasonalshutouts++;
        }
    });
    const consolidatedPlayerObject = {
        ...player,
        seasonalstats: {
            goals: seaonalGoals,
            assists: seasonalAssists,
            points: seasonalPoints,
            touches: seasonaltouches,
            toi: seasonaltoi,
            gp: seasonalgp,
        },
        seasonalgoaliestats: { 
            touches: seasonaltouches,
            toi: seasonaltoi,
            gp: seasonalgp,
            goals_allowed: seasonalgoals_allowed,
            saves: seasonalsaves,
            shots: seasonalshots,
            shutouts: seasonalshutouts,
            
        }
    };
    return {
        player: consolidatedPlayerObject,
    };
}