import prisma from '$lib/prisma';

export const load = async ({ params }) => {
    const team = await prisma.team.findUnique({
        where: {
            id: params.teamID
        },
        include:{
            game_team_stats:true
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
        include:{
            game_player_stats: true,
            game_goalie_stats:true,
        }
    });

    
    return {
        team,
        players,
        league
    }
}