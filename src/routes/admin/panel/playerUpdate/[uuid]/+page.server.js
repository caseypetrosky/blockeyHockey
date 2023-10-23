import prisma from '$lib/prisma';
import { auth } from "$lib/server/lucia";
import { error } from '@sveltejs/kit'


export const load = async ({ params , locals,}) => {
    const session = await locals.auth.validate()
    const userId = session.user.userId;
    const user = await auth.getUser(userId);
    
    if(!user || !session || user.role != 'admin'){
        throw error(401, "You do not have the required permissions to view this content.");
    }else{
    const player = await prisma.player.findUnique({
        //find a player in prisma where the username is equal to the username in the url or the uuid is equal to the uuid in the url
        where: {
            uuid: params.uuid,
        },
    });
    return {
        player,
    }
}}