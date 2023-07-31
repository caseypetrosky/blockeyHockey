<script>
export let data

</script>

<div class="container py-4 mx-auto text-white tabs ">
	<a href="/leagues/blockeyLeague" class="tab tab-bordered text-2xl">League Info</a> 
	<a href="/leagues/blockeyLeague/rosters" class="tab tab-bordered  text-2xl ">Team Rosters</a> 
	<a href="/leagues/blockeyLeague/standings" class="tab tab-bordered  text-2xl">Standings</a>
	<a href="/leagues/blockeyLeague/bhlstats" class="tab tab-bordered  tab-active text-2xl">Stats Leaderboard</a>
  </div>

  <main>
	<h1>Player Usernames</h1>
	{#each data.players as player}
	 {player.username} {player.id} {player.teamId}<br>
	{/each}
	{#each data.teams as team}
	 {team.id} {team.name} {team.team_owner}<br>
	{/each}
  </main>
  <h1>What the heckers</h1>