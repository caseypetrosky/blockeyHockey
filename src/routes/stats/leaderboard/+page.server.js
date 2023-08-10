import prisma from '$lib/prisma';
let flattenStats = (player) => {
    let sp = 0;
    let gp = 0;    
    let goals = 0;
    let assists = 0;
    let points = 0;

    let wins = 0;
    let losses = 0;
    let goals_allowed = 0;
    let saves = 0;
    let shots = 0;
    let shutouts = 0;


    player.allTimeSkaterStats.forEach((game) => {
        goals += game.goals;
        assists += game.assists;
        points += game.goals;
        points += game.assists;
        sp += game.seasons_played;
        gp += game.games_played;
      });
    player.allTimeGoalieStats.forEach((game) => {
        shots += game.shots;
        goals_allowed += game.goals_allowed;
        saves += game.saves;
        sp += game.seasons_played;
        gp += game.games_played;
        wins += game.wins;
        losses += game.losses;
        shutouts += game.shutouts;
    });
 
    let ggp = 0;
    let agp = 0;
    let psp = 0;
    let gsp = 0;
    let asp = 0;
    let allTimePPG = 0;
    let winpercentage = 0;
    let allTimesavepercentage = 0;
    let spg = 0;
    let allTimegaa = 0;

    if(!player.goalie && player.allTimeSkaterStats[0] != null) {
    ggp = parseFloat( goals /    gp).toFixed(2);
    agp = parseFloat( assists /    gp).toFixed(2);
    psp = parseFloat( points /  sp).toFixed(2);
    gsp = parseFloat( goals /  sp).toFixed(2);
    asp = parseFloat( assists /  sp).toFixed(2);
    allTimePPG = parseFloat( points /    gp).toFixed(2);}
    if(player.goalie && player.allTimeGoalieStats[0]!= null){
    winpercentage = parseFloat((  wins /     gp)*100).toFixed(2);
    allTimesavepercentage = parseFloat((  saves /   shots*100)).toFixed(2);
    spg = parseFloat(  shots /     gp).toFixed(2);
    allTimegaa = parseFloat(  goals_allowed /gp).toFixed(2);
    }
    const consolidatedPlayerObject = {
        ...player,
        skaterStats: {
            goals: goals,
            assists: assists,
            points: points,
            sp: sp,
            gp: gp,
            ggp: ggp,
            agp: agp,
            psp: psp,
            gsp: gsp,
            asp: asp,
            allTimePPG: allTimePPG,
        },
       
    };
    if(player.goalie){
        consolidatedPlayerObject.goalieStats = { 
            wins: wins,
            losses: losses,
            sp: sp,
            gp: gp,
            goals_allowed: goals_allowed,
            saves: saves,
            shots: shots,
            shutouts: shutouts,
            winpercentage: winpercentage,
            allTimesavepercentage: allTimesavepercentage,
            spg: spg,
            allTimegaa: allTimegaa,
        }
    }
    return consolidatedPlayerObject;
}
export const load = async ({}) => {
    const player = await prisma.player.findMany({
        //find a player in prisma where the username is equal to the username in the url or the uuid is equal to the uuid in the url
        include: {  
            //include the stats of the player
            allTimeSkaterStats: true,
            allTimeGoalieStats: true,
            }
        
    });
    const consolidatedPlayerObject = player.map((player) => flattenStats(player));
    return {
        player: consolidatedPlayerObject,
    }
}