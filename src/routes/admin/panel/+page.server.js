import prisma from '$lib/prisma';

export const load = async ({}) => {
        const team = await prisma.team.findMany({
            select: {
                name: true,
                id: true,
                leagueId: true,
            }
        });
        const players = await prisma.player.findMany({
            select: {
                username: true,
                uuid: true,
                teamId: true,
            }
        });
        
        return {
            players,
            team
        }
}

