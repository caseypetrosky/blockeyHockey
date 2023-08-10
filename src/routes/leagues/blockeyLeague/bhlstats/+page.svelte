<script>
import { page } from '$app/stores'
  import { onMount } from 'svelte';
  import {Tabs, TabItem} from 'flowbite-svelte';

export let data;
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
			<table class="table">
				<thead>
					<tr>
						<th>Rank</th>
						<th class="hover:cursor-pointer" on:click={() => { console.log('Clicked on Username header.'); sort("username"); }}>Username</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.gp")}>Games Played</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.goals")}>Goals</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.assists")}>Assists</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.points")}>Points</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.ppg")}>Points per Game</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.touches")}>Touches</th>
						<th class="hover:cursor-pointer" on:click={() => sort("skaterStats.toi")}>Time On Ice</th>


						
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
							<td>{row.skaterStats.ppg}</td>
							<td>{row.skaterStats.touches}</td>
							<td>{row.skaterStats.toi}</td>


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
</Tabs>
</div>


  <pre class="text-white">
	{JSON.stringify($page,null,2)}
</pre>



