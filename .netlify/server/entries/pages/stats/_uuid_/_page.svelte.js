import { c as create_ssr_component, e as escape, v as validate_component, d as each } from "../../../../chunks/ssr.js";
/* empty css                                                          */import { T as Tabs, a as TabItem } from "../../../../chunks/Tabs.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  data.player.seasonsArray.forEach((season) => {
    if (season.playoffs.gp == void 0) {
      season.playoffs = {
        player: {
          gp: 0,
          goals: 0,
          assists: 0,
          points: 0,
          touches: 0,
          toi: 0,
          ppg: "0.00"
        }
      };
    }
    if (data.player.goalie && season.playoffs.goalie == void 0) {
      season.playoffs.goalie = {
        gp: 0,
        shots: 0,
        saves: 0,
        save_percentage: "0.00",
        goals_allowed: 0,
        shutouts: 0,
        gaa: "0.00"
      };
    }
    if (data.player.goalie) {
      let regularSavePercentage = parseFloat(season.regular.goalie.saves / season.regular.goalie.shots * 100).toFixed(2);
      season.regular.goalie.save_percentage = isNaN(regularSavePercentage) ? "0.00" : regularSavePercentage;
      let playoffsSavePercentage = parseFloat(season.playoffs.goalie.saves / season.playoffs.goalie.shots * 100).toFixed(2);
      season.playoffs.goalie.save_percentage = isNaN(playoffsSavePercentage) ? "0.00" : playoffsSavePercentage;
      let regularGAA = parseFloat(season.regular.goalie.goals_allowed / (season.regular.goalie.gp || 1)).toFixed(2);
      season.regular.goalie.gaa = isNaN(regularGAA) ? "0.00" : regularGAA;
      let playoffsGAA = parseFloat(season.playoffs.goalie.goals_allowed / (season.playoffs.goalie.gp || 1)).toFixed(2);
      season.playoffs.goalie.gaa = isNaN(playoffsGAA) ? "0.00" : playoffsGAA;
    } else {
      let regularPPG = parseFloat(season.regular.player.points / (season.regular.player.gp || 1)).toFixed(2);
      season.regular.player.ppg = isNaN(regularPPG) ? "0.00" : regularPPG;
      let playoffsPPG = parseFloat(season.playoffs.player.points / (season.playoffs.player.gp || 1)).toFixed(2);
      season.playoffs.player.ppg = isNaN(playoffsPPG) ? "0.00" : playoffsPPG;
    }
  });
  let ggp = 0;
  let agp = 0;
  let psp = 0;
  let gsp = 0;
  let asp = 0;
  let allTimePPG = 0;
  let winpercentage = 0;
  let allTimesavepercentage = 0;
  let spg = 0;
  let allTimegaa = 0;
  let alltimeSkater = {};
  let alltimeGoalie = {};
  alltimeSkater.goals = 0;
  alltimeSkater.assists = 0;
  alltimeSkater.games_played = 0;
  alltimeSkater.seasons_played = 0;
  alltimeSkater.points = 0;
  alltimeGoalie.seasons_played = 0;
  alltimeGoalie.games_played = 0;
  alltimeGoalie.wins = 0;
  alltimeGoalie.losses = 0;
  alltimeGoalie.shutouts = 0;
  alltimeGoalie.shots = 0;
  alltimeGoalie.goals_allowed = 0;
  alltimeGoalie.saves = 0;
  if (!data.player.goalie && data.player.allTimeSkaterStats[0] != null) {
    alltimeSkater = data.player.allTimeSkaterStats[0];
    alltimeSkater.points = alltimeSkater.goals + alltimeSkater.assists;
    ggp = parseFloat(alltimeSkater.goals / alltimeSkater.games_played).toFixed(2);
    agp = parseFloat(alltimeSkater.assists / alltimeSkater.games_played).toFixed(2);
    psp = parseFloat(alltimeSkater.points / alltimeSkater.seasons_played).toFixed(2);
    gsp = parseFloat(alltimeSkater.goals / alltimeSkater.seasons_played).toFixed(2);
    asp = parseFloat(alltimeSkater.assists / alltimeSkater.seasons_played).toFixed(2);
    allTimePPG = parseFloat(alltimeSkater.points / alltimeSkater.games_played).toFixed(2);
  }
  if (data.player.goalie) {
    alltimeGoalie = data.player.allTimeGoalieStats[0];
    winpercentage = parseFloat(alltimeGoalie.wins / alltimeGoalie.games_played * 100).toFixed(2);
    allTimesavepercentage = parseFloat(alltimeGoalie.saves / alltimeGoalie.shots * 100).toFixed(2);
    spg = parseFloat(alltimeGoalie.shots / alltimeGoalie.games_played).toFixed(2);
    allTimegaa = parseFloat(alltimeGoalie.goals_allowed / alltimeGoalie.games_played).toFixed(2);
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="container mx-auto mt-10"><div class="inline-flex"><img src="${"https://minotar.net/armor/bust/" + escape(data.player.uuid, true) + "/300.png"}" alt="player avatar" class="h-40 w-40 mr-4"> <div><h1 class="my-auto text-4xl">${escape(data.player.username)}</h1> <a class="hover:text-secondary-focus" href="${"../teams/" + escape(data.player.teamId, true)}">Team: ${escape(data.player.team.name)}</a> ${data.player.league_roles != null ? `<h2>Roles: ${escape(data.player.league_roles)}</h2>` : ``} <h2>Number: ${escape(data.player.number)}</h2> <h2 data-svelte-h="svelte-1qxk433">Current Contract Info</h2> <hr class="border-2 " style="${"border-color: " + escape(data.player.team.color, true)}"> <p class="text-xs">Contract Type: ${escape(data.player.contractTier)}</p> <p class="text-xs">Contract Price: $${escape(data.player.contractPrice)}</p> <p class="text-xs">Contract Length: ${escape(data.player.contractLength)}</p></div></div> <h2 class="text-2xl mt-4" data-svelte-h="svelte-u8ehy0">Stats</h2> <hr class="border-2 w-1/4" style="${"border-color: " + escape(data.player.team.color, true)}">  ${validate_component(Tabs, "Tabs").$$render($$result, { style: "pill", class: "mt-4 text-white" }, {}, {
    default: () => {
      return `${validate_component(TabItem, "TabItem").$$render($$result, { open: true, class: "text-white" }, {}, {
        title: () => {
          return `<span slot="title" data-svelte-h="svelte-y4org7">Seasonal League Stats</span>`;
        },
        default: () => {
          return ` ${validate_component(Tabs, "Tabs").$$render($$result, { style: "pill", class: "mt-4 text-white" }, {}, {
            default: () => {
              return ` ${validate_component(TabItem, "TabItem").$$render($$result, { open: true, class: "text-white" }, {}, {
                title: () => {
                  return `<span slot="title" data-svelte-h="svelte-6w6mpe">Regular Season</span>`;
                },
                default: () => {
                  return `${!data.player.goalie ? `<div class=""><h2 class="text-2xl" data-svelte-h="svelte-18hcv27">Seasonal League Stats</h2> <hr class="border-2 w-1/4 mb-4" style="${"border-color: " + escape(data.player.team.color, true)}"> <div class="overflow-x-auto"><table class="table-auto border-collapse w-full"><thead><tr class="text-sm font-medium text-left" style="${"border-bottom: 2px solid " + escape(data.player.team.color, true) + ";"}"><th class="" data-svelte-h="svelte-t6q4fi">Season</th> <th class="" data-svelte-h="svelte-1a18w4v">Games Played</th> <th class="" data-svelte-h="svelte-12jmhcp">Goals</th> <th class="" data-svelte-h="svelte-zabta1">Assists</th> <th class="" data-svelte-h="svelte-1ag11ww">Points</th> <th class="" data-svelte-h="svelte-txz75i">Touches</th> <th class="" data-svelte-h="svelte-1i4nwig">Time On Ice</th> <th class="" data-svelte-h="svelte-1spxeob">Points Per Game</th></tr></thead> ${each(data.player.seasonsArray, (season) => {
                    return `<tr class="text-sm font-normal "><td>${escape(season.id)}</td> <td class="">${escape(season.regular.player.gp)}</td> <td class="">${escape(season.regular.player.goals)}</td> <td class="">${escape(season.regular.player.assists)}</td> <td class="">${escape(season.regular.player.points)}</td> <td class="">${escape(season.regular.player.touches)}</td> <td class="">${escape(season.regular.player.toi)}</td> <td class="">${escape(season.regular.player.ppg)}</td> </tr>`;
                  })}</table></div></div>` : ``} ${data.player.goalie ? `<div class="p-8"><h2 class="text-2xl" data-svelte-h="svelte-2l3czs">S19 Goalie Stats</h2> <hr class="border-2 w-1/4 mb-4" style="${"border-color: " + escape(data.player.team.color, true)}"> <div class="overflow-x-auto"><table class="table-auto border-collapse w-full"><thead><tr class="text-sm font-medium text-left" style="${"border-bottom: 2px solid " + escape(data.player.team.color, true) + ";"}"><td data-svelte-h="svelte-12owllj">Season</td> <th class="" data-svelte-h="svelte-1a18w4v">Games Played</th> <th class="" data-svelte-h="svelte-nvhc00">Shots</th> <th class="" data-svelte-h="svelte-i0sibj">Saves</th> <th class="" data-svelte-h="svelte-v769sn">Save %</th> <th class="" data-svelte-h="svelte-1jjlzzd">Goals Allowed</th> <th class="" data-svelte-h="svelte-1bldljs">Shutouts</th> <th class="" data-svelte-h="svelte-eu0gv1">Goals Against Average</th></tr></thead> <tbody class="text-sm font-normal ">${each(data.player.seasonsArray, (season) => {
                    return `<tr class="text-sm font-normal "><td>${escape(season.id)}</td> <td class="">${escape(season.regular.player.gp)}</td> <td class="">${escape(season.regular.goalie.shots)}</td> <td class="">${escape(season.regular.goalie.saves)}</td> <td class="">${escape(season.regular.goalie.save_percentage)}%</td> <td class="">${escape(season.regular.goalie.goals_allowed)}</td> <td class="">${escape(season.regular.goalie.shutouts)}</td> <td class="">${escape(season.regular.goalie.gaa)}</td> </tr>`;
                  })}</tbody></table></div></div>` : ``}`;
                }
              })}  ${validate_component(TabItem, "TabItem").$$render($$result, { class: "text-white" }, {}, {
                title: () => {
                  return `<span slot="title" data-svelte-h="svelte-1oldg5">Playoffs</span>`;
                },
                default: () => {
                  return `${!data.player.goalie ? `<div class=""><h2 class="text-2xl" data-svelte-h="svelte-1kml7a1">Seasonal Playoff Stats</h2> <hr class="border-2 w-1/4 mb-4" style="${"border-color: " + escape(data.player.team.color, true)}"> <div class="overflow-x-auto"><table class="table-auto border-collapse w-full"><thead><tr class="text-sm font-medium text-left" style="${"border-bottom: 2px solid " + escape(data.player.team.color, true) + ";"}"><th class="" data-svelte-h="svelte-t6q4fi">Season</th> <th class="" data-svelte-h="svelte-1a18w4v">Games Played</th> <th class="" data-svelte-h="svelte-12jmhcp">Goals</th> <th class="" data-svelte-h="svelte-zabta1">Assists</th> <th class="" data-svelte-h="svelte-1ag11ww">Points</th> <th class="" data-svelte-h="svelte-txz75i">Touches</th> <th class="" data-svelte-h="svelte-1i4nwig">Time On Ice</th> <th class="" data-svelte-h="svelte-1spxeob">Points Per Game</th></tr></thead> ${each(data.player.seasonsArray, (season) => {
                    return `<tr class="text-sm font-normal "><td>${escape(season.id)}</td> <td class="">${escape(season.playoffs.player.gp)}</td> <td class="">${escape(season.playoffs.player.goals)}</td> <td class="">${escape(season.playoffs.player.assists)}</td> <td class="">${escape(season.playoffs.player.points)}</td> <td class="">${escape(season.playoffs.player.touches)}</td> <td class="">${escape(season.playoffs.player.toi)}</td> <td class="">${escape(season.playoffs.player.ppg)}</td> </tr>`;
                  })}</table></div></div>` : ``} ${data.player.goalie ? `<div class="p-8"><h2 class="text-2xl" data-svelte-h="svelte-2l3czs">S19 Goalie Stats</h2> <hr class="border-2 w-1/4 mb-4" style="${"border-color: " + escape(data.player.team.color, true)}"> <div class="overflow-x-auto"><table class="table-auto border-collapse w-full"><thead><tr class="text-sm font-medium text-left" style="${"border-bottom: 2px solid " + escape(data.player.team.color, true) + ";"}"><td data-svelte-h="svelte-12owllj">Season</td> <th class="" data-svelte-h="svelte-1a18w4v">Games Played</th> <th class="" data-svelte-h="svelte-nvhc00">Shots</th> <th class="" data-svelte-h="svelte-i0sibj">Saves</th> <th class="" data-svelte-h="svelte-v769sn">Save %</th> <th class="" data-svelte-h="svelte-1jjlzzd">Goals Allowed</th> <th class="" data-svelte-h="svelte-1bldljs">Shutouts</th> <th class="" data-svelte-h="svelte-eu0gv1">Goals Against Average</th></tr></thead> <tbody class="text-sm font-normal ">${each(data.player.seasonsArray, (season) => {
                    return `<tr class="text-sm font-normal "><td>${escape(season.id)}</td> <td class="">${escape(season.playoffs.player.gp)}</td> <td class="">${escape(season.playoffs.goalie.shots)}</td> <td class="">${escape(season.playoffs.goalie.saves)}</td> <td class="">${escape(season.playoffs.goalie.save_percentage)}%</td> <td class="">${escape(season.playoffs.goalie.goals_allowed)}</td> <td class="">${escape(season.playoffs.goalie.shutouts)}</td> <td class="">${escape(season.playoffs.goalie.gaa)}</td> </tr>`;
                  })}</tbody></table></div></div>` : ``}`;
                }
              })}`;
            }
          })}`;
        }
      })} ${validate_component(TabItem, "TabItem").$$render($$result, {}, {}, {
        title: () => {
          return `<span slot="title" data-svelte-h="svelte-1lvd9a8">All Time Stats</span>`;
        },
        default: () => {
          return `${!data.player.goalie ? `<div class="p-8"><h2 class="text-2xl mt-4" data-svelte-h="svelte-8orw9v">All time Career Stats s1-s18</h2> <hr class="border-2 w-1/4" style="${"border-color: " + escape(data.player.team.color, true)}"> <table><tr class="text-sm font-medium text-left" style="${"border-bottom: 2px solid " + escape(data.player.team.color, true) + ";"}"><th class="px-4 py-2" data-svelte-h="svelte-qs70jj">Seasons Played</th> <th class="px-4 py-2" data-svelte-h="svelte-9vqq24">Games Played</th> <th class="px-4 py-2" data-svelte-h="svelte-z8rsye">Goals</th> <th class="px-4 py-2" data-svelte-h="svelte-w843ue">Assists</th> <th class="px-4 py-2" data-svelte-h="svelte-lz70qd">Points</th> <th class="px-4 py-2" data-svelte-h="svelte-ifg8xh">Goals Per Game</th> <th class="px-4 py-2" data-svelte-h="svelte-ri27et">Assists Per Game</th> <th class="px-4 py-2" data-svelte-h="svelte-f34bns">Points Per Game</th> <th class="px-4 py-2" data-svelte-h="svelte-n6z2yi">Goals Per Season</th> <th class="px-4 py-2" data-svelte-h="svelte-85pqzu">Assists Per Season</th> <th class="px-4 py-2" data-svelte-h="svelte-1lzfgyp">Points Per Season</th></tr> <tbody><td class="px-4 py-2">${escape(alltimeSkater.seasons_played)}</td> <td class="px-4 py-2">${escape(alltimeSkater.games_played)}</td> <td class="px-4 py-2">${escape(alltimeSkater.goals)}</td> <td class="px-4 py-2">${escape(alltimeSkater.assists)}</td> <td class="px-4 py-2">${escape(alltimeSkater.points)}</td> <td class="px-4 py-2">${escape(ggp)}</td> <td class="px-4 py-2">${escape(agp)}</td> <td class="px-4 py-2">${escape(allTimePPG)}</td> <td class="px-4 py-2">${escape(gsp)}</td> <td class="px-4 py-2">${escape(asp)}</td> <td class="px-4 py-2">${escape(psp)}</td></tbody></table></div>` : ``} ${data.player.goalie ? `<div class="p-8"><h2 class="text-2xl mt-4" data-svelte-h="svelte-1fhslv2">All time Goalie Stats s1-s18</h2> <hr class="border-2 w-1/4" style="${"border-color: " + escape(data.player.team.color, true)}"> <table><tr class="text-sm font-medium text-left" style="${"border-bottom: 2px solid " + escape(data.player.team.color, true) + ";"}"><th class="px-4 py-2" data-svelte-h="svelte-qs70jj">Seasons Played</th> <th class="px-4 py-2" data-svelte-h="svelte-9vqq24">Games Played</th> <th class="px-4 py-2" data-svelte-h="svelte-zzjs85">Wins</th> <th class="px-4 py-2" data-svelte-h="svelte-1p91yih">Losses</th> <th class="px-4 py-2" data-svelte-h="svelte-18ueccd">Win %</th> <th class="px-4 py-2" data-svelte-h="svelte-1v7bve5">Shutouts</th> <th class="px-4 py-2" data-svelte-h="svelte-1nt1ljg">Shots Faced</th> <th class="px-4 py-2" data-svelte-h="svelte-1cb3jd2">Goals Allowed</th> <th class="px-4 py-2" data-svelte-h="svelte-1qp5wm4">Saves</th> <th class="px-4 py-2" data-svelte-h="svelte-4w83lw">Save %</th> <th class="px-4 py-2" data-svelte-h="svelte-tfziia">Shots Per Game</th> <th class="px-4 py-2" data-svelte-h="svelte-1xu5d56">Goals Against Average</th></tr> <tbody><td class="px-4 py-2">${escape(alltimeGoalie.seasons_played)}</td> <td class="px-4 py-2">${escape(alltimeGoalie.games_played)}</td> <td class="px-4 py-2">${escape(alltimeGoalie.wins)}</td> <td class="px-4 py-2">${escape(alltimeGoalie.losses)}</td> <td class="px-4 py-2">${escape(winpercentage)}%</td> <td class="px-4 py-2">${escape(alltimeGoalie.shutouts)}</td> <td class="px-4 py-2">${escape(alltimeGoalie.shots)}</td> <td class="px-4 py-2">${escape(alltimeGoalie.goals_allowed)}</td> <td class="px-4 py-2">${escape(alltimeGoalie.saves)}</td> <td class="px-4 py-2">${escape(allTimesavepercentage)}%</td> <td class="px-4 py-2">${escape(spg)}</td> <td class="px-4 py-2">${escape(allTimegaa)}</td></tbody></table></div>` : ``}`;
        }
      })}`;
    }
  })}  <h2 class="text-2xl mt-4" data-svelte-h="svelte-pv17pf">Awards</h2> <hr class="border-2 w-1/4" style="${"border-color: " + escape(data.player.team.color, true)}"> ${data.player.awards != null ? `<h2>${escape(data.player.awards)}</h2>` : ``} </div>`;
});
export {
  Page as default
};
