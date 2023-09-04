import prisma from '$lib/prisma';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { boolean, z } from 'zod';

const newPlayerSchema = z.object({
    username: z.string().min(3).max(16),
    number: z.number().min(0).max(99),
    teamId: z.string().min(1).max(4),
    goalie: z.boolean(),
    contractType: z.enum(['Pro', 'Superstar', 'Amateur']),
    contractLength: z.number().min(1).max(3),
    contractPrice: z.number().min(1500).max(15000),
});
const newTeamSchema = z.object({
    name: z.string().min(3),
    leagueId: z.number(),
    team_owner: z.string().min(3),
    color: z.string().min(3),
    id: z.string().min(1).max(4),
    description: z.string()});


const newGameScehma = z.object({
    gameTellRaw: z.string(),
    leagueId: z.number(),
    isPlayoffs: z.boolean(),
    homeTeamGoalie1: z.object({
        username: z.string(),
        saves: z.number(),
        shotsAgainst: z.number(),
      }),
      homeTeamGoalie2: z.object({
        username: z.string(),
        saves: z.number(),
        shotsAgainst: z.number(),
      }),
      homeTeamGoalie3: z.object({
        username: z.string(),
        saves: z.number(),
        shotsAgainst: z.number(),
      }),
      awayTeamGoalie1: z.object({
        username: z.string(),
        saves: z.number(),
        shotsAgainst: z.number(),
      }),
      awayTeamGoalie2: z.object({
        username: z.string(),
        saves: z.number(),
        shotsAgainst: z.number(),
      }),
      awayTeamGoalie3: z.object({
        username: z.string(),
        saves: z.number(),
        shotsAgainst: z.number(),
      }),
    
})


export const load = async (event) => {
        const newPlayerForm = await superValidate(event, newPlayerSchema);
        const newTeamForm = await superValidate(event, newTeamSchema);
        const newGameForm = await superValidate(event, newGameScehma);
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
            newPlayerForm,
            newTeamForm,
            newGameForm,
        }
}
const getUUID = async (username) => {
    try {
        const response = await fetch(`https://playerdb.co/api/player/minecraft/${username}`);
        const data = await response.json();

        const playerId = data.data.player.raw_id;
        return playerId;
    } catch (error) {
        console.error("An error occurred:", error);
        return null;
    }
};

export const actions = {
    newPlayerForm: async (event) => {
        const form = await superValidate(event, newPlayerSchema);
        

        if(!form.valid){
            return fail(400,{
                form
            })
        }
        
        const uuid = await getUUID(form.data.username);
        
        

        if(!uuid){
            return fail(400,{
                form
            })
        }
        const player = await prisma.player.create({
            data: {
                username: form.data.username,
                uuid: uuid,
                number: form.data.number,
                teamId: form.data.teamId,
                goalie: form.data.goalie,
                contractTier: form.data.contractType,
                contractLength: form.data.contractLength,
                contractPrice: form.data.contractPrice,
            },
          });
        

        return {
            player,
            form
        }

    },
    newTeamForm: async (event) => {
        const teamform = await superValidate(event, newTeamSchema);
       
        if(!teamform.valid){
            return fail(400,{
                teamform
            })
        }

        const team = await prisma.team.create({
            data: {
                name: teamform.name,
                leagueId: teamform.league,
                team_owner: teamform.team_owner,
                color: teamform.color,
                id: teamform.id,
                description: teamform.description,

            },
          });

        return {
            team,
            teamform
        }


    },
    newGameForm: async (event) => {
        const gameform = await superValidate(event, newGameScehma);
        if(!gameform.valid){
            return fail(400,{
                gameform
            })
        }
        console.log(gameform);
        /*
        const game = await prisma.game.create({
            data: {
                gameTellRaw: gameform.gameTellRaw,
                leagueId: gameform.leagueId,
                isPlayoffs: gameform.isPlayoffs,
                homeGoalie1: gameform.homeGoalie1,
                homeGoalie2: gameform.homeGoalie2,
                homeGoalie3: gameform.homeGoalie3,
                awayGoalie1: gameform.awayGoalie1,
                awayGoalie2: gameform.awayGoalie2,
                awayGoalie3: gameform.awayGoalie3,
            },
          });*/

        return {
            gameform
        }
    }
};



