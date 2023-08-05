import prisma from '$lib/prisma';

export const load = async ({}) => {
    const team = await prisma.team.findMany({
        where: {
            leagueId: 1
        }
    });
    const players = await prisma.player.findMany({
        
    });
    
    return {
        team,
        players
    }
}