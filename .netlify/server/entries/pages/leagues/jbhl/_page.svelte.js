import { c as create_ssr_component } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="container py-4 mx-auto pb-10 text-white tabs " data-svelte-h="svelte-16foi3u"><a href="/leagues/jbhl" class="tab tab-bordered tab-active text-2xl">League Info</a> <a href="/leagues/jbhl/rosters" class="tab tab-bordered text-2xl ">Team Rosters</a> <a href="/leagues/jbhl/standings" class="tab tab-bordered text-2xl">Standings</a> <a href="/leagues/jbhl/jbhlstats" class="tab tab-bordered text-2xl">Stats Leaderboard</a></div> <header class="text-white" data-svelte-h="svelte-avsp08"><div class="container mx-auto px-4"><h1 class="text-4xl font-bold">JBHL</h1> <p class="text-lg mt-2">Entry League</p></div></header> <div class="container mx-auto px-4" data-svelte-h="svelte-1qlox04"></div>`;
});
export {
  Page as default
};
