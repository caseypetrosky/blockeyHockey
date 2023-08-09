<script>
    import {page} from '$app/stores';
    import {Tabs, TabItem} from 'flowbite-svelte';
    export let data;
    let goals = 0;
    let assists = 0;
     let gamesPlayed = 0;
     let shots = 0;
     let saves = 0;
     let savepercentage = 0;
     let gaa = 0;
     let last5 = [];
     console.log(data);
    if(!data.player.goalie){
        for(let i = 0; i < data.player.game_player_stats.length; i++){
            goals += data.player.game_player_stats[i].goals_scored;
            assists += data.player.game_player_stats[i].assists;
            gamesPlayed++;
            if(i<5){
                last5.push(data.player.game_player_stats[i],);
            }
        }
    }
    else{
        for(let i = 0; i < data.player.game_goalie_stats.length; i++){
            shots += data.player.game_goalie_stats[i].shots;
            saves += data.player.game_goalie_stats[i].saves;
            gamesPlayed++;
            if(i<5){
                last5.push(data.player.game_goalie_stats[i]);
            }
        }
        savepercentage = saves / shots;
        gaa = goals / gamesPlayed;
    }
    //take the last 5 games from the array and add them to an array
    //then display the array
    
let points = goals + assists;
let ppg = points / gamesPlayed;

let ggp = 0
let agp = 0
let psp = 0
let gsp = 0
let asp = 0
let allTimePPG = 0
let winpercentage = 0
let allTimesavepercentage = 0
let spg = 0
let allTimegaa = 0


let alltimeSkater = {}
let alltimeGoalie = {};
alltimeSkater.goals= 0;
alltimeSkater.assists= 0;
alltimeSkater.games_played= 0;
alltimeSkater.seasons_played= 0;
alltimeSkater.points= 0;
alltimeGoalie.seasons_played= 0;
alltimeGoalie.games_played= 0;
alltimeGoalie.wins= 0;
alltimeGoalie.losses= 0;
alltimeGoalie.shutouts= 0;
alltimeGoalie.shots= 0;
alltimeGoalie.goals_allowed= 0;
alltimeGoalie.saves= 0;

if(!data.player.goalie && data.player.allTimeSkaterStats[0]!=null) {
alltimeSkater = data.player.allTimeSkaterStats[0];
ggp = parseFloat(alltimeSkater.goals / alltimeSkater.games_played).toFixed(2);
agp = parseFloat(alltimeSkater.assists / alltimeSkater.games_played).toFixed(2);
psp = parseFloat(alltimeSkater.points / alltimeSkater.seasons_played).toFixed(2);
gsp = parseFloat(alltimeSkater.goals / alltimeSkater.seasons_played).toFixed(2);
asp = parseFloat(alltimeSkater.assists / alltimeSkater.seasons_played).toFixed(2);
allTimePPG = parseFloat(alltimeSkater.points / alltimeSkater.games_played).toFixed(2);}
if(data.player.goalie){
alltimeGoalie = data.player.allTimeGoalieStats[0];
winpercentage = parseFloat((alltimeGoalie.wins / alltimeGoalie.games_played)*100).toFixed(2);
allTimesavepercentage = parseFloat(alltimeGoalie.saves / alltimeGoalie.shots).toFixed(2);
spg = parseFloat(alltimeGoalie.shots / alltimeGoalie.games_played).toFixed(2);
allTimegaa = parseFloat(alltimeGoalie.goals_allowed / alltimeGoalie.games_played).toFixed(2);
}


</script>
<div class="container mx-auto  mt-10">
    <div class="inline-flex">
        <img src="https://minotar.net/armor/bust/{data.player.uuid}/300.png" alt="player avatar" class="h-40 w-40 mr-4">
        <div>
            <h1 class="my-auto text-4xl">{data.player.username}</h1>
            <a class="hover:text-secondary-focus"href="../teams/{data.player.teamId}">Team: {data.player.team.name}</a>
            {#if data.player.league_roles != null}           
             <h2>Roles: {data.player.league_roles}</h2>
            {/if}
            <h2>Number: {data.player.number}</h2>
            
        </div>
    </div>  
    <h2 class="text-2xl mt-4">Stats</h2>
    <hr class=" border-2 w-1/4" style="border-color: {data.player.team.color}">
    <Tabs style="pill" class="mt-4 text-white">
        <TabItem open class="text-white">
            <span slot="title">S19 stats</span>
            {#if !data.player.goalie}
            <div class="p-8">
                <h2 class="text-2xl mt-4">S19 Stats</h2>
                <hr class="border-2 w-1/4" style="border-color: {data.player.team.color}">
                <div class="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Goals</h2>
                        <p>{goals}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Assists</h2>
                        <p>{assists}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Points</h2>
                        <p>{points}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Goals Against Average</h2>
                        <p>{ppg}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Games Played</h2>
                        <p>{gamesPlayed}</p>
                    </div>
                </div>
            </div>
           
            {/if}
            {#if data.player.goalie}
            <div class="p-8">
                <h2 class="text-2xl mt-4">S19 Goalie Stats</h2>
                <hr class="border-2 w-1/4" style="border-color: {data.player.team.color}">
                <div class="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Shots Faced</h2>
                        <p>{shots}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Saves</h2>
                        <p>{saves}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Save %</h2>
                        <p>{savepercentage}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Goals Against Average</h2>
                        <p>{gaa}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Games Played</h2>
                        <p>{gamesPlayed}</p>
                    </div>
                </div>
            </div>
           
            {/if}
        </TabItem>
        <TabItem >
            <span slot="title">All Time Stats</span>
            {#if !data.player.goalie}
            <div class="p-8">
                <h2 class="text-2xl mt-4">All time Career Stats s1-s18</h2>
                <hr class="border-2 w-1/4" style="border-color: {data.player.team.color}">
                <div class="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Seasons Played</h2>
                        <p>{alltimeSkater.seasons_played}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Games Played</h2>
                        <p>{alltimeSkater.games_played}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Goals</h2>
                        <p>{alltimeSkater.goals}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Assists</h2>
                        <p>{alltimeSkater.assists}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Points</h2>
                        <p>{alltimeSkater.points}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Goals per Games Played</h2>
                        <p>{ggp}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Assists per Games Played</h2>
                        <p>{agp}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Points per Games Played</h2>
                        <p>{allTimePPG}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Goals per Season Played</h2>
                        <p>{gsp}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Assists per Season Played</h2>
                        <p>{asp}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Points per Season Played</h2>
                        <p>{psp}</p>
                    </div>
                    
                </div>
            </div>
     
            {/if}
            {#if data.player.goalie}
            <div class="p-8">
                <h2 class="text-2xl mt-4">All time Goalie Stats s1-s18</h2>
                <hr class="border-2 w-1/4" style="border-color: {data.player.team.color}">
                <div class="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Seasons Played</h2>
                        <p>{alltimeGoalie.seasons_played}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Games Played</h2>
                        <p>{alltimeGoalie.games_played}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Wins</h2>
                        <p>{alltimeGoalie.wins}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Losses</h2>
                        <p>{alltimeGoalie.losses}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Win%</h2>
                        <p>{winpercentage}%</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Shutouts</h2>
                        <p>{alltimeGoalie.shutouts}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Shots Faced</h2>
                        <p>{alltimeGoalie.shots}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Goals Allowed</h2>
                        <p>{alltimeGoalie.goals_allowed}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Saves</h2>
                        <p>{alltimeGoalie.saves}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">SV%</h2>
                        <p>{allTimesavepercentage}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Shots per Game</h2>
                        <p>{spg}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Goals Against Average</h2>
                        <p>{allTimegaa}</p>
                    </div>
                </div>
            </div>
            
            
            {/if}

        </TabItem>
    </Tabs>
    
    <h2 class="text-2xl mt-4">Awards</h2>
    <hr class=" border-2 w-1/4" style="border-color: {data.player.team.color}">



    <!--
    <h2 class="text-2xl mt-4">Last 5 Games</h2>
    <hr class=" border-2 w-1/4" style="border-color: {data.player.team.color}">

    <table class="table w-full text-white">

        <thead class="text-white">
        {#if !data.player.goalie}              
        <tr>
            <th class="text-xl">Goals</th>
            <th class="text-xl">Assists</th>
            <th class="text-xl">Points</th>
            <th class="text-xl">Touches</th>
            <th class="text-xl">Time On Ice</th>
        </tr>
                {:else}
                <tr>
                    <th class="text-xl">Shots</th>
                    <th class="text-xl">Saves</th>
                    <th class="text-xl">Save Percent</th>
                    </tr>
                {/if}
            
        </thead>
        <tbody>
            {#each last5 as game}
                {#if !data.player.goalie}              
                    <tr>
                        <td class="text-xl">{game.goals_scored}</td>
                        <td class="text-xl">{game.assists}</td>
                        <td class="text-xl">{game.assists+game.goals_scored}</td>
                        <td class="text-xl">{game.touches}</td>
                        <td class="text-xl">{game.time_on_ice}</td>
                    </tr>
                {:else}
                    <tr>
                        <td class="text-xl">{game.shots}</td>
                        <td class="text-xl">{game.saves}</td>
                        <td class="text-xl">{game.saves/game.shots}</td>
                    </tr>
                {/if}

            {/each}


        </tbody>
        </table>
-->
</div>




<pre>
    {JSON.stringify($page,null,2)}
</pre>