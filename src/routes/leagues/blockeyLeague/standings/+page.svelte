<script>
	import { page } from '$app/stores';
  import { onMount } from 'svelte';
  export let data;
  //determine how many wins loses and ot loses a team has and make a dictionary of each team and these Stats
  //then sort the dictionary by points and display the standings
  let teamStats = [];
  for(let i = 0; i < data.team.length; i++){
    let wins = 0;
    let losses = 0;
    let otLosses = 0;
    let points = 0;
    let goalDifference = 0;
    let goalsFor = 0;
    let goalsAgainst = 0;
    let gamesPlayed = 0;
    let gfa = 0;
    let gaa = 0;

    for(let j = 0; j < data.team[i].game_team_stats.length; j++){
      gamesPlayed++;
      if(data.team[i].game_team_stats[j].goals_scored > data.team[i].game_team_stats[j].goals_allowed){
        wins++;
        points += 3;
      }
      else if(data.team[i].game_team_stats[j].goals_scored < data.team[i].game_team_stats[j].goals_allowed && !data.team[i].game_team_stats[j].is_overtime){
        losses++;
      }
      else{
        otLosses++;
        points++;
      }
      goalsFor += data.team[i].game_team_stats[j].goals_scored;
      goalsAgainst += data.team[i].game_team_stats[j].goals_allowed;
    }
    if(gamesPlayed == 0){
      gfa =0;
      gaa=0;
    }
    else{
      gfa = goalsFor / gamesPlayed;
    gaa = goalsAgainst / gamesPlayed;
    }
    goalDifference = goalsFor - goalsAgainst;
    
    teamStats.push({
      name: data.team[i].name,
      id: data.team[i].id,
      gfa: gfa,
      gaa: gaa,
      gamesPlayed: gamesPlayed,
      wins: wins,
      losses: losses,
      otLosses: otLosses,
      points: points,
      goalDifference: goalDifference,
      goalsFor: goalsFor,
      goalsAgainst: goalsAgainst,
      color: data.team[i].color
    });
  }

$: array = [...teamStats];
  
let sortBy = {col:"gp", ascending: false};

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
		sort("points");
		sort("points");

	});
  
</script>

<div class="container py-4 mx-auto text-white tabs">
  <a href="/leagues/blockeyLeague" class="tab tab-bordered text-2xl"
    >League Info</a
  >
  <a href="/leagues/blockeyLeague/rosters" class="tab tab-bordered text-2xl"
    >Team Rosters</a
  >
  <a
    href="/leagues/blockeyLeague/standings"
    class="tab tab-bordered tab-active text-2xl">Standings</a
  >
  <a href="/leagues/blockeyLeague/bhlstats" class="tab tab-bordered text-2xl"
    >Stats Leaderboard</a
  >
</div>
<!--A  standings table team with wins loses overtime loses points goal difference goals for goals against that can be sorted by each colunn with poionts sorted first-->
<div class="container mx-auto mt-10">
  <table class="table w-full text-white table-">
    <thead class="text-white">
      <tr>
        <th>Rank</th>
        <th class="text-xl">Team</th>
        <th class="text-xl hover:cursor-pointer" on:click={() => sort( 'gamesPlayed')}>GP</th>
        <th class="text-xl hover:cursor-pointer" on:click={() => sort('wins')}>Wins</th>
        <th class="text-xl hover:cursor-pointer" on:click={() => sort('losses')}>Losses</th>
        <th class="text-xl hover:cursor-pointer" on:click={() => sort('otLosses')}>OT Losses</th>
        <th class="text-xl text-yellow-400 hover:cursor-pointer" on:click={() => sort('points')}>Points</th>
        <th class="text-xl hover:cursor-pointer" on:click={() => sort('goalDifference')}>GD</th>
        <th class="text-xl hover:cursor-pointer" on:click={() => sort('goalsFor')}>GF</th>
        <th class="text-xl hover:cursor-pointer" on:click={() => sort('goalsAgainst')}>GA</th>
        <td class="text-xl hover:cursor-pointer" on:click={() => sort('gfa')}>GFA</td>
        <td class="text-xl hover:cursor-pointer" on:click={() => sort('gaa')}>GAA</td>
      </tr>
    </thead>
    <tbody>
      {#each array as team, i}
        <tr>
					<td>{i +1}</td>
          <td class="text-2xl flex gap-2" style="background-color: {team.color}; background-opacity:50">
            <a href="/teams/{team.id}">{team.name}</a>
            <img src="/teamlogos/{team.id}.png" class="h-12 w-12 object-contain" alt="Team Logo" />
          </td>
          <td class="text-xl">{team.gamesPlayed}</td>
          <td class="text-xl">{team.wins}</td>
          <td class="text-xl">{team.losses}</td>
          <td class="text-xl">{team.otLosses}</td>
          <td class="text-xl">{team.points}</td>
          <td class="text-xl">{team.goalDifference}</td>
          <td class="text-xl">{team.goalsFor}</td>
          <td class="text-xl">{team.goalsAgainst}</td>
          <td class="text-xl">{team.gfa.toFixed(2)}</td>
          <td class="text-xl">{team.gaa.toFixed(2)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

