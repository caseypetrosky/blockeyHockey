<script>
	import CutePlayerDisp from '$lib/cutePlayerDisp.svelte';
    import {page} from '$app/stores';
    export let data;
    let teamImg = `/src/static/logos/${data.team.id}.png`;
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
        <img src={teamImg} alt="team logo" class="h-40 w-40 mr-4">
        <div>
            <h1 class="my-auto text-4xl">{data.team.name}</h1>
            <h2>Owner: {data.team.team_owner}</h2>
            <h2>League: {data.league.name}</h2>
            {#if data.team.championships   != null  }
                <h3>Championships: {data.team.championships}</h3>
            {/if}
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
        {#each teamPlayers as player}
              <CutePlayerDisp player = {player}/>
        {/each}
    {:else}
              <h1>This team has no players</h1>
    {/if}
        </div>
   
    <h2 class="text-2xl mt-4">Stadium</h2>
    <hr class="border-2 w-1/4" style="border-color: {teamColor}">
    
</div>  
<!--
<img src={rinkImg}>

-->
<pre>
    {JSON.stringify($page,null,2)}
</pre>  