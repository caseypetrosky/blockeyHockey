import prisma from '$lib/prisma';

export const load = async ({ params }) => {
    const team = await prisma.team.findUnique({
        where: {
            id: params.teamID
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
        }
    });
    
    return {
        team,
        league
    }
}