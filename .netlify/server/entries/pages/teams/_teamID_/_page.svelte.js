import { c as create_ssr_component, a as add_attribute, e as escape, d as each, v as validate_component } from "../../../../chunks/ssr.js";
import { C as CutePlayerDisp } from "../../../../chunks/cutePlayerDisp.js";
import { B as BhlcutePlayerDisp } from "../../../../chunks/bhlcutePlayerDisp.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let teamImg = `/teamlogos/${data.team.id}.png`;
  `/src/static/logos/${data.team.id}rink.png`;
  let teamPlayers = data.players;
  let teamColor = data.team.color;
  let wins = 0;
  let losses = 0;
  let otLosses = 0;
  for (let i = 0; i < data.team.game_team_stats.length; i++) {
    if (data.team.game_team_stats[i].goals_scored > data.team.game_team_stats[i].goals_allowed) {
      wins++;
    } else if (data.team.game_team_stats[i].goals_scored < data.team.game_team_stats[i].goals_allowed && !data.team.game_team_stats[i].is_overtime) {
      losses++;
    } else {
      otLosses++;
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="container mx-auto mt-10"><div class="inline-flex"><img${add_attribute("src", teamImg, 0)} alt="team logo" class="h-40 w-40 mr-4"> <div><h1 class="my-auto text-4xl">${escape(data.team.name)}</h1> <h2>Owner: ${escape(data.team.team_owner)}</h2> <h2>League: ${escape(data.league.name)}</h2> ${data.team.championships != null ? `<h3>Championships: ${escape(data.team.championships)}</h3>` : ``} <div class="text-xs">${data.team.leagueId == 1 ? `<h3>Cap Space: $${escape(data.team.capSpace)}</h3> <h3>Cap Hit: $${escape(data.team.totalSalary)}</h3> <h3>Remaining Cap: $${escape(data.team.capHit)}</h3>` : ``}</div> <h2 class="text-xl" data-svelte-h="svelte-3zajxm">Record</h2> <p>${escape(wins)}-${escape(losses)}-${escape(otLosses)}</p></div></div> <h2 class="text-2xl mt-4" data-svelte-h="svelte-11kn6f3">Description</h2> <hr class="border-2 w-1/4" style="${"border-color: " + escape(teamColor, true)}"> <p>${escape(data.team.description)}</p> <h2 class="text-2xl mt-4" data-svelte-h="svelte-1vumkeq">Roster</h2> <hr class="border-2 w-1/4" style="${"border-color: " + escape(teamColor, true)}"> <div class="grid lg:grid-cols-10 md:grid-cols-5 sm:grid-cols-5 grid-cols-3">${teamPlayers.length > 0 ? `${data.team.leagueId == 1 ? `${each(teamPlayers, (player) => {
    return `${validate_component(BhlcutePlayerDisp, "BHLCutePlayerDisp").$$render($$result, { player }, {}, {})}`;
  })}` : `${each(teamPlayers, (player) => {
    return `${validate_component(CutePlayerDisp, "CutePlayerDisp").$$render($$result, { player }, {}, {})}`;
  })}`}` : `<h1 data-svelte-h="svelte-b400hi">This team has no players</h1>`}</div> <h2 class="text-2xl mt-4" data-svelte-h="svelte-1l9cfhy">Recent games (Oldest To Newest)</h2> <hr class="border-2 w-1/4" style="${"border-color: " + escape(teamColor, true)}"> <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">${each(data.games, (game) => {
    return `<div class="flex gap-2 border-2 max-w-xs m-2 p-2" style="${"border-color:" + escape(teamColor, true)}">${game.home_teamId == data.team.id ? `<div><p>Home game vs ${escape(game.away_teamId)}</p> ${game.is_playoff ? `<p class="text-yellow-500" data-svelte-h="svelte-b9vj8u">Playoff Game</p>` : `<p class="" data-svelte-h="svelte-b0wi90">Regular Season Game</p>`} ${game.home_team.game_team_stats[0].goals_scored > game.home_team.game_team_stats[0].goals_allowed ? `<p class="text-xl text-green-500" data-svelte-h="svelte-1fqzb6m">Win</p>` : `${game.home_team.game_team_stats[0].goals_scored < game.home_team.game_team_stats[0].goals_allowed && !game.is_overtime ? `<p class="text-xl text-red-500" data-svelte-h="svelte-cq1szr">Loss</p>` : `<p class="text-xl text-white" data-svelte-h="svelte-6hdghm">Overtime Loss</p>`}`} </div>` : `<div><p>Away game @ ${escape(game.home_teamId)}</p> ${game.is_playoff ? `<p class="text-yellow-500" data-svelte-h="svelte-b9vj8u">Playoff Game</p>` : `<p class="" data-svelte-h="svelte-1wwsnny">Regular Season Game</p>`} ${game.away_team.game_team_stats[0].goals_scored > game.away_team.game_team_stats[0].goals_allowed ? `<p class="text-xl text-green-500" data-svelte-h="svelte-1fqzb6m">Win</p>` : `${game.away_team.game_team_stats[0].goals_scored < game.away_team.game_team_stats[0].goals_allowed && !game.is_overtime ? `<p class="text-xl text-red-500" data-svelte-h="svelte-cq1szr">Loss</p>` : `<p class="text-xl text-white" data-svelte-h="svelte-6hdghm">Overtime Loss</p>`}`} </div>`} <div class=""><div class="flex"><img src="${"/teamlogos/" + escape(game.home_team.id, true) + ".png"}" alt="hometeam img" class="h-12 w-12 mr-2"> <p>${escape(game.home_teamId)} - ${escape(game.home_team.game_team_stats[0].goals_scored)}</p> </div><div class="flex"><img src="${"/teamlogos/" + escape(game.away_team.id, true) + ".png"}" alt="hometeam img" class="h-12 w-12 mr-2"> <p>${escape(game.away_teamId)} - ${escape(game.away_team.game_team_stats[0].goals_scored)}</p> </div></div> </div>`;
  })}</div></div> `;
});
export {
  Page as default
};
