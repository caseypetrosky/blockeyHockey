import prisma from '$lib/prisma';

export const load = async () => {
    return {
        players: await prisma.player.findMany(),
        teams: await prisma.team.findMany()
    }
}