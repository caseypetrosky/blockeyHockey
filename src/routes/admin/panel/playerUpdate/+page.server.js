import prisma from '$lib/prisma';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { boolean, date, z } from 'zod';
import { auth } from "$lib/server/lucia";
import { error } from '@sveltejs/kit'

const playerSchema = z.object({
    username: z.string().min(3).max(16),
    number: z.number().min(0).max(99),
    teamId: z.string().min(1).max(4),
    goalie: z.boolean(),
    contractType: z.enum(['Pro', 'Superstar', 'Amateur']),
    contractLength: z.number().min(1).max(3),
    contractPrice: z.number().min(1500).max(15000),
});

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
