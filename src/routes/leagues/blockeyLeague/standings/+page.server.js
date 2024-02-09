import prisma from '$lib/prisma';

export const load = async ({ }) => {
    const team = await prisma.team.findMany({
        where: {
            leagueId: 4
        },
        include:{
            game_team_stats:true
        }
    });

    return {
        team
    }
}