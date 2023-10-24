import prisma from '$lib/prisma';
import { auth } from "$lib/server/lucia";
import { error, redirect } from '@sveltejs/kit'
import {z} from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

const playerSchema = z.object({
    username: z.string(),
    number: z.number().min(0).max(99),
    teamId: z.string().min(1).max(4),
    goalie: z.boolean(),
    awards: z.string(),
    league_roles: z.string(),
    contractTier: z.enum(['Pro', 'Superstar', 'Amateur']),
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
    
    const player = await prisma.player.findUnique({
        //find a player in prisma where the username is equal to the username in the url or the uuid is equal to the uuid in the url
        where: {
            uuid: params.uuid,
        },
    });
    const teams = await prisma.team.findMany({
        select: {
            name: true,
            id: true,
            leagueId: true,
        }
    });
    const form = await superValidate(player, playerSchema);
    return {
        form,
        player,
        teams,
    }
}};

export const actions = {
    updatePlayerForm: async ({request, params}) => {
        

        const form = await superValidate(request, playerSchema);
        

        if(!form.valid){
            return fail(400,{
                form
            })
        }
        
        const player = await prisma.player.update({
            where: {
                uuid: params.uuid,
            },
            data: {
                username: form.data.username,
                number: form.data.number,
                teamId: form.data.teamId,
                goalie: form.data.goalie,
                awards: form.data.awards,
                league_roles: form.data.league_roles,
                contractTier: form.data.contractTier,
                contractLength: form.data.contractLength,
                contractPrice: form.data.contractPrice,
            }
        })

        
    throw redirect(308,`/admin/panel/playerUpdate`);
}};