<script>
	import CutePlayerDisp from '$lib/cutePlayerDisp.svelte';
	import BHLCutePlayerDisp from '$lib/bhlcutePlayerDisp.svelte';

    import {page} from '$app/stores';
    export let data;
    let teamImg = `/teamlogos/${data.team.id}.png`;
    let rinkImg = `/src/static/logos/${data.team.id}rink.png`
    let teamPlayers = data.players;
    let teamColor = data.team.color;
    let gamesPlayed = 0;
    let wins = 0;
    let losses = 0;
    let otLosses = 0;
    
    for(let i = 0; i < data.team.game_team_stats.length; i++){
        gamesPlayed++;
        if(data.team.game_team_stats[i].goals_scored > data.team.game_team_stats[i].goals_allowed){
            wins++;
        }
        else if(data.team.game_team_stats[i].goals_scored < data.team.game_team_stats[i].goals_allowed && !data.team.game_team_stats[i].is_overtime){
            losses++;
        }
        else{
            otLosses++;
        }
    }
</script>


<div class="container mx-auto mt-10">

    <div class="inline-flex">
        <img src={teamImg} alt="team logo" class="h-44 w-auto mr-4">
        <div>
            <h1 class="my-auto text-4xl">{data.team.name}</h1>
            <h2>Owner: {data.team.team_owner}</h2>
            <h2>League: {data.league.name}</h2>
            {#if data.team.championships   != null  }
                <h3>Championships: {data.team.championships}</h3>
            {/if}
            <div class="text-xs">
            {#if data.team.leagueId == 1}
                <h3>Cap Space: ${data.team.capSpace}</h3>
                <h3>Cap Hit: ${data.team.totalSalary}</h3>
                <h3>Remaining Cap: ${data.team.capHit}</h3>
            {/if}
        </div>
            <h2 class="text-xl">Record</h2>
            <p>{wins}-{losses}-{otLosses}</p>
        </div>
    </div>  
    <h2 class="text-2xl mt-4">Description</h2>
    <hr class=" border-2 w-1/4" style="border-color: {teamColor}">
    <p>{data.team.description}</p>
    <h2 class="text-2xl mt-4">Roster</h2>
    <hr class=" border-2 w-1/4" style="border-color: {teamColor}">
    <div class="grid lg:grid-cols-10 md:grid-cols-5 sm:grid-cols-5 grid-cols-3">
    {#if teamPlayers.length > 0}
        {#if data.team.leagueId == 1}
            {#each teamPlayers as player}
                <BHLCutePlayerDisp player = {player}/>
            {/each}
        {:else}
            {#each teamPlayers as player}
                <CutePlayerDisp player = {player}/>
            {/each}
        {/if}
    {:else}
              <h1>This team has no players</h1>
    {/if}
        </div>
   
    <h2 class="text-2xl mt-4">Recent games (Oldest To Newest)</h2>
    <hr class="border-2 w-1/4" style="border-color: {teamColor}">
        <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
    {#each data.games as game}
        <div class="flex gap-2 border-2 max-w-xs m-2 p-2" style="border-color:{teamColor}">
            {#if game.home_teamId == data.team.id}
                <div>
                    <p>Home game vs {game.away_teamId}</p>
                    {#if game.is_playoff}
                        <p class=" text-yellow-500">Playoff Game</p>
                    {:else}
                        <p class=" ">Regular Season Game</p>
                    {/if}
                    {#if game.home_team.game_team_stats[0].goals_scored > game.home_team.game_team_stats[0].goals_allowed}
                        <p class="text-xl text-green-500">Win</p>
                    {:else if game.home_team.game_team_stats[0].goals_scored < game.home_team.game_team_stats[0].goals_allowed && !game.is_overtime}
                        <p class="text-xl text-red-500">Loss</p>
                    {:else}
                        <p class="text-xl text-white">Overtime Loss</p>
                    {/if}
                </div>
            {:else}
                <div>
                    <p>Away game @ {game.home_teamId}</p>
                    {#if game.is_playoff}
                        <p class=" text-yellow-500">Playoff Game</p>
                    {:else}
                        <p class="">Regular Season Game</p>
                    {/if}
                    {#if game.away_team.game_team_stats[0].goals_scored > game.away_team.game_team_stats[0].goals_allowed}
                        <p class="text-xl text-green-500">Win</p>
                    {:else if game.away_team.game_team_stats[0].goals_scored < game.away_team.game_team_stats[0].goals_allowed && !game.is_overtime}
                        <p class="text-xl text-red-500">Loss</p>
                    {:else}
                        <p class="text-xl text-white">Overtime Loss</p>
                    {/if}
                </div>
            {/if}
            <div class="">
                <div class="flex">
                    <img src="/teamlogos/{game.home_team.id}.png" alt="hometeam img" class="h-12 w-12 mr-2">
                    <p>{game.home_teamId} - {game.home_team.game_team_stats[0].goals_scored}</p>
                </div><div class="flex">
                    <img src="/teamlogos/{game.away_team.id}.png" alt="hometeam img" class="h-12 w-12 mr-2">
                    <p>{game.away_teamId} - {game.away_team.game_team_stats[0].goals_scored}</p>
                </div>
            </div>
        </div>
        
        {/each}
    </div>
    </div>

<!--
<img src={rinkImg}>
-->

