import { c as create_ssr_component, d as each, e as escape, a as add_attribute } from "../../../chunks/ssr.js";
/* empty css                                                       */const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="container mx-auto mt-10"><div><h1 class="text-2xl" data-svelte-h="svelte-1w88j9v">BHL Teams</h1> ${each(data.teams, (team) => {
    return `${team.leagueId == 1 ? `<a class="m-2 btn" href="${"/teams/" + escape(team.id, true)}"><img class="h-12 w-12 object-contain"${add_attribute("alt", team.id, 0)} src="${"/teamlogos/" + escape(team.id, true) + ".png"}">${escape(team.name)} </a>` : ``}`;
  })}</div> <br> <div><h1 class="text-2xl" data-svelte-h="svelte-wx1ilx">NAMHL Teams</h1> ${each(data.teams, (team) => {
    return `${team.leagueId == 2 ? `<a class="m-2 btn" href="${"/teams/" + escape(team.id, true)}"><img class="h-12 w-12 object-contain"${add_attribute("alt", team.id, 0)} src="${"/teamlogos/" + escape(team.id, true) + ".png"}">${escape(team.name)} </a>` : ``}`;
  })}</div> <br> <div><h1 class="text-2xl" data-svelte-h="svelte-1r8yjbj">JBHL Teams</h1> ${each(data.teams, (team) => {
    return `${team.leagueId == 3 ? `<a class="m-2 btn" href="${"/teams/" + escape(team.id, true)}"><img class="h-12 w-12 object-contain"${add_attribute("alt", team.id, 0)} src="${"/teamlogos/" + escape(team.id, true) + ".png"}">${escape(team.name)} </a>` : ``}`;
  })}</div></div>`;
});
export {
  Page as default
};
