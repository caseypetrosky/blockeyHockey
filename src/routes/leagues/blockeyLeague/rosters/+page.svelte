<script>
	import BHLCutePlayerDisp from '$lib/bhlcutePlayerDisp.svelte';
	export let data;
</script>

<div class="container py-4 mx-auto text-white tabs ">
	<a href="/leagues/blockeyLeague" class="tab tab-bordered text-2xl">League Info</a> 
	<a href="/leagues/blockeyLeague/rosters" class="tab tab-bordered  tab-active text-2xl ">Team Rosters</a> 
	<a href="/leagues/blockeyLeague/standings" class="tab tab-bordered text-2xl">Standings</a>
	<a href="/leagues/blockeyLeague/bhlstats" class="tab tab-bordered text-2xl">Stats Leaderboard</a>
  </div>

  <header class="text-white">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold">Current BHCL Rosters</h1>	
    </div>
    
  </header>

  <div class="container mx-auto px-4">
    {#each data.team as t}
      <div class="flex gap-2">
        <a href="/teams/{t.id}" class="text-4xl font-bold" >{t.name}</a>
        <img src="/teamlogos/{t.id}.png" class="h-12 w-12 object-contain" alt="Team Logo" />
      </div>
      <hr class="border-2 w-full" style="border-color: {t.color}">
      <div class="grid lg:grid-cols-10 md:grid-cols-5 sm:grid-cols-5 grid-cols-3">
       {#each t.players as player}
        <BHLCutePlayerDisp player={player}/>
       {:else}
       <h2>No players</h2>
       {/each}
      </div>
    {/each}
  </div>
