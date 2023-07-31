import prisma from '$lib/prisma';

export const load = async ({ params }) => {
    const team = await prisma.team.findUnique({
        where: {
            id: params.teamID
        }
    });
    return {
        team
    }
}