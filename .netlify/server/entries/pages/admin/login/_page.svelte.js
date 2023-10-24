import { c as create_ssr_component, s as subscribe, a as add_attribute, e as escape } from "../../../../chunks/ssr.js";
import { z } from "zod";
import { s as superForm } from "../../../../chunks/SuperDebug.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $errors, $$unsubscribe_errors;
  let { data } = $$props;
  const LoginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long")
  });
  const { form, errors, enhance } = superForm(data.LoginForm, {
    validators: LoginSchema,
    // Reset the form upon a successful result
    resetForm: true,
    multipleSubmits: "prevent"
  });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_form();
  $$unsubscribe_errors();
  return `<div class="flex gap-4" data-svelte-h="svelte-18at9ll"><a href="/admin" class="my-4 text-xl font-medium text-gray-900 dark:text-white hover:dark:text-gray-300">Create A New Account</a> <h3 class="my-4 text-xl font-medium text-gray-900 dark:text-white underline">Log In</h3></div> <form method="POST" action="?/LoginForm"><div class="form-control w-full max-w-xs"><label class="label text-white" for="username" data-svelte-h="svelte-wyod9i">Username</label> <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="username" placeholder="Username" required${add_attribute("value", $form.username, 0)}> ${$errors.username ? `<small class="text-red-500">${escape($errors.username)}</small>` : ``}</div> <div class="form-control w-full max-w-xs"><label class="label text-white" for="password" data-svelte-h="svelte-b7hfx2">Password</label> <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="password" placeholder="password" required${add_attribute("value", $form.password, 0)}> ${$errors.password ? `<small class="text-red-500">${escape($errors.password)}</small>` : ``}</div> <button type="submit" class="btn btn-primary my-4 w-full max-w-xs" data-svelte-h="svelte-nsgzvy">Log in</button></form>`;
});
export {
  Page as default
};
