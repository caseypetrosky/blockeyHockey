import prisma from '$lib/prisma';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { boolean, date, z } from 'zod';
import { auth } from "$lib/server/lucia";
import { error } from '@sveltejs/kit'
//CHANGE THIS EACH SEASON!!!!!!
let defaultBHLSeason = "BHLS20";
let defaultNAMHLSeason = "NAMHLS8";
let defaultJBHLSeason = "JBHLS12";
let defaultBHCLSeason = "BHCL";


let session;
let userId;
let user; 

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
    teamname: z.string(),
    teamshorthand: z.string(),
    leagueId: z.number(),
    team_owner: z.string().min(3),
    color: z.string().min(3),
    description: z.string()
});


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


export const load = async ({event, locals,}) => {
     session = await locals.auth.validate()
     userId = session.user.userId;
     user = await auth.getUser(userId);
    
    if(!user || !session || user.role != 'admin'){
        throw error(401, "You do not have the required permissions to view this content.");
        
    }else{

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
}}
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
    massPlayerInput: async (event) => {
        const form = await superValidate(event, newPlayerSchema);

        await prisma.Logs.create({
            data: {
                type: "massPlayerInput",
                data: JSON.stringify(form),
                user: {
                    connect : {
                        id: userId,
                }},
                date: new Date(),

            },
            });

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
                awards: '',
                league_roles: '',
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
    newPlayerForm: async (event) => {
        const form = await superValidate(event, newPlayerSchema);
        
        await prisma.Logs.create({
            data: {
                type: "newPlayer",
                data: JSON.stringify(form),
                user: {
                    connect : {
                        id: userId,
                }},
                
                date: new Date(),

            },
            });

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
                awards: '',
                league_roles: '',
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
        console.log(teamform);
       
        await prisma.Logs.create({
            data: {
                type: "newTeam",
                data: JSON.stringify(teamform),
                user: {
                    connect : {
                        id: userId,
                }},
                
                date: new Date(),

            },
            });

        if(!teamform.valid){
            throw error(400, {
                message: 'Invalid form data',
                error: teamform.errors,
            });
        }
        
        const team = await prisma.team.create({
            data: {
                name: teamform.data.teamname,
                leagueId: teamform.data.leagueId,
                team_owner: teamform.data.team_owner,
                color: teamform.data.color,
                id: teamform.data.teamshorthand,
                description: teamform.data.description,
                championships: '',
                capSpace: 38000,

            },
          });

        return {
            team,
            teamform
        }


    },
    
    newGameForm: async (event) => {
        
        const gameform = await superValidate(event, newGameScehma);

        await prisma.Logs.create({
            data: {
                type: "newGame",
                data: JSON.stringify(gameform),
                user: {
                    connect : {
                        id: userId,
                }},
                
                date: new Date(),

            },
            });

        if(!gameform.valid){
            throw error(400, {
                message: 'Invalid form data'+ JSON.stringify(gameform.errors),
            });
        }
        let input = gameform.data.gameTellRaw;

        

        const titleRegex =  /----- BLOCKEY HOCKEY STATISTICS -----/;
        const mainRegex = /vvv ([A-Z]{3}) @ ([A-Z]{3}) on (\d{4}-\d{2}-\d{2}) - (\d{2}:\d{2}\w{3}) vvv/g;
        const playerRegex = /(?<playerUUID>[a-f\d-]{36}) (\d+) (\d+) (\d+) (\d+) (\d+)/g;
        const teamStatsRegex = /([A-Z]{3}) (\d+) (\d+) (\d+) (\d+) (\d+)/;

        input = input.replace(titleRegex, "");

        const generatedByRegex = /^Generated by.*$/gm;
        input = input.replace(generatedByRegex, "");

        const mainMatches = [input.match(mainRegex)];
        let matchInf={};
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
            let playerUUID = homeTeamPlayer[1];
            const goals = homeTeamPlayer[2];
            const assists = homeTeamPlayer[3];
            const touches = homeTeamPlayer[4];
            const blocks = homeTeamPlayer[5];
            const toi = homeTeamPlayer[6];
            playerUUID = playerUUID.replace(/-/g, '');
            homeTeamReturn.players.push({
                playerUUID: playerUUID,
                goals: goals,
                assists: assists,
                touches: touches,
                blocks: blocks,
                toi: toi,
                playerId: null,
            });
        };


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
            let playerUUID = awayTeamPlayer[1];
            const goals = awayTeamPlayer[2];
            const assists = awayTeamPlayer[3];
            const touches = awayTeamPlayer[4];
            const blocks = awayTeamPlayer[5];
            const toi = awayTeamPlayer[6];
            playerUUID = playerUUID.replace(/-/g, '');
            awayTeamReturn.players.push({
                playerUUID: playerUUID,
                goals: goals,
                assists: assists,
                touches: touches,
                blocks: blocks,
                toi: toi,
                playerId: null,
            });
        };
        
        // Existing code to get the player ID based on UUID
        const getPlayerId = async (uuidInput) => {
            try {
                // Fetch the player
                //if the player is not found, return null
                
                const player = await prisma.player.findUnique({
                    where: {
                        uuid: uuidInput,
                    },
                });
                
                
                return player ? player.id : null;
            } catch (error) {
                console.error("Error in getPlayerId:", error);
                // Optionally, log the error in your logs database
                // ...
                throw error; // Rethrow the error for further handling
            }
        };
        
       
        // Use a for...of loop to add player IDs to homeTeamReturn.players
        for (const player of homeTeamReturn.players) {
            player.playerId = await getPlayerId(player.playerUUID);
        }
       
        // Use a for...of loop to add player IDs to awayTeamReturn.players
        for (const player of awayTeamReturn.players) {
            player.playerId = await getPlayerId(player.playerUUID);
        }
      
       


         matchInf = {
            awayTeam: awayTeamReturn.team,
            homeTeam: homeTeamReturn.team,
            date: new Date(),
            time: null,   
        };
        
       

        if(homeTeamReturn.overtime == true || awayTeamReturn.overtime == true){
            matchInf.overtime = true;
        }
        else{
            matchInf.overtime = false;
        }
        
        matchInf.leagueId = gameform.data.leagueId;

        if(gameform.data.leagueId == 1){
            matchInf.seasonId = defaultBHLSeason;
        }
        else if(gameform.data.leagueId == 2){
            matchInf.seasonId = defaultNAMHLSeason;
        }
        else if(gameform.data.leagueId == 3){
            matchInf.seasonId = defaultJBHLSeason;
        }
        else if(gameform.data.leagueId == 4){
            matchInf.seasonId = defaultBHCLSeason;
        }
        else{
            matchInf.seasonId = null;
        }
        
        let goalieData = [];

        goalieData.push(gameform.data.homeTeamGoalie1);
        goalieData.push(gameform.data.awayTeamGoalie1);
        if(gameform.data.homeTeamGoalie2.username != ''){
            goalieData.push(gameform.data.homeTeamGoalie2);
        }
        if(gameform.data.homeTeamGoalie3.username != ''){
            goalieData.push(gameform.data.homeTeamGoalie3);
        }
        if(gameform.data.awayTeamGoalie2.username != ''){
            goalieData.push(gameform.data.awayTeamGoalie2);
        }
        if(gameform.data.awayTeamGoalie3.username != ''){
            goalieData.push(gameform.data.awayTeamGoalie3);
        }

        let playerData = [];
        for (const player of homeTeamReturn.players) {
            playerData.push(player);

        }
        for (const player of awayTeamReturn.players) {
            playerData.push(player);
        }

        for(const goalie of goalieData){
            const goalieUUID = await getUUID(goalie.username);
            for(const player of playerData){
                if(player.playerUUID == goalieUUID){
                    goalie.id = player.playerId;
                    goalie.toi = player.toi;
                }
            }
            if((parseInt(goalie.shotsAgainst) - parseInt(goalie.saves)) == 0){
                goalie.shutout = true;
            }
            else{
                goalie.shutout = false;
            }
        }

        

      

     
        try {
            const createdGame = await prisma.games.create({
            data:{
            date: matchInf.date,
            is_playoff: gameform.data.isPlayoffs,
            is_overtime: matchInf.overtime,
            home_team: {
                connect: {
                    id: homeTeamReturn.team,
                }
            },
            away_team: {
                connect: {
                    id: awayTeamReturn.team,
                }
            },
            season:{
                connect: {
                    name: matchInf.seasonId,
                }
            },
            league:{
                connect: {
                    id: matchInf.leagueId,
                }
            },
            game_team_stats: {
              create: [
                // Create team stats for the game
                {
                  teamId: homeTeamReturn.team, // Assuming you have the home team ID
                  goals_scored: homeTeamReturn.goals, // Assuming you have the home team's goals
                  goals_allowed: awayTeamReturn.goals, // Assuming you have the away team's goals
                  playoff: gameform.data.isPlayoffs,
                  overtime: matchInf.overtime,
                },
                {
                  teamId: awayTeamReturn.team, // Assuming you have the away team ID
                  goals_scored: awayTeamReturn.goals, // Assuming you have the away team's goals
                  goals_allowed: homeTeamReturn.goals, // Assuming you have the home team's goals
                  playoff: gameform.data.isPlayoffs,
                  overtime: matchInf.overtime,
                },
              ],
            },
            game_player_stats: {
                create: playerData.map((player) => ({
                    goals_scored: parseInt(player.goals), // Assuming these properties exist in playerData
                    assists: parseInt(player.assists),
                    touches: parseInt(player.touches),
                    time_on_ice: parseInt(player.toi),
                    player: {
                        connect: {
                            id: player.playerId, // You should get the player's ID from your data
                        },
                    },
            })),
            },
            game_goalie_stats: {
                create: goalieData.map((goalie) => ({
                    shots: parseInt(goalie.shotsAgainst), // Assuming these properties exist in goalieData
                    saves: parseInt(goalie.saves),
                    goals_allowed: parseInt(goalie.shotsAgainst) - parseInt(goalie.saves),
                    time_on_ice: parseInt(goalie.toi),
                    shutout: goalie.shutout,
                    player: {
                        connect: {
                            id: goalie.id, // Assuming you have the player's ID from your data
                        },
                    },
            })),
            },
            
        }
    });
    await prisma.Logs.create({
        data: {
            type: "SuccesfulNewGame",
            data: JSON.stringify(createdGame),
            user: {
                connect : {
                    id: userId,
            }},
            
            date: new Date(),

        },
        });
    console.log("Game created successfully:", createdGame);
} catch (error) {
    await prisma.Logs.create({
        data: {
            type: "ErrorOnnewGame",
            data: JSON.stringify(error),
            user: {
                connect : {
                    id: userId,
            }},
            
            date: new Date(),

        },
        });

    console.error("Error creating game:", error);
    // Handle the error appropriately
    // Possibly re-throw or return a specific response
}


        
        return {
            gameform
        }
    
    },
   
}
