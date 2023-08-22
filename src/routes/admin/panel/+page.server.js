import prisma from '$lib/prisma';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

const newPlayerSchema = z.object({
    username: z.string().min(3).max(16),
    number: z.number().min(0).max(99),
    teamId: z.string().min(1).max(4),
    goalie: z.boolean(),
    contractType: z.enum(['Pro', 'Superstar', 'Amateur']),
    contractLength: z.number().min(1).max(3),
    contractPrice: z.number().min(1500).max(15000),
});

export const load = async (event) => {
        const form = await superValidate(event, newPlayerSchema);
        const team = await prisma.team.findMany({
            select: {
                name: true,
                id: true,
                leagueId: true,
            }
        });
        const goalies = await prisma.player.findMany({
            where: {
                goalie: true,
            },
            include: {
                team:{
                    select: {
                        leagueId: true,}
                }},
            });
        const players = await prisma.player.findMany({
            select: {
                username: true,
                uuid: true,
                teamId: true,
            }
        });
        
        return {
            players,
            goalies,
            team,
            form
        }
}
const getUUID = async (username) => {
    try {
        const response = await fetch(`https://playerdb.co/api/player/minecraft/${username}`);
        const data = await response.json();
        console.log("UUID Data:", data);
        const playerId = data.data.player.raw_id;
        return playerId;
    } catch (error) {
        console.error("An error occurred:", error);
        return null;
    }
};

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, newPlayerSchema);
        console.log(form);

        if(!form.valid){
            return fail(400,{
                form
            })
        }
        
        const uuid = await getUUID(form.username);
        console.log(uuid);
        

        return {
            form
        }

    }
};



