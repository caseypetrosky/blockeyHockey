import prisma from '$lib/prisma';

export const load = async () => {
    return {
        teams: await prisma.team.findMany({
            where: {
                leagueId: 2
            },
            include: {
                players: {
                    include:{
                        game_player_stats: true,
                        game_goalie_stats:true,
                }}

        }
    })
}
}