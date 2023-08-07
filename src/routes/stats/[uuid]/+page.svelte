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
            <span slot="title">s19 stats</span>
            {#if !data.player.goalie}
            <h2 class="text-2xl mt-4">Stats</h2>
            <hr class=" border-2 w-1/4" style="border-color: {data.player.team.color}">
            <div class="grid lg:grid-cols-10 md:grid-cols-5 sm:grid-cols-5 grid-cols-3">
                <div class="col-span-1">
                    <h2>Goals</h2>
                    <p>{goals}</p>
                </div>
                <div class="col-span-1">
                    <h2>Assists</h2>
                    <p>{assists}</p>
                </div>
                <div class="col-span-1">
                    <h2>Points</h2>
                    <p>{points}</p>
                </div>
                <div class="col-span-1">
                    <h2>Games Played</h2>
                    <p>{gamesPlayed}</p>
                </div>
                <div class="col-span-1">
                    <h2>PPG</h2>
                    <p>{ppg}</p>
                </div>
            </div>
            {/if}
            {#if data.player.goalie}
            <h2 class="text-2xl mt-4">Stats</h2>
            <hr class=" border-2 w-1/4" style="border-color: {data.player.team.color}">
            <div class="grid lg:grid-cols-10 md:grid-cols-5 sm:grid-cols-5 grid-cols-3">
                <div class="col-span-1">
                    <h2>Shots</h2>
                    <p>{shots}</p>
                </div>
                <div class="col-span-1">
                    <h2>Saves</h2>
                    <p>{saves}</p>
                </div>
                <div class="col-span-1">
                    <h2>Save %</h2>
                    <p>{savepercentage}</p>
                </div>
                <div class="col-span-1">
                    <h2>Goals Against Average</h2>
                    <p>{gaa}</p>
                </div>
                <div class="col-span-1">
                    <h2>Games Played</h2>
                    <p>{gamesPlayed}</p>
                </div>
        </div>
            {/if}
        </TabItem>
        <TabItem >
            <span slot="title">All Time Stats</span>
            <p>all time</p>
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