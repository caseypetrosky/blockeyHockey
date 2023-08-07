import prisma from '$lib/prisma';

export const load = async ({ params }) => {
    const player = await prisma.player.findUnique({
        //find a player in prisma where the username is equal to the username in the url or the uuid is equal to the uuid in the url
        where: {
            uuid: params.uuid,
        },
        include: {  
            //include the stats of the player
            game_player_stats:true,
            game_goalie_stats:true,
            allTimeSkaterStats:true,
            allTimeGoalieStats:true,
            team: {
                select: {
                    name: true,
                    color:true,
                    league : true,
            }}
        }
    });
    return {
        player
    }
}