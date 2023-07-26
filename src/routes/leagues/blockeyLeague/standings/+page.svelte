<!-- Standings.svelte -->
<script>
	let teams = []; // This will hold the team standings data
  
	// Example data format (you should fetch the data from an API or local source):
	// teams = [
	//   { name: "Team A", wins: 6, losses: 2, points: 18 },
	//   { name: "Team B", wins: 5, losses: 3, points: 15 },
	//   ... (and so on for other teams)
	// ];
  
	// For demonstration purposes, I'll use static example data:
	teams = [
	  { name: "Team A", wins: 6, losses: 2, points: 18 },
	  { name: "Team B", wins: 5, losses: 3, points: 15 },
	  { name: "Team C", wins: 4, losses: 4, points: 12 },
	  { name: "Team D", wins: 4, losses: 4, points: 12 },
	  { name: "Team E", wins: 3, losses: 5, points: 9 },
	  { name: "Team F", wins: 3, losses: 5, points: 9 },
	  { name: "Team G", wins: 2, losses: 6, points: 6 },
	  { name: "Team H", wins: 2, losses: 6, points: 6 },
	  { name: "Team I", wins: 1, losses: 7, points: 3 },
	];
  </script>
  
<div class="container py-4 mx-auto text-white tabs ">
	<a href="/leagues/blockeyLeague" class="tab tab-bordered text-2xl">League Info</a> 
	<a href="/leagues/blockeyLeague/rosters" class="tab tab-bordered  text-2xl ">Team Rosters</a> 
	<a href="/leagues/blockeyLeague/standings" class="tab tab-bordered  tab-active text-2xl">Standings</a>
	<a href="/leagues/blockeyLeague/bhlstats" class="tab tab-bordered text-2xl">Stats Leaderboard</a>
</div>
  <table class="container mx-auto">
	<thead>
	  <tr>
		<th>Team</th>
		<th>Wins</th>
		<th>Losses</th>
		<th>Points</th>
	  </tr>
	</thead>
	<tbody>
	  {#each teams as team}
		<tr>
		  <td>{team.name}</td>
		  <td>{team.wins}</td>
		  <td>{team.losses}</td>
		  <td>{team.points}</td>
		</tr>
	  {/each}
	</tbody>
  </table>
  
  <style>
	table {
	  width: 100%;
	  border-collapse: collapse;
	}
  
	th, td {
	  padding: 8px;
	  text-align: left;
	  border-bottom: 1px solid #ddd;
	}
  
	th {
	}
  
	tr:hover {
	}
  </style>
  
