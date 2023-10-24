import prisma from '$lib/prisma';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { boolean, date, z } from 'zod';
import { auth } from "$lib/server/lucia";
import { error } from '@sveltejs/kit'



export const load = async ({ params , locals,}) => {
    const session = await locals.auth.validate()
    const userId = session.user.userId;
    const user = await auth.getUser(userId);
    
    if(!user || !session || user.role != 'admin'){
        throw error(401, "You do not have the required permissions to view this content.");
    }else{
    const players = await prisma.player.findMany({
    });
    
    return {
        players,
    }
}
}
