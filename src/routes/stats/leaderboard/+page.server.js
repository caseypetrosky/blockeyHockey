
import prisma from '$lib/prisma';

const flattenStats = (player) => {
    // Initialize statistics variables
    let sp = 0, gp = 0, goals = 0, assists = 0, points = 0,
        wins = 0, losses = 0, goals_allowed = 0, saves = 0,
        shots = 0, shutouts = 0;
    let seasons = [];

        if(player.allTimeSkaterStats != null){
            goals = player.allTimeSkaterStats.goals;
            assists = player.allTimeSkaterStats.assists;
            points = goals + assists;
            sp = player.allTimeSkaterStats.seasons_played;
            gp = player.allTimeSkaterStats.games_played;
        }

        if(player.allTimeGoalieStats != null){
            wins = player.allTimeGoalieStats.wins;
            losses = player.allTimeGoalieStats.losses;
            goals_allowed = player.allTimeGoalieStats.goals_allowed;
            saves = player.allTimeGoalieStats.saves;
            shots = player.allTimeGoalieStats.shots;
            shutouts = player.allTimeGoalieStats.shutouts;
        }
        if (Array.isArray(player.game_player_stats)) {
            player.game_player_stats.forEach(game => {
                goals += game.goals_scored;
                assists += game.assists;
                points += game.goals_scored + game.assists;
                gp += 1;
                if (!seasons.includes(game.game.season)) {
                    sp += 1;
                    seasons.push(game.game.season);
                }
            });
        }
    
        // Process goalie game stats
        if (Array.isArray(player.game_goalie_stats)) {
            player.game_goalie_stats.forEach(game => {
                shots += game.shots;
                goals_allowed += game.goals_allowed;
                saves += game.saves;
                if (game.shutout) {
                    shutouts += 1;
                }
                //check if team won or lost
                if(game.win){
                    wins += 1;
                }
                else{
                    losses += 1;
                }
                
            });
        }
    

    // Process skater stats
   
    // Process goalie stats
    

    // Prepare stats for output
    const skaterStats = {
        goals, assists, points, sp, gp,
        ggp: gp ? parseFloat(goals / gp).toFixed(2) : '0.00',
        agp: gp ? parseFloat(assists / gp).toFixed(2) : '0.00',
        psp: sp ? parseFloat(points / sp).toFixed(2) : '0.00',
        gsp: sp ? parseFloat(goals / sp).toFixed(2) : '0.00',
        asp: sp ? parseFloat(assists / sp).toFixed(2) : '0.00',
        allTimePPG: gp ? parseFloat(points / gp).toFixed(2) : '0.00'
    };

    const goalieStats = {
        wins, losses, sp, gp, goals_allowed, saves, shots,
        shutouts,
        winpercentage: gp ? parseFloat((wins / gp) * 100).toFixed(2) : '0.00',
        allTimesavepercentage: shots ? parseFloat((saves / shots) * 100).toFixed(2) : '0.00',
        spg: gp ? parseFloat(shots / gp).toFixed(2) : '0.00',
        allTimegaa: gp ? parseFloat(goals_allowed / gp).toFixed(2) : '0.00'
    };

    return {
        ...player,
        skaterStats: skaterStats ,
        goalieStats:  goalieStats,
    };
};

export const load = async ({}) => {
    const players = await prisma.player.findMany({
        include: {
            allTimeSkaterStats: true,
            allTimeGoalieStats: true,
            game_player_stats: {
                include: {
                    game: {
                        select: {
                            season: true
                        }
                    }
                }
            },
            
            game_goalie_stats: {
                include: {
                    game: {
                        select: {
                            season: true
                        }
                    }
                }
            },
        }
    });

    const consolidatedPlayerObjects = players.map(player => flattenStats(player));
    return { player: consolidatedPlayerObjects };
};
