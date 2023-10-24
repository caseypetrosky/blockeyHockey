import { c as create_ssr_component, v as validate_component, d as each, e as escape } from "../../../../chunks/ssr.js";
/* empty css                                                          */import { T as Tabs, a as TabItem } from "../../../../chunks/Tabs.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let array = [...data.player];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="container py-4 mx-auto text-white tabs " data-svelte-h="svelte-gvm4go"><a href="/stats" class="tab tab-bordered text-2xl">Player Page Search</a> <a href="/stats/leaderboard" class="tab tab-bordered tab-active text-2xl ">All time leaderboards</a></div> <div class="container mx-auto text-white">${validate_component(Tabs, "Tabs").$$render($$result, { style: "pill", class: "mt-4 text-white " }, {}, {
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
            return `<div class="overflow-x-auto text-white"><h1 class="text-3xl font-bold text-center" data-svelte-h="svelte-15b89qf">All Time BHL Skater Leaderboard</h1> <table class="table table-"><thead><tr><th data-svelte-h="svelte-1ccjcls">Rank</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1oc5v5v">Username</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1tjih9d">Seasons Played</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-3v1rdc">Games Played</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-e5zjc7">Goals</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1lmpidf">Assists</th> <th class="hover:cursor-pointer text-yellow-400" data-svelte-h="svelte-1o57a42">Points</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1hfydki">Goals Per Game</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-19wh73k">Assists Per Game</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-bqfdg8">Points Per Game</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1xoqwxp">Goals Per Season</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-18ggqhn">Assists Per Season</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1yad16b">Points Per Season</th></tr></thead> <tbody>${each(array, (row, i) => {
              return `<tr><td>${escape(i + 1)}</td> <td><a href="${"/stats/" + escape(row.uuid, true)}" class="text-lg"><img src="${"https://minotar.net/armor/bust/" + escape(row.uuid, true) + "/300.png"}" alt="player avatar" class="rounded-sm w-8 h-8">${escape(row.username)}</a></td> <td>${escape(row.skaterStats.sp)}</td> <td>${escape(row.skaterStats.gp)}</td> <td>${escape(row.skaterStats.goals)}</td> <td>${escape(row.skaterStats.assists)}</td> <td>${escape(row.skaterStats.points)}</td> <td>${escape(row.skaterStats.ggp)}</td> <td>${escape(row.skaterStats.agp)}</td> <td>${escape(row.skaterStats.allTimePPG)}</td> <td>${escape(row.skaterStats.gsp)}</td> <td>${escape(row.skaterStats.asp)}</td> <td>${escape(row.skaterStats.psp)}</td> </tr>`;
            })}</tbody></table></div>`;
          }
        }
      )} ${validate_component(TabItem, "TabItem").$$render($$result, { title: "Goalie Stats Leaderboard" }, {}, {
        default: () => {
          return `<div class="overflow-x-auto container mx-auto text-white"><h1 class="text-3xl font-bold text-center" data-svelte-h="svelte-667djm">All Time BHL Goalie Leaderboard</h1> <table class="table"><thead><tr><th class="hover:cursor-pointer" data-svelte-h="svelte-1oc5v5v">Username</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-19qpm0j">Games Played</th> <th class="hover:cursor-pointer text-yellow-400" data-svelte-h="svelte-y96n1">Wins</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-55gsog">Losses</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-8wmqo9">Win %</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1daede6">Shots</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1honcg">Saves</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1f2uf1p">Save %</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-1oh8rl0">Shots per Game</th> <th class="hover:cursor-pointer" data-svelte-h="svelte-j5oe34">GAA</th></tr></thead> <tbody>${each(array, (row) => {
            return `${row.goalie ? `<tr><td><a href="${"/stats/" + escape(row.uuid, true)}" class="text-lg"><img src="${"https://minotar.net/armor/bust/" + escape(row.uuid, true) + "/300.png"}" alt="player avatar" class="rounded-sm w-8 h-8">${escape(row.username)}</a></td> <td>${escape(row.goalieStats.gp)}</td> <td>${escape(row.goalieStats.wins)}</td> <td>${escape(row.goalieStats.losses)}</td> <td>${escape(row.goalieStats.winpercentage)}%</td> <td>${escape(row.goalieStats.shots)}</td> <td>${escape(row.goalieStats.saves)}</td> <td>${escape(row.goalieStats.allTimesavepercentage)}%</td> <td>${escape(row.goalieStats.spg)}</td> <td>${escape(row.goalieStats.allTimegaa)}</td> </tr>` : ``}`;
          })}</tbody></table></div>`;
        }
      })}`;
    }
  })}</div>`;
});
export {
  Page as default
};
