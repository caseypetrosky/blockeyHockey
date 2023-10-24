import { c as create_ssr_component, e as escape } from "./ssr.js";
const BhlcutePlayerDisp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { player } = $$props;
  let goals = 0;
  let assists = 0;
  let gamesPlayed = 0;
  let shots = 0;
  let saves = 0;
  let savepercentage = 0;
  let gaa = 0;
  if (!player.goalie) {
    for (let i = 0; i < player.game_player_stats.length; i++) {
      goals += player.game_player_stats[i].goals_scored;
      assists += player.game_player_stats[i].assists;
      gamesPlayed++;
    }
  } else {
    for (let i = 0; i < player.game_goalie_stats.length; i++) {
      shots += player.game_goalie_stats[i].shots;
      saves += player.game_goalie_stats[i].saves;
      gamesPlayed++;
    }
  }
  savepercentage = saves / shots;
  gaa = goals / gamesPlayed;
  let points = goals + assists;
  let ppg = points / gamesPlayed;
  ppg = ppg.toFixed(2);
  savepercentage = savepercentage.toFixed(3);
  gaa = gaa.toFixed(2);
  if ($$props.player === void 0 && $$bindings.player && player !== void 0)
    $$bindings.player(player);
  return `<div class="m-2"><a href="${"/stats/" + escape(player.uuid, true)}" class="text-lg hover:text-accent-focus"><img href="${"/stats/" + escape(player.uuid, true)}" src="${"https://minotar.net/armor/bust/" + escape(player.uuid, true) + "/300.png"}" alt="player avatar" class="h-20 w-20"> ${escape(player.username)}</a> ${player.goalie ? `<h2 data-svelte-h="svelte-1gvudz1">Goalie</h2> <div class="grid justify-start"><div class="tooltip" data-tip="shots"><p class="text-xs">S: ${escape(shots)}</p></div> <div class="tooltip" data-tip="saves"><p class="text-xs">SV: ${escape(saves)}</p></div> <div class="tooltip" data-tip="save percentage"><p class="text-xs">SV%: ${escape(savepercentage)}</p></div> <div class="tooltip" data-tip="games played"><p class="text-xs">GP: ${escape(gamesPlayed)}</p></div> <div class="tooltip" data-tip="goals against average"><p class="text-xs">GAA: ${escape(gaa)}</p></div></div>` : `<h2 data-svelte-h="svelte-1omj1ii">Skater</h2> <div class="grid justify-start"><div class="tooltip" data-tip="goals"><p class="text-xs">G: ${escape(goals)}</p></div> <div class="tooltip" data-tip="assists"><p class="text-xs">A: ${escape(assists)}</p></div> <div class="tooltip" data-tip="points per game"><p class="text-xs">PPG: ${escape(ppg)}</p></div> <div class="tooltip" data-tip="games played"><p class="text-xs">GP: ${escape(gamesPlayed)}</p></div> <div class="tooltip" data-tip="points"><p class="text-xs">PTS: ${escape(points)}</p></div></div>`} <h2 data-svelte-h="svelte-zdcjc8">Contract</h2> <h2 class="text-xs">${escape(player.contractTier)}</h2> <h2 class="text-xs">$${escape(player.contractPrice)}</h2> <h2 class="text-xs">${escape(player.contractLength)} Season(s)</h2></div>`;
});
export {
  BhlcutePlayerDisp as B
};
