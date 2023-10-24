import { c as create_ssr_component } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="container py-4 mx-auto pb-10 text-white tabs " data-svelte-h="svelte-is2t4g"><a href="/leagues/namhl" class="tab tab-bordered tab-active text-2xl">League Info</a> <a href="/leagues/namhl/rosters" class="tab tab-bordered text-2xl ">Team Rosters</a> <a href="/leagues/namhl/standings" class="tab tab-bordered text-2xl">Standings</a> <a href="/leagues/namhl/namhlstats" class="tab tab-bordered text-2xl">Stats Leaderboard</a></div> <header class="text-white" data-svelte-h="svelte-10o2ycj"><div class="container mx-auto px-4"><h1 class="text-4xl font-bold">NAMHL</h1> <p class="text-lg mt-2">BHL Team Farm League</p></div></header> <div class="container mx-auto px-4" data-svelte-h="svelte-1qlox04"></div>`;
});
export {
  Page as default
};
