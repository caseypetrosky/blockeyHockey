<script>
    import {page} from '$app/stores';
    import {Tabs, TabItem} from 'flowbite-svelte';
    export let data;
    let savepercentage = 0;
    let gaa = 0;
    
    //add regular and playoff ppg to each season
    data.player.seasonsArray.forEach(season => {
        
        if (!season.playoffs.gp) {
            season.playoffs = {
                player: {
                    gp: 0, goals: 0, assists: 0, points: 0, touches: 0, toi: 0, ppg: "0.00"
                }

            };
        }
        if(data.player.goalie && season.playoffs.goalie == undefined){
            season.playoffs.goalie = {
                gp: 0, shots: 0, saves: 0, save_percentage: "0.00", goals_allowed: 0, shutouts: 0, gaa: "0.00"
            }
        }


            
        if(data.player.goalie){
            let regularSavePercentage = parseFloat((season.regular.goalie.saves / season.regular.goalie.shots*100)).toFixed(2);
            season.regular.goalie.save_percentage = isNaN(regularSavePercentage) ? "0.00" : regularSavePercentage;
            
            let playoffsSavePercentage = parseFloat((season.playoffs.goalie.saves / season.playoffs.goalie.shots*100)).toFixed(2);
            season.playoffs.goalie.save_percentage = isNaN(playoffsSavePercentage) ? "0.00" : playoffsSavePercentage;

            let regularGAA = parseFloat(season.regular.goalie.goals_allowed / (season.regular.goalie.gp || 1)).toFixed(2);
            season.regular.goalie.gaa = isNaN(regularGAA) ? "0.00" : regularGAA;

            let playoffsGAA = parseFloat(season.playoffs.goalie.goals_allowed / (season.playoffs.goalie.gp || 1)).toFixed(2);
            season.playoffs.goalie.gaa = isNaN(playoffsGAA) ? "0.00" : playoffsGAA;
        }else{
            
            let regularPPG = parseFloat(season.regular.player.points / (season.regular.player.gp || 1)).toFixed(2);
            season.regular.player.ppg = isNaN(regularPPG) ? "0.00" : regularPPG;
            
            let playoffsPPG = parseFloat(season.playoffs.player.points / (season.playoffs.player.gp || 1)).toFixed(2);
            season.playoffs.player.ppg = isNaN(playoffsPPG) ? "0.00" : playoffsPPG;
        }  
    });


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

    // ... rest of your script ...

    if (data.player.allTimeSkaterStats && data.player.allTimeSkaterStats[0] != null) {
        alltimeSkater = data.player.allTimeSkaterStats[0];
        alltimeSkater.points = alltimeSkater.goals + alltimeSkater.assists;
        ggp = parseFloat(alltimeSkater.goals / alltimeSkater.games_played).toFixed(2);
        agp = parseFloat(alltimeSkater.assists / alltimeSkater.games_played).toFixed(2);
        psp = parseFloat(alltimeSkater.points / alltimeSkater.seasons_played).toFixed(2);
        gsp = parseFloat(alltimeSkater.goals / alltimeSkater.seasons_played).toFixed(2);
        asp = parseFloat(alltimeSkater.assists / alltimeSkater.seasons_played).toFixed(2);
        allTimePPG = parseFloat(alltimeSkater.points / alltimeSkater.games_played).toFixed(2);
    }
    if (data.player.allTimeGoalieStats && data.player.allTimeGoalieStats[0] != null) {
        alltimeGoalie = data.player.allTimeGoalieStats[0];
        winpercentage = parseFloat((alltimeGoalie.wins / alltimeGoalie.games_played) * 100).toFixed(2);
        allTimesavepercentage = parseFloat((alltimeGoalie.saves / alltimeGoalie.shots * 100)).toFixed(2);
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
            <h2>Current Contract Info</h2>
            <hr class="border-2 " style="border-color: {data.player.team.color}">
            <p class="text-xs">Contract Type: {data.player.contractTier}</p>
            <p class="text-xs">Contract Price: ${data.player.contractPrice}</p>
            <p class="text-xs">Contract Length: {data.player.contractLength}</p>
            
        </div>
    </div>  





    <h2 class="text-2xl mt-4">Stats</h2>
    <hr class=" border-2 w-1/4" style="border-color: {data.player.team.color}">
   <!-- ... other code ... -->

<Tabs style="pill" class="mt-4 text-white">
        
    <TabItem open class="text-white">
        <span slot="title">Seasonal League Stats</span>

        <!-- Nested Tabs for Regular Season and Playoffs -->
        <Tabs style="pill" class="mt-4 text-white">
            
            <!-- Regular Season Tab -->
            <TabItem open class="text-white">
                <span slot="title">Regular Season</span>

                    {#if !data.player.goalie}
                    <div class="">
                        <h2 class="text-2xl">Seasonal League Stats</h2>
                        <hr class="border-2 w-1/4 mb-4" style="border-color: {data.player.team.color}">
                            <div class="overflow-x-auto">
                                <table class="table-auto border-collapse w-full">
                                    <thead>
                                        <tr class="text-sm font-medium text-left" style="border-bottom: 2px solid {data.player.team.color};">
                                            <th class="">Season</th>
                                            <th class="">Games Played</th>
                                            <th class="">Goals</th>
                                            <th class="">Assists</th>
                                            <th class="">Points</th>
                                            <th class="">Touches</th>
                                            <th class="">Time On Ice</th>
                                            <th class="">Points Per Game</th>
                                        </tr>
                                    </thead>
                                        {#each data.player.seasonsArray as season }
                                            <tr class="text-sm font-normal ">
                                                <td>{season.id}</td>
                                                <td class="">{season.regular.player.gp}</td>
                                                <td class="">{season.regular.player.goals}</td>
                                                <td class="">{season.regular.player.assists}</td>
                                                <td class="">{season.regular.player.points}</td>
                                                <td class="">{season.regular.player.touches}</td>
                                                <td class="">{season.regular.player.toi}</td>
                                                <td class="">{season.regular.player.ppg}</td>
                                        </tr>
                                        {/each}
                                        
                                </table>

                        </div>
                    </div>
                
                    {/if}
                    {#if data.player.goalie}
                    <div class="p-8">
                        <h2 class="text-2xl">S19 Goalie Stats</h2>
                        <hr class="border-2 w-1/4 mb-4" style="border-color: {data.player.team.color}">

                            <div class="overflow-x-auto">
                                <table class="table-auto border-collapse w-full">
                                    <thead>
                                        <tr class="text-sm font-medium text-left" style="border-bottom: 2px solid {data.player.team.color};">
                                            <td>Season</td>
                                            <th class="">Games Played</th>
                                            <th class="">Shots</th>
                                            <th class="">Saves</th>
                                            <th class="">Save %</th>
                                            <th class="">Goals Allowed</th>
                                            <th class="">Shutouts</th>
                                            <th class="">Goals Against Average</th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-sm font-normal ">
                                        {#each data.player.seasonsArray as season }
                                            <tr class="text-sm font-normal ">
                                                <td>{season.id}</td>
                                                <td class="">{season.regular.player.gp}</td>
                                                <td class="">{season.regular.goalie.shots}</td>
                                                <td class="">{season.regular.goalie.saves}</td>
                                                <td class="">{season.regular.goalie.save_percentage}%</td>
                                                <td class="">{season.regular.goalie.goals_allowed}</td>
                                                <td class="">{season.regular.goalie.shutouts}</td>
                                                <td class="">{season.regular.goalie.gaa}</td>
                                        </tr>
                                        {/each}
                                        
                                    </tbody>
                                </table>
                            </div>
                    </div>
                
                    {/if}
            </TabItem>

            <!-- Playoffs Tab -->
            <TabItem class="text-white">
                <span slot="title">Playoffs </span>

                    {#if !data.player.goalie}
                    <div class="">
                        <h2 class="text-2xl">Seasonal Playoff Stats</h2>
                        <hr class="border-2 w-1/4 mb-4" style="border-color: {data.player.team.color}">
                            <div class="overflow-x-auto">
                                <table class="table-auto border-collapse w-full">
                                    <thead>
                                        <tr class="text-sm font-medium text-left" style="border-bottom: 2px solid {data.player.team.color};">
                                            <th class="">Season</th>
                                            <th class="">Games Played</th>
                                            <th class="">Goals</th>
                                            <th class="">Assists</th>
                                            <th class="">Points</th>
                                            <th class="">Touches</th>
                                            <th class="">Time On Ice</th>
                                            <th class="">Points Per Game</th>
                                        </tr>
                                    </thead>
                                        {#each data.player.seasonsArray as season }
                                            <tr class="text-sm font-normal ">
                                                <td>{season.id}</td>
                                                <td class="">{season.playoffs.player.gp}</td>
                                                <td class="">{season.playoffs.player.goals}</td>
                                                <td class="">{season.playoffs.player.assists}</td>
                                                <td class="">{season.playoffs.player.points}</td>
                                                <td class="">{season.playoffs.player.touches}</td>
                                                <td class="">{season.playoffs.player.toi}</td>
                                                <td class="">{season.playoffs.player.ppg}</td>
                                        </tr>
                                        {/each}
                                        
                                </table>

                        </div>
                    </div>
                
                    {/if}
                    {#if data.player.goalie}
                    <div class="p-8">
                        <h2 class="text-2xl">S19 Goalie Stats</h2>
                        <hr class="border-2 w-1/4 mb-4" style="border-color: {data.player.team.color}">

                            <div class="overflow-x-auto">
                                <table class="table-auto border-collapse w-full">
                                    <thead>
                                        <tr class="text-sm font-medium text-left" style="border-bottom: 2px solid {data.player.team.color};">
                                            <td>Season</td>
                                            <th class="">Games Played</th>
                                            <th class="">Shots</th>
                                            <th class="">Saves</th>
                                            <th class="">Save %</th>
                                            <th class="">Goals Allowed</th>
                                            <th class="">Shutouts</th>
                                            <th class="">Goals Against Average</th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-sm font-normal ">
                                        {#each data.player.seasonsArray as season }
                                            <tr class="text-sm font-normal ">
                                                <td>{season.id}</td>
                                                <td class="">{season.playoffs.player.gp}</td>
                                                <td class="">{season.playoffs.goalie.shots}</td>
                                                <td class="">{season.playoffs.goalie.saves}</td>
                                                <td class="">{season.playoffs.goalie.save_percentage}%</td>
                                                <td class="">{season.playoffs.goalie.goals_allowed}</td>
                                                <td class="">{season.playoffs.goalie.shutouts}</td>
                                                <td class="">{season.playoffs.goalie.gaa}</td>
                                        </tr>
                                        {/each}
                                        
                                    </tbody>
                                </table>
                            </div>
                    </div>
                
                    {/if}
            </TabItem>

        </Tabs>

    </TabItem>

    <TabItem >
        <span slot="title">All Time Stats</span>
        {#if !data.player.goalie}
        <div class="p-8">
            <h2 class="text-2xl mt-4">All time Career Stats s1-s18</h2>
            <hr class="border-2 w-1/4" style="border-color: {data.player.team.color}">
            <table>
                <tr class="text-sm font-medium text-left" style="border-bottom: 2px solid {data.player.team.color};">
                    <th class="px-4 py-2">Seasons Played</th>
                    <th class="px-4 py-2">Games Played</th>
                    <th class="px-4 py-2">Goals</th>
                    <th class="px-4 py-2">Assists</th>
                    <th class="px-4 py-2">Points</th>
                    <th class="px-4 py-2">Goals Per Game</th>
                    <th class="px-4 py-2">Assists Per Game</th>
                    <th class="px-4 py-2">Points Per Game</th>
                    <th class="px-4 py-2">Goals Per Season</th>
                    <th class="px-4 py-2">Assists Per Season</th>
                    <th class="px-4 py-2">Points Per Season</th>
                </tr> 
                <tbody> 
                    <td class="px-4 py-2">{alltimeSkater.seasons_played}</td>
                    <td class="px-4 py-2">{alltimeSkater.games_played}</td>
                    <td class="px-4 py-2">{alltimeSkater.goals}</td>
                    <td class="px-4 py-2">{alltimeSkater.assists}</td>
                    <td class="px-4 py-2">{alltimeSkater.points}</td>
                    <td class="px-4 py-2">{ggp}</td>
                    <td class="px-4 py-2">{agp}</td>
                    <td class="px-4 py-2">{allTimePPG}</td>
                    <td class="px-4 py-2">{gsp}</td>
                    <td class="px-4 py-2">{asp}</td>
                    <td class="px-4 py-2">{psp}</td>
                </tbody>
            </table>
         
        </div>
 
        {/if}
        {#if data.player.goalie}
        <div class="p-8">
            <h2 class="text-2xl mt-4">All time Goalie Stats s1-s18</h2>
            <hr class="border-2 w-1/4" style="border-color: {data.player.team.color}">
            <table>
                <tr class="text-sm font-medium text-left" style="border-bottom: 2px solid {data.player.team.color};">
                    <th class="px-4 py-2">Seasons Played</th>
                    <th class="px-4 py-2">Games Played</th>
                    <th class="px-4 py-2">Wins</th>
                    <th class="px-4 py-2">Losses</th>
                    <th class="px-4 py-2">Win %</th>
                    <th class="px-4 py-2">Shutouts</th>
                    <th class="px-4 py-2">Shots Faced</th>
                    <th class="px-4 py-2">Goals Allowed</th>
                    <th class="px-4 py-2">Saves</th>
                    <th class="px-4 py-2">Save %</th>
                    <th class="px-4 py-2">Shots Per Game</th>
                    <th class="px-4 py-2">Goals Against Average</th>

                </tr> 
                <tbody> 
                    <td class="px-4 py-2">{alltimeGoalie.seasons_played}</td>
                    <td class="px-4 py-2">{alltimeGoalie.games_played}</td>
                    <td class="px-4 py-2">{alltimeGoalie.wins}</td>
                    <td class="px-4 py-2">{alltimeGoalie.losses}</td>
                    <td class="px-4 py-2">{winpercentage}%</td>
                    <td class="px-4 py-2">{alltimeGoalie.shutouts}</td>
                    <td class="px-4 py-2">{alltimeGoalie.shots}</td>
                    <td class="px-4 py-2">{alltimeGoalie.goals_allowed}</td>
                    <td class="px-4 py-2">{alltimeGoalie.saves}</td>
                    <td class="px-4 py-2">{allTimesavepercentage}%</td>
                    <td class="px-4 py-2">{spg}</td>
                    <td class="px-4 py-2">{allTimegaa}</td>
                </tbody>
            </table>
            
        </div>
        
        
        {/if}

    </TabItem>

</Tabs>

<!-- ... other code ... -->

    
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
