import prisma from '$lib/prisma';

export const load = async ({ params }) => {
    const player = await prisma.player.findUnique({
        //find a player in prisma where the username is equal to the username in the url or the uuid is equal to the uuid in the url
        where: {
            uuid: params.username,
        },
        include: {  
            //include the stats of the player
            game_player_stats:true,
            game_goalie_stats:true,
        }

    });
    return {
        player
    }
}