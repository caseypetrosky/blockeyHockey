import { c as create_ssr_component, d as each, e as escape, v as validate_component } from "../../../../../chunks/ssr.js";
import { C as CutePlayerDisp } from "../../../../../chunks/cutePlayerDisp.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="container py-4 mx-auto text-white tabs " data-svelte-h="svelte-1c369bi"><a href="/leagues/jbhl" class="tab tab-bordered text-2xl">League Info</a> <a href="/leagues/jbhl/rosters" class="tab tab-bordered tab-active text-2xl ">Team Rosters</a> <a href="/leagues/jbhl/standings" class="tab tab-bordered text-2xl">Standings</a> <a href="/leagues/jbhl/jbhlstats" class="tab tab-bordered text-2xl">Stats Leaderboard</a></div> <header class="text-white" data-svelte-h="svelte-14n3l1s"><div class="container mx-auto px-4"><h1 class="text-4xl font-bold">Current JBHL Rosters</h1></div></header> <div class="container mx-auto px-4">${each(data.team, (t) => {
    return `<div class="flex gap-2"><a href="${"/teams/" + escape(t.id, true)}" class="text-4xl font-bold">${escape(t.name)}</a> <img src="${"/teamlogos/" + escape(t.id, true) + ".png"}" class="h-12 w-12 object-contain" alt="Team Logo"></div> <hr class="border-2 w-full" style="${"border-color: " + escape(t.color, true)}"> <div class="grid lg:grid-cols-10 md:grid-cols-5 sm:grid-cols-5 grid-cols-3">${t.players.length ? each(t.players, (player) => {
      return `${validate_component(CutePlayerDisp, "CutePlayerDisp").$$render($$result, { player }, {}, {})}`;
    }) : `<h2 data-svelte-h="svelte-18f3mv3">No players</h2>`} </div>`;
  })}</div>`;
});
export {
  Page as default
};
