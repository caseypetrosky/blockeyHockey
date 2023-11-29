	<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Tabs, TabItem } from 'flowbite-svelte';

	export let data;
console.log(data.player);
	// Mapping of stat abbreviations to full names
	const statFullNames = {
		'goals': 'Goals',
		'assists': 'Assists',
		'points': 'Points',
		'touches': 'Touches',
		'toi': 'Time On Ice',
		'gp': 'Games Played',
		'ppg': 'Points Per Game',
		'gpg': 'Goals Per Game',
		'pp15': 'Points Per 15 Minutes',
		'gp15': 'Goals Per  15 Minutes',
		'toup15': 'Touches Per 15 Minutes',
		'toupg': 'Touches Per Game'
	};
	const goalieStatFullNames = {
    'gaa': 'Goals Against Average',
    'goals_allowed': 'Goals Allowed',
    'gp': 'Games Played',
    'savepercentage': 'Save Percentage',
    'saves': 'Saves',
    'shots': 'Shots Against',
    'shutouts': 'Shutouts',
    'toi': 'Time On Ice',
    'touches': 'Touches'
};


	let array = [...data.player];

	let sortBy = {col:"skaterStats.gp", ascending: false};

	$: sort = (column) => {
			if (sortBy.col === column) {
				sortBy.ascending = !sortBy.ascending;
			} else {
				sortBy.col = column;
				sortBy.ascending = true;
			}

			let sortModifier = sortBy.ascending ? 1 : -1;

			let sort = (a, b) => {
				const aValue = column.includes('.') ? column.split('.').reduce((obj, key) => obj[key], a) : a[column];
				const bValue = column.includes('.') ? column.split('.').reduce((obj, key) => obj[key], b) : b[column];

				return aValue < bValue ? -1 * sortModifier : aValue > bValue ? 1 * sortModifier : 0;
			};

			array = array.slice().sort(sort);
		};

	onMount(() => {
			sort("skaterStats.points");
			sort("skaterStats.points");
	});

	function getTopPlayersForStat(players, stat) {
		return players
			.sort((a, b) => b.skaterStats[stat] - a.skaterStats[stat])
			.slice(0, 5)
			.map((player, index) => ({
				username: player.username,
				uuid: player.uuid,
				stat: player.skaterStats[stat],
				rank: index + 1 // Add rank
			}));
	}
	function getTopGoaliesForStat(goalies, stat) {
    return goalies
        .sort((a, b) => b.goalieStats[stat] - a.goalieStats[stat])
        .slice(0, 5)
        .map((goalie, index) => ({
            username: goalie.username,
            uuid: goalie.uuid,
            stat: goalie.goalieStats[stat],
            rank: index + 1 // Add rank
        }));
}

		// Assuming all players have the same stat fields in 'skaterStats'
	let statKeys = Object.keys(data.player[0].skaterStats);

		// Object to store the top 5 players for each stat
	let topPlayers = {};

	statKeys.forEach(stat => {
		topPlayers[stat] = getTopPlayersForStat(data.player, stat);
	});
	let goalieArray = data.player.filter(player => player.goalie); // Replace with your actual goalie data structure

		// Wrapping the result in an object named 'players'
	let result = { players: topPlayers };
	let topGoalies = {};

	Object.keys(goalieStatFullNames).forEach(stat => {
		topGoalies[stat] = getTopGoaliesForStat(goalieArray, stat);
	});

	// Add the topGoalies to the result object
	result.goalies = topGoalies;
</script>

  <div class="container py-4 mx-auto text-white tabs ">
	<a href="/leagues/blockeyLeague" class="tab tab-bordered text-2xl">League Info</a> 
	<a href="/leagues/blockeyLeague/rosters" class="tab tab-bordered  text-2xl ">Team Rosters</a> 
	<a href="/leagues/blockeyLeague/standings" class="tab tab-bordered  text-2xl">Standings</a>
	<a href="/leagues/blockeyLeague/bhlstats" class="tab tab-bordered  tab-active text-2xl">Stats Leaderboard</a>
  </div>
  <div class="container mx-auto text-white">
<Tabs style="pill" class="mt-4 text-white ">
	<TabItem open  title="Skater Stats Leaderboard">
		<div class="overflow-x-auto  text-white">
			<h1 class="text-3xl font-bold text-center">S19 Skater Stats Leaderboard</h1>
			<table class="table table-">
				<thead>
					<tr>
						<th>Rank</th>
						<th class="hover:cursor-pointer" on:click={() => { console.log('Clicked on Username header.'); sort("username"); }}>Username</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.gp")}>Games Played</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.goals")}>Goals</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.assists")}>Assists</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.points")}>Points</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.touches")}>Touches</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.toi")}>Time On Ice</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.ppg")}>Points per Game</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.gpg")}>Goals per Game</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.pp15")}>Points per 15mins</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.gp15")}>Goals per 15mins</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.toup15")}>Touches per 15mins</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.toupg")}>Touches per Goal</th>

						
					</tr>
				</thead>
				<tbody>
					{#each array as row,i}
						<tr>	
							<td>{i +1}</td>
							<td><a href="/stats/{row.uuid}" class="text-lg"><img src="https://minotar.net/armor/bust/{row.uuid}/300.png" alt="player avatar" class="rounded-sm w-8 h-8">{row.username}</a></td>
							<td>{row.skaterStats.gp}</td>
							<td>{row.skaterStats.goals}</td>
							<td>{row.skaterStats.assists}</td>
							<td>{row.skaterStats.points}</td>
							<td>{row.skaterStats.touches}</td>
							<td>{row.skaterStats.toi}</td>
							<td>{row.skaterStats.ppg}</td>
							<td>{row.skaterStats.gpg}</td>
							<td>{row.skaterStats.pp15}</td>
							<td>{row.skaterStats.gp15}</td>
							<td>{row.skaterStats.toup15}</td>
							<td>{row.skaterStats.toupg}</td>


						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</TabItem>
	<TabItem title="Goalie Stats Leaderboard">
		<div class="overflow-x-auto container mx-auto text-white">
			<h1 class="text-3xl font-bold text-center">S19 Goalie Stats Leaderboard</h1>
			<table class="table">
				<thead>
					<tr>
						<th class="hover:cursor-pointer" on:click={() => { console.log('Clicked on Username header.'); sort("username"); }}>Username</th>
						<th class="hover:cursor-pointer" on:click={() => sort("goalieStats.gp")}>Games Played</th>
						<th class="hover:cursor-pointer" on:click={() => sort("goalieStats.shots")}>Shots</th>
						<th class="hover:cursor-pointer" on:click={() => sort("goalieStats.saves")}>Saves</th>
						<th class="hover:cursor-pointer" on:click={() => sort("goalieStats.goals_allowed")}>Goals Against</th>
						<th class="hover:cursor-pointer" on:click={() => sort("goalieStats.savepercentage")}>Save %</th>
						<th class="hover:cursor-pointer" on:click={() => sort("goalieStats.gaa")}>GAA</th>
						<th class="hover:cursor-pointer" on:click={() => sort("goalieStats.toi")}>Time On Ice</th>


						
					</tr>
				</thead>
				<tbody>
					{#each array as row}
					 {#if row.goalie}
					 <tr>
						<td><a href="/stats/{row.uuid}" class="text-lg"><img src="https://minotar.net/armor/bust/{row.uuid}/300.png" alt="player avatar" class="rounded-sm w-8 h-8">{row.username}</a></td>
						<td>{row.goalieStats.gp}</td>
						<td>{row.goalieStats.shots}</td>
						<td>{row.goalieStats.saves}</td>
						<td>{row.goalieStats.goals_allowed}</td>
						<td>{row.goalieStats.savepercentage}%</td>
						<td>{row.goalieStats.gaa}</td>
						<td>{row.goalieStats.toi}</td>


					</tr>
					 {/if}
						
					{/each}
				</tbody>
			</table>
		</div>
	</TabItem>
	<TabItem title="Stats Sheet Display">
		<style>
			.stats-container {
			  display: grid;
			  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			  gap: 16px;
			  padding: 16px;
			}
		  
			.stat-category {
			  border: 1px solid #ccc;
			  border-radius: 8px;
			  padding: 16px;
			}
		  
			@media (max-width: 768px) {
			  .stats-container {
				grid-template-columns: 1fr;
			  }
			}
		  
			h2 {
			  font-size: 1.5rem;
			  margin-bottom: 1rem;
			}
		  
			ul {
			  list-style: none;
			  padding: 0;
			  margin: 0;
			}
		  
			.coolist {
			  display: flex;
			  justify-content: space-between;
			  padding: 8px 0;
			  border-bottom: 1px solid #eee;
			  color: inherit; /* Optional: to inherit text color */
			text-decoration: none; /* Optional: to remove underline */
			transition: color 0.3s ease; /* Smooth transition for color change */
			}
			.coolist a:hover {
				/* Style for hover state */
				color: #777; /* Darker color on hover */
			}
				
			li:last-child {
			  border-bottom: none;
			}
		  </style>
		  
		  <div class="stats-container">
			{#each Object.entries(result.players) as [category, players]}
			<div class="stat-category">
				<h2>{statFullNames[category]}</h2> <!-- Updated to show full stat name -->
				<ul>
					{#each players as player}
					<li class="coolist">
						<span>{player.rank}. <a href="/stats/{player.uuid}">{player.username}</a></span>
						<strong>{player.stat}</strong>
					</li>
					{/each}
				</ul>
			</div>
			{/each}
		</div>
		<h1 class="text-3xl font-bold text-center">Goalie Stats</h1>
		<div class="stats-container">
			{#each Object.entries(result.goalies) as [category, goalies]}
			<div class="stat-category">
				<h2>{goalieStatFullNames[category]}</h2>
				<ul>
					{#each goalies as goalie}
					<li class="coolist">
						<span>{goalie.rank}. <a href="/stats/{goalie.uuid}">{goalie.username}</a></span>
						<strong>{goalie.stat}</strong>
					</li>
					{/each}
				</ul>
			</div>
			{/each}
		</div>
		
	</TabItem>
</Tabs>
</div>





