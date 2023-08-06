import prisma from '$lib/prisma';

export const load = async ({}) => {
    const team = await prisma.team.findMany({
        where: {
            leagueId: 1
        },
        include: {
            players: {
                include:{
                    game_player_stats: true,
                    game_goalie_stats:true,
            }}
        }
    });
    
    return {
        team
    }
}