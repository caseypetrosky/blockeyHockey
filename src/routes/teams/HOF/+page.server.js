import prisma from '$lib/prisma';
import { getSeasonsArray } from '$lib/currentSeason.js';

export const load = async ({ params }) => {
    const team = await prisma.team.findUnique({
        where: {
            id: "HOF"
        },
    });
    const league = await prisma.league.findUnique({
        where: {
            id: team.leagueId
        }
    });
    const players = await prisma.player.findMany({
        where: {
            teamId: "HOF"
        },
    });
    let currentSeason = getSeasonsArray[league.name.toLowerCase()]
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
            seasonId: currentSeason,
        },
        include:{
            home_team:{
                select:{
                    name:true,
                    id:true,
                    leagueId:true,
                    game_team_stats:true,

                }
            },
            away_team:{
                select:{
                    name:true,
                    id:true,
                    leagueId:true,
                    game_team_stats:true,
                }
            },
            season:true,
            
        }
    });

    

    
    
    return {
        games,
        team,
        players,
        league
    }
}