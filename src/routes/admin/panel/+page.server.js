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
        console.log(gameform);
        if(!gameform.valid){
            return fail(400,{
                gameform
            })
        }
        let input = gameform.data.gameTellRaw;

        const titleRegex =  /----- BLOCKEY HOCKEY STATISTICS -----/;
        const mainRegex = /vvv ([A-Z]{3}) @ ([A-Z]{3}) on (\d{4}-\d{2}-\d{2}) - (\d{2}:\d{2}\w{3}) vvv/g;
        const playerRegex = /(?<playerUUID>[a-f\d-]{36}) (\d+) (\d+) (\d+) (\d+) (\d+)/g;
        const teamStatsRegex = /([A-Z]{3}) (\d+) (\d+) (\d+) (\d+) (\d+)/;

        input = input.replace(titleRegex, "");
        console.log(input);

        const generatedByRegex = /^Generated by.*$/gm;
        input = input.replace(generatedByRegex, "");

        const mainMatches = [...input.matchAll(mainRegex)];
        let matchInf={};
        
        for (const mainMatch of mainMatches) {
            const awayTeamR = mainMatch[1];
            const homeTeamR = mainMatch[2];
            const date = mainMatch[3];
            const time = mainMatch[4];
            matchInf = {
                awayTeam: awayTeamR,
                homeTeam: homeTeamR,
                date: date,
                time: time,
        };
    }
        input = input.replace(mainRegex, "");

        
        const parts = input.split('|');

        let homeTeam = parts[0].toString();
        let awayTeam = parts[1].toString();

        const nonEmptyLinesRegex = /\n/g;
        homeTeam = homeTeam.replace(nonEmptyLinesRegex, match => match.trim());
        awayTeam = awayTeam.replace(nonEmptyLinesRegex, match => match.trim());

        const homeTeamStats = homeTeam.match(teamStatsRegex);
        const homeTeamReturn = {};
        homeTeamReturn.team = homeTeamStats[1];
        homeTeamReturn.goals = Number(homeTeamStats[2])+Number(homeTeamStats[3])+Number(homeTeamStats[4])+Number(homeTeamStats[5]);
        if(homeTeamStats[5] == 1){
            homeTeamReturn.overtime = true;
        }
        homeTeamReturn.shots = homeTeamStats[6];
        homeTeamReturn.players = [];
        const homeTeamPlayers = [...homeTeam.matchAll(playerRegex)];
        for (const homeTeamPlayer of homeTeamPlayers) {
            const playerUUID = homeTeamPlayer[1];
            const goals = homeTeamPlayer[2];
            const assists = homeTeamPlayer[3];
            const touches = homeTeamPlayer[4];
            const toi = homeTeamPlayer[5];
            homeTeamReturn.players.push({
                playerUUID: playerUUID,
                goals: goals,
                assists: assists,
                touches: touches,
                toi: toi
            });
        };

        console.log(homeTeamReturn);


        const awayTeamStats = awayTeam.match(teamStatsRegex);
        const awayTeamReturn = {};
        awayTeamReturn.team = awayTeamStats[1];
        awayTeamReturn.goals = Number(awayTeamStats[2])+Number(awayTeamStats[3])+Number(awayTeamStats[4])+Number(awayTeamStats[5]);
        if(awayTeamStats[5] == 1){
            awayTeamReturn.overtime = true;
        }
        awayTeamReturn.shots = awayTeamStats[6];
        awayTeamReturn.players = [];
        const awayTeamPlayers = [...awayTeam.matchAll(playerRegex)];
        for (const awayTeamPlayer of awayTeamPlayers) {
            const playerUUID = awayTeamPlayer[1];
            const goals = awayTeamPlayer[2];
            const assists = awayTeamPlayer[3];
            const touches = awayTeamPlayer[4];
            const toi = awayTeamPlayer[5];
            awayTeamReturn.players.push({
                playerUUID: playerUUID,
                goals: goals,
                assists: assists,
                touches: touches,
                toi: toi
            });
        };


        console.log(awayTeamReturn);
        console.log(matchInf);
        
        return {
            gameform
        }
    }
};



