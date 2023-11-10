<script>
	import CutePlayerDisp from '$lib/cutePlayerDisp.svelte';
	import BHLCutePlayerDisp from '$lib/bhlcutePlayerDisp.svelte';

    export let data;
    let teamImg = `/teamlogos/${data.team.id}.png`;
    let teamPlayers = data.players;
    let teamColor = data.team.color;
   
    
</script>
<style>
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* This will create a grid with a minimum column width of 300px and a maximum of 1 fraction of available space */
    }
  </style>

<div class="container mx-auto mt-10">

    <div class="inline-flex">
        <img src="/bhl.png" alt="team logo" class="h-44 w-auto mr-4">
        <div>
            <h1 class="my-auto text-4xl">{data.team.name}</h1>
            <div class="text-xs">

        </div>
        </div>
    </div>  

    <h2 class="text-2xl mt-4">Unsigned Players</h2>
    <hr class=" border-2 w-1/4" style="border-color: {teamColor}">
            <div class="grid gap-4 mt-4">
            {#if teamPlayers.length > 0}
                {#each teamPlayers as player}
                    <a href="/stats/{player.uuid}">
                        <div class="flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-lg">
                            <div class="flex-shrink-0">
                                <img src="https://minotar.net/armor/bust/{player.uuid}/300.png" alt="player avatar" class="rounded-sm w-8 h-8">
                            </div>
                            <div class="flex-grow">
                                <h1 class="text-lg font-semibold">{player.username}</h1>
                            </div>
                        </div>
                    </a>
                {/each}
            {/if}
        </div>
    </div>


