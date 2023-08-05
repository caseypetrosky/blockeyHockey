<script>
	export let data;
  for (let i = 0; i < data.team.length; i++) {
    let teamImg = `/src/static/logos/${data.team[i].id}.png`;
  }
</script>

<div class="container py-4 mx-auto text-white tabs ">
	<a href="/leagues/blockeyLeague" class="tab tab-bordered text-2xl">League Info</a> 
	<a href="/leagues/blockeyLeague/rosters" class="tab tab-bordered  tab-active text-2xl ">Team Rosters</a> 
	<a href="/leagues/blockeyLeague/standings" class="tab tab-bordered text-2xl">Standings</a>
	<a href="/leagues/blockeyLeague/bhlstats" class="tab tab-bordered text-2xl">Stats Leaderboard</a>
  </div>

  <header class="text-white">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold">Current BHL Rosters</h1>	
    </div>
    
  </header>

  <div class="container mx-auto px-4">
    {#each data.team as t}
      <img src={teamImg} class="h-12 w-12 object-contain" alt="Team Logo" />
      <h1 class="text-4xl font-bold">{t.name}</h1>
    {/each}
  </div>
  <pre>
    {JSON.stringify(data,null,2)}
  </pre>