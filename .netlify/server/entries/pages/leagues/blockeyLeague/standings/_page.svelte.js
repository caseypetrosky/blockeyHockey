import { c as create_ssr_component, d as each, e as escape } from "../../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let array;
  let { data } = $$props;
  let teamStats = [];
  for (let i = 0; i < data.team.length; i++) {
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
    for (let j = 0; j < data.team[i].game_team_stats.length; j++) {
      gamesPlayed++;
      if (data.team[i].game_team_stats[j].goals_scored > data.team[i].game_team_stats[j].goals_allowed) {
        wins++;
        points += 3;
      } else if (data.team[i].game_team_stats[j].goals_scored < data.team[i].game_team_stats[j].goals_allowed && !data.team[i].game_team_stats[j].is_overtime) {
        losses++;
      } else {
        otLosses++;
        points++;
      }
      goalsFor += data.team[i].game_team_stats[j].goals_scored;
      goalsAgainst += data.team[i].game_team_stats[j].goals_allowed;
    }
    if (gamesPlayed == 0) {
      gfa = 0;
      gaa = 0;
    } else {
      gfa = goalsFor / gamesPlayed;
      gaa = goalsAgainst / gamesPlayed;
    }
    goalDifference = goalsFor - goalsAgainst;
    teamStats.push({
      name: data.team[i].name,
      id: data.team[i].id,
      gfa,
      gaa,
      gamesPlayed,
      wins,
      losses,
      otLosses,
      points,
      goalDifference,
      goalsFor,
      goalsAgainst,
      color: data.team[i].color
    });
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  array = [...teamStats];
  return `<div class="container py-4 mx-auto text-white tabs" data-svelte-h="svelte-ku402g"><a href="/leagues/blockeyLeague" class="tab tab-bordered text-2xl">League Info</a> <a href="/leagues/blockeyLeague/rosters" class="tab tab-bordered text-2xl">Team Rosters</a> <a href="/leagues/blockeyLeague/standings" class="tab tab-bordered tab-active text-2xl">Standings</a> <a href="/leagues/blockeyLeague/bhlstats" class="tab tab-bordered text-2xl">Stats Leaderboard</a></div>  <div class="container mx-auto mt-10"><table class="table w-full text-white table-"><thead class="text-white"><tr><th data-svelte-h="svelte-1ccjcls">Rank</th> <th class="text-xl" data-svelte-h="svelte-m1gl1u">Team</th> <th class="text-xl hover:cursor-pointer" data-svelte-h="svelte-nryn35">GP</th> <th class="text-xl hover:cursor-pointer" data-svelte-h="svelte-1ipd0ey">Wins</th> <th class="text-xl hover:cursor-pointer" data-svelte-h="svelte-165bzb6">Losses</th> <th class="text-xl hover:cursor-pointer" data-svelte-h="svelte-1tbtpx0">OT Losses</th> <th class="text-xl text-yellow-400 hover:cursor-pointer" data-svelte-h="svelte-34tzop">Points</th> <th class="text-xl hover:cursor-pointer" data-svelte-h="svelte-an20mb">GD</th> <th class="text-xl hover:cursor-pointer" data-svelte-h="svelte-1i050lk">GF</th> <th class="text-xl hover:cursor-pointer" data-svelte-h="svelte-ck3to3">GA</th> <td class="text-xl hover:cursor-pointer" data-svelte-h="svelte-gi5d38">GFA</td> <td class="text-xl hover:cursor-pointer" data-svelte-h="svelte-vwya6e">GAA</td></tr></thead> <tbody>${each(array, (team, i) => {
    return `<tr><td>${escape(i + 1)}</td> <td class="text-2xl flex gap-2" style="${"background-color: " + escape(team.color, true) + "; background-opacity:50"}"><a href="${"/teams/" + escape(team.id, true)}">${escape(team.name)}</a> <img src="${"/teamlogos/" + escape(team.id, true) + ".png"}" class="h-12 w-12 object-contain" alt="Team Logo"></td> <td class="text-xl">${escape(team.gamesPlayed)}</td> <td class="text-xl">${escape(team.wins)}</td> <td class="text-xl">${escape(team.losses)}</td> <td class="text-xl">${escape(team.otLosses)}</td> <td class="text-xl">${escape(team.points)}</td> <td class="text-xl">${escape(team.goalDifference)}</td> <td class="text-xl">${escape(team.goalsFor)}</td> <td class="text-xl">${escape(team.goalsAgainst)}</td> <td class="text-xl">${escape(team.gfa.toFixed(2))}</td> <td class="text-xl">${escape(team.gaa.toFixed(2))}</td> </tr>`;
  })}</tbody></table></div>`;
});
export {
  Page as default
};
