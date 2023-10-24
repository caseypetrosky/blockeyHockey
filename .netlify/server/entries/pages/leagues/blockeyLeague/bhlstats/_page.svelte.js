import { c as create_ssr_component, v as validate_component, d as each, e as escape } from "../../../../../chunks/ssr.js";
/* empty css                                                             */import { T as Tabs, a as TabItem } from "../../../../../chunks/Tabs.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let array = [...data.player];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="container py-4 mx-auto text-white tabs " data-svelte-h="svelte-1d0fn6e"><a href="/leagues/blockeyLeague" class="tab tab-bordered text-2xl">League Info</a> <a href="/leagues/blockeyLeague/rosters" class="tab tab-bordered text-2xl ">Team Rosters</a> <a href="/leagues/blockeyLeague/standings" class="tab tab-bordered text-2xl">Standings</a> <a href="/leagues/blockeyLeague/bhlstats" class="tab tab-bordered tab-active text-2xl">Stats Leaderboard</a></div> <div class="container mx-auto text-white">${validate_component(Tabs, "Tabs").$$render($$result, { style: "pill", class: "mt-4 text-white " }, {}, {
    default: () => {
      return `${validate_component(TabItem, "TabItem").$$render(
        $$result,
        {
          open: true,
          title: "Skater Stats Leaderboard"
        },
        {},
        {
          default: () => {
            return `<div class="overflow-x-auto text-white"><h1 class="text-3xl font-bold text-center" data-svelte-h="svelte-h4ed3f">S19 Skater Stats Leaderboard</h1> <table class="table table-"><thead><tr><th data-svelte-h="svelte-1ccjcls">Rank</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1oc5v5v">Username</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-3v1rdc">Games Played</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-e5zjc7">Goals</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1lmpidf">Assists</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1y4v9g7">Points</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-zz8ot1">Touches</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1krb04c">Time On Ice</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1mv0ms">Points per Game</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-bonsg4">Goals per Game</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-13tilv2">Points per 15mins</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-13benky">Goals per 15mins</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-s5fzzc">Touches per 15mins</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-aq5fst">Touches per Goal</th></tr></thead> <tbody>${each(array, (row, i) => {
              return `<tr><td>${escape(i + 1)}</td> <td><a href="${"/stats/" + escape(row.uuid, true)}" class="text-lg"><img src="${"https://minotar.net/armor/bust/" + escape(row.uuid, true) + "/300.png"}" alt="player avatar" class="rounded-sm w-8 h-8">${escape(row.username)}</a></td> <td>${escape(row.skaterStats.gp)}</td> <td>${escape(row.skaterStats.goals)}</td> <td>${escape(row.skaterStats.assists)}</td> <td>${escape(row.skaterStats.points)}</td> <td>${escape(row.skaterStats.touches)}</td> <td>${escape(row.skaterStats.toi)}</td> <td>${escape(row.skaterStats.ppg)}</td> <td>${escape(row.skaterStats.gpg)}</td> <td>${escape(row.skaterStats.pp15)}</td> <td>${escape(row.skaterStats.gp15)}</td> <td>${escape(row.skaterStats.toup15)}</td> <td>${escape(row.skaterStats.toupg)}</td> </tr>`;
            })}</tbody></table></div>`;
          }
        }
      )} ${validate_component(TabItem, "TabItem").$$render($$result, { title: "Goalie Stats Leaderboard" }, {}, {
        default: () => {
          return `<div class="overflow-x-auto container mx-auto text-white"><h1 class="text-3xl font-bold text-center" data-svelte-h="svelte-1lt8254">S19 Goalie Stats Leaderboard</h1> <table class="table"><thead><tr><th class="hover:cursor-pointer" data-svelte-h="svelte-1oc5v5v">Username</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-19qpm0j">Games Played</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1daede6">Shots</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1honcg">Saves</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-h30xl2">Goals Against</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1545e2d">Save %</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1elsvq">GAA</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-ow8gzz">Time On Ice</th></tr></thead> <tbody>${each(array, (row) => {
            return `${row.goalie ? `<tr><td><a href="${"/stats/" + escape(row.uuid, true)}" class="text-lg"><img src="${"https://minotar.net/armor/bust/" + escape(row.uuid, true) + "/300.png"}" alt="player avatar" class="rounded-sm w-8 h-8">${escape(row.username)}</a></td> <td>${escape(row.goalieStats.gp)}</td> <td>${escape(row.goalieStats.shots)}</td> <td>${escape(row.goalieStats.saves)}</td> <td>${escape(row.goalieStats.goals_allowed)}</td> <td>${escape(row.goalieStats.savepercentage)}%</td> <td>${escape(row.goalieStats.gaa)}</td> <td>${escape(row.goalieStats.toi)}</td> </tr>` : ``}`;
          })}</tbody></table></div>`;
        }
      })}`;
    }
  })}</div>`;
});
export {
  Page as default
};
