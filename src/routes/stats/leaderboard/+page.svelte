<script>
    import {Tabs, TabItem} from 'flowbite-svelte';
    import { onMount } from 'svelte';
import { page } from '$app/stores'

    
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
    <a href="/stats" class="tab tab-bordered text-2xl">Player Page Search</a> 
    <a href="/stats/leaderboard" class="tab tab-bordered tab-active  text-2xl ">All time leaderboards</a> 
  </div>

  <div class="container mx-auto text-white">
    <Tabs style="pill" class="mt-4 text-white ">
        <TabItem open  title="Skater Stats Leaderboard">
            <div class="overflow-x-auto  text-white">
                <h1 class="text-3xl font-bold text-center">All Time BHL Skater Leaderboard</h1>
                <table class="table table-">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th class="hover:cursor-pointer" on:click={() => { console.log('Clicked on Username header.'); sort("username"); }}>Username</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("skaterStats.gp")}>Seasons Played</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("skaterStats.gp")}>Games Played</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("skaterStats.goals")}>Goals</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("skaterStats.assists")}>Assists</th>
                            <th class="hover:cursor-pointer text-yellow-400" on:click={() => sort("skaterStats.points")}>Points</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("skaterStats.ggp")}>Goals Per Game</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("skaterStats.agp")}>Assists Per Game</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("skaterStats.allTimePPG")}>Points Per Game</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("skaterStats.gsp")}>Goals Per Season</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("skaterStats.asp")}>Assists Per Season</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("skaterStats.psp")}>Points Per Season</th>

                        </tr>
                    </thead>
                    <tbody>
                        {#each array as row,i}
                            <tr>	
                                <td>{i +1}</td>
                                <td><a href="/stats/{row.uuid}" class="text-lg"><img src="https://minotar.net/armor/bust/{row.uuid}/300.png" alt="player avatar" class="rounded-sm w-8 h-8">{row.username}</a></td>
                                <td>{row.skaterStats.sp}</td>
                                <td>{row.skaterStats.gp}</td>
                                <td>{row.skaterStats.goals}</td>
                                <td>{row.skaterStats.assists}</td>
                                <td>{row.skaterStats.points}</td>
                                <td>{row.skaterStats.ggp}</td>
                                <td>{row.skaterStats.agp}</td>
                                <td>{row.skaterStats.allTimePPG}</td>
                                <td>{row.skaterStats.gsp}</td>
                                <td>{row.skaterStats.asp}</td>
                                <td>{row.skaterStats.psp}</td>

                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </TabItem>
        <TabItem title="Goalie Stats Leaderboard">
            <div class="overflow-x-auto container mx-auto text-white">
                <h1 class="text-3xl font-bold text-center">All Time BHL Goalie Leaderboard</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th class="hover:cursor-pointer" on:click={() => { console.log('Clicked on Username header.'); sort("username"); }}>Username</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("goalieStats.gp")}>Games Played</th>
                            <th class="hover:cursor-pointer text-yellow-400" on:click={() => sort("goalieStats.wins")}>Wins</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("goalieStats.losses")}>Losses</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("goalieStats.winpercentage")}>Win %</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("goalieStats.shots")}>Shots</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("goalieStats.saves")}>Saves</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("goalieStats.allTimesavepercentage")}>Save %</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("goalieStats.spg")}>Shots per Game</th>
                            <th class="hover:cursor-pointer" on:click={() => sort("goalieStats.allTimegaa")}>GAA</th>
    
    
                            
                        </tr>
                    </thead>
                    <tbody>
                        {#each array as row}
                         {#if row.goalie}
                         <tr>
                            <td><a href="/stats/{row.uuid}" class="text-lg"><img src="https://minotar.net/armor/bust/{row.uuid}/300.png" alt="player avatar" class="rounded-sm w-8 h-8">{row.username}</a></td>
                            <td>{row.goalieStats.gp}</td>
                            <td>{row.goalieStats.wins}</td>
                            <td>{row.goalieStats.losses}</td>
                            <td>{row.goalieStats.winpercentage}%</td>
                            <td>{row.goalieStats.shots}</td>
                            <td>{row.goalieStats.saves}</td>
                            <td>{row.goalieStats.allTimesavepercentage}%</td>
                            <td>{row.goalieStats.spg}</td>
                            <td>{row.goalieStats.allTimegaa}</td>

    
                        </tr>
                         {/if}
                            
                        {/each}
                    </tbody>
                </table>
            </div>
        </TabItem>
    </Tabs>
    </div>
    

