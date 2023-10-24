import { c as create_ssr_component, s as subscribe, e as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const _error_svelte_svelte_type_style_lang = "";
const css = {
  code: ".error-details.svelte-n78gg3{white-space:pre-wrap;word-break:break-all}",
  map: null
};
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"><div class="max-w-md w-full space-y-8 text-center"><svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> <h2 class="mt-6 text-3xl font-extrabold text-white" data-svelte-h="svelte-1m7xgut">Oops! Something went wrong.</h2> <h3 class="text-2xl text-red-500">${escape($page.status)} <br> ${escape($page.error.message)}</h3> <p class="mt-2 text-sm text-white" data-svelte-h="svelte-bydam6">An error occured with the page you were trying to access.</p> <p class="mt-2 text-sm text-white" data-svelte-h="svelte-y6jqj9">If this continues make a modmail request with a screenshot of the error so it can be replicated!</p> <div class="bg-red-50 border-l-4 border-red-400 p-4 mt-6"><div class="flex" data-svelte-h="svelte-7ylpf8"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l1.293 1.293-1.293 1.293a1 1 0 101.414 1.414L9 13.414l1.293 1.293a1 1 0 001.414-1.414l-1.293-1.293 1.293-1.293z" clip-rule="evenodd"></path></svg></div> <div class="ml-3"><p class="text-sm text-red-700">Here are the error details:</p></div></div> <div class="mt-2 text-sm text-red-700"><pre class="error-details svelte-n78gg3">                    ${escape(JSON.stringify($page, null, 1))}
                </pre></div></div></div></div>`;
});
export {
  Error as default
};
