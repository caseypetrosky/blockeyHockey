import { c as create_ssr_component, v as validate_component, d as each, e as escape } from "../../../../../chunks/ssr.js";
/* empty css                                                             */import { S as Search } from "../../../../../chunks/Search.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".grid.svelte-ml42up{display:grid;grid-template-columns:repeat(auto-fill, minmax(200px, 1fr))}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredPlayers;
  let { data } = $$props;
  let search = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    filteredPlayers = search ? data.players.filter((player) => player.username.toLowerCase().includes(search.toLowerCase())) : data.players;
    $$rendered = `<div class="container mx-auto mt-4 gap-4 text-white"><div class="flex gap-4" data-svelte-h="svelte-jfer8g"><a href="/admin/panel" class="text-3xl font-semibold text-gray-900 dark:text-white ">Admin Panel</a> <h1 class="text-3xl font-semibold text-gray-900 dark:text-white underline">Player editing table</h1></div> <br>  ${validate_component(Search, "Search").$$render(
      $$result,
      {
        size: "lg",
        class: "flex gap-2 items-center",
        placeholder: "Search for player by username",
        value: search
      },
      {
        value: ($$value) => {
          search = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="grid gap-4 mt-4 svelte-ml42up">${each(filteredPlayers, (player) => {
      return `<a href="${"./playerUpdate/" + escape(player.uuid, true)}"><div class="flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-lg"><div class="flex-shrink-0"><img src="${"https://minotar.net/armor/bust/" + escape(player.uuid, true) + "/300.png"}" alt="player avatar" class="rounded-sm w-8 h-8"></div> <div class="flex-grow"><h1 class="text-lg font-semibold">${escape(player.username)}</h1></div> </div></a>`;
    })}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
