import prisma from '$lib/prisma';

export const load = async () => {
    return {
        teams: await prisma.team.findMany()
    }
}