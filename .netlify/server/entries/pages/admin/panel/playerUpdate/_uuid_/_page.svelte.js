import { c as create_ssr_component, s as subscribe, b as set_store_value, a as add_attribute, e as escape, d as each, f as add_classes } from "../../../../../../chunks/ssr.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { s as superForm } from "../../../../../../chunks/SuperDebug.svelte_svelte_type_style_lang.js";
import { z } from "zod";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $form, $$unsubscribe_form;
  let $message, $$unsubscribe_message;
  let $errors, $$unsubscribe_errors;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  const playerSchema = z.object({
    username: z.string(),
    number: z.number().min(0).max(99),
    teamId: z.string().min(1).max(4),
    goalie: z.boolean(),
    awards: z.string(),
    league_roles: z.string(),
    contractTier: z.enum(["Pro", "Superstar", "Amateur"]),
    contractLength: z.number().min(1).max(3),
    contractPrice: z.number().min(1500).max(15e3)
  });
  const { form, errors, enhance, message } = superForm(data.form, {
    dataType: "json",
    validators: playerSchema,
    // On ActionResult error, render the nearest +error.svelte page
    onError: "apply",
    // No message when navigating away from a modified form
    taintedMessage: null,
    multipleSubmits: "prevent"
  });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$unsubscribe_message = subscribe(message, (value) => $message = value);
  let contractTypes = [
    { value: "Superstar", name: "Superstar" },
    { value: "Pro", name: "Pro" },
    { value: "Amateur", name: "Amateur" }
  ];
  let lengths = [
    { value: 1, name: "1 season" },
    { value: 2, name: "2 seasons" },
    { value: 3, name: "3 seasons" }
  ];
  set_store_value(form, $form.uuid = $page.params.uuid, $form);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_page();
  $$unsubscribe_form();
  $$unsubscribe_message();
  $$unsubscribe_errors();
  return `${$message ? `<h3${add_classes(($page.status >= 400 ? "invalid" : "").trim())}>${escape($message)}</h3>` : ``} <div class="flex justify-center" data-svelte-h="svelte-ksjl9m"><a class="btn btn-primary my-4 w-full max-w-xs" href="/admin/panel/playerUpdate">Back to Admin Panel</a></div>  <div class="flex justify-center"><form method="POST" action="?/updatePlayerForm"><h3 class="my-4 text-xl font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-154ukog">Edit the selected player</h3> <div class="form-control w-full max-w-xs"><label class="label text-white" for="username" data-svelte-h="svelte-wyod9i">Username</label> <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="username" placeholder="Username" required${add_attribute("value", $form.username, 0)}> ${$errors.username ? `<small class="text-red-500">${escape($errors.username)}</small>` : ``}</div> <div class="form-control w-full max-w-xs"><label class="label text-white" for="number" data-svelte-h="svelte-emwg8u">Number</label> <input class="input input-bordered input-accent w-full max-w-xs" type="number" name="number" placeholder="Number" required${add_attribute("value", $form.number, 0)}> ${$errors.number ? `<small class="text-red-500">${escape($errors.number)}</small>` : ``}</div> <div class="w-full max-w-xs"><label for="teamId" data-svelte-h="svelte-1j59yqs">Team ID</label> <select class="select select-accent w-full max-w-xs" name="teamId">${each(data.teams, (team) => {
    return `<option${add_attribute("value", team.id, 0)}>${escape(team.name)}</option>`;
  })}</select> ${$errors.teamId ? `<small class="text-red-500">${escape($errors.teamId)}</small>` : ``}</div> <div class="w-full max-w-xs form-control"><label class="label text-white cursor-pointer" for="goalie"><span class="label-text" data-svelte-h="svelte-1lpv39b">Is this player a goalie?</span> <input name="goalie" type="checkbox" class="checkbox"${add_attribute("checked", $form.goalie, 1)}></label> ${$errors.goalie ? `<small class="text-red-500">${escape($errors.goalie)}</small>` : ``}</div> <div class="w-full max-w-xs form-control"><label for="awards" data-svelte-h="svelte-1401xlf">Player awards</label> <textarea class="textarea textarea-accent w-full max-w-xs" type="text" name="awards" placeholder="Player Awards" required>${escape($form.awards || "")}</textarea> ${$errors.awards ? `<small class="text-red-500">${escape($errors.awards)}</small>` : ``}</div> <div class="w-full max-w-xs form-control"><label for="roles" data-svelte-h="svelte-16pzj8l">Player roles</label> <textarea class="textarea textarea-accent w-full max-w-xs" type="text" name="Roles" placeholder="Player Roles" required>${escape($form.league_roles || "")}</textarea> ${$errors.league_roles ? `<small class="text-red-500">${escape($errors.league_roles)}</small>` : ``}</div> <div class="w-full max-w-xs"><label for="contractPrice" data-svelte-h="svelte-1vsgl3y">Contract Price</label> <input class="input input-bordered input-accent w-full max-w-xs" type="number" name="contractPrice" placeholder="Contract Price" required${add_attribute("value", $form.contractPrice, 0)}> ${$errors.contractPrice ? `<small class="text-red-500">${escape($errors.contractPrice)}</small>` : ``}</div> <div class="w-full max-w-xs"><label for="contractType" data-svelte-h="svelte-1f2vqma">Contract Type</label> <select class="select select-accent w-full max-w-xs" name="contractType">${each(contractTypes, (contractType) => {
    return `<option${add_attribute("value", contractType.value, 0)}>${escape(contractType.name)}</option>`;
  })}</select> ${$errors.contractType ? `<small class="text-red-500">${escape($errors.contractType)}</small>` : ``}</div> <div class="w-full max-w-xs"><label for="contractLength" data-svelte-h="svelte-1cybonm">Contract Length</label> <select class="select select-accent w-full max-w-xs" name="contractLength">${each(lengths, (length) => {
    return `<option${add_attribute("value", length.value, 0)}>${escape(length.name)}</option>`;
  })}</select> ${$errors.contractLength ? `<small class="text-red-500">${escape($errors.contractLength)}</small>` : ``}</div> <button type="submit" class="btn btn-primary my-4 w-full max-w-xs" data-svelte-h="svelte-i2gevq">Submit Edits</button></form></div>`;
});
export {
  Page as default
};
