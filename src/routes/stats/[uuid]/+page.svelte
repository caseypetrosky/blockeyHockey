<script>
    import {page} from '$app/stores';
    import {Tabs, TabItem} from 'flowbite-svelte';
    export let data;
     let savepercentage = 0;
     let gaa = 0;
    if(data.player.goalie){
        savepercentage = parseFloat((data.player.seasonalgoaliestats.saves / data.player.seasonalgoaliestats.shots)*100).toFixed(2);
        gaa = parseFloat(data.player.seasonalgoaliestats.goals_allowed / data.player.seasonalgoaliestats.gamesPlayed).toFixed(2);
    }
let ppg = 0
if( data.player.seasonalgoaliestats.gamesPlayed> 0){
        ppg = parseFloat(data.player.seasonalstats.points / data.player.seasonalstats.gp).toFixed(2);
   };
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
alltimeSkater.points = alltimeSkater.goals + alltimeSkater.assists;
ggp = parseFloat(alltimeSkater.goals / alltimeSkater.games_played).toFixed(2);
agp = parseFloat(alltimeSkater.assists / alltimeSkater.games_played).toFixed(2);
psp = parseFloat(alltimeSkater.points / alltimeSkater.seasons_played).toFixed(2);
gsp = parseFloat(alltimeSkater.goals / alltimeSkater.seasons_played).toFixed(2);
asp = parseFloat(alltimeSkater.assists / alltimeSkater.seasons_played).toFixed(2);
allTimePPG = parseFloat(alltimeSkater.points / alltimeSkater.games_played).toFixed(2);}

if(data.player.goalie){
alltimeGoalie = data.player.allTimeGoalieStats[0];
winpercentage = parseFloat((alltimeGoalie.wins / alltimeGoalie.games_played)*100).toFixed(2);
allTimesavepercentage = parseFloat((alltimeGoalie.saves / alltimeGoalie.shots*100)).toFixed(2);
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
            <h2>Contract Info</h2>
            <hr class="border-2 " style="border-color: {data.player.team.color}">
            <p class="text-xs">Contract Type: {data.player.contractTier}</p>
            <p class="text-xs">Contract Price: ${data.player.contractPrice}</p>
            <p class="text-xs">Contract Length: {data.player.contractLength}</p>
            
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
                        <h2 class="text-lg font-semibold"  style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Games Played</h2>
                        <p>{data.player.seasonalstats.gp}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Goals</h2>
                        <p>{data.player.seasonalstats.goals}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Assists</h2>
                        <p>{data.player.seasonalstats.assists}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Points</h2>
                        <p>{data.player.seasonalstats.points}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold" style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Touches</h2>
                        <p>{data.player.seasonalstats.touches}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold"  style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Time On Ice</h2>
                        <p>{data.player.seasonalstats.toi}</p>
                    </div>
                    
                    <div class="p-2">
                        <h2 class="text-lg font-semibold"  style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Points Per Game</h2>
                        <p>{ppg}</p>
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
                        <h2 class="text-lg font-semibold"  style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Games Played</h2>
                        <p>{data.player.seasonalgoaliestats.gp}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold"  style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Shots</h2>
                        <p>{data.player.seasonalgoaliestats.shots}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold"  style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Saves</h2>
                        <p>{data.player.seasonalgoaliestats.saves}</p>
                    </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold"  style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Save %</h2>
                        <p>{savepercentage}%</p>
                        </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold"  style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Goals Allowed</h2>
                        <p>{data.player.seasonalgoaliestats.goals_allowed}</p>
                        </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold"  style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Shutouts</h2>
                        <p>{data.player.seasonalgoaliestats.shutouts}</p>
                        </div>
                    <div class="p-2">
                        <h2 class="text-lg font-semibold"  style="border-bottom: 2px solid {data.player.team.color}; padding-bottom: 0.25rem;">Goals Against Average</h2>
                        <p>{gaa}</p>
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
                        <p>{allTimesavepercentage}%</p>
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
    {#if data.player.awards != null}           
    <h2>{data.player.awards}</h2>
    {/if}



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