import * as universal from '../entries/pages/admin/panel/_page.js';
import * as server from '../entries/pages/admin/panel/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/panel/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/admin/panel/+page.js";
export { server };
export const server_id = "src/routes/admin/panel/+page.server.js";
export const imports = ["_app/immutable/nodes/5.668034ae.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js","_app/immutable/chunks/each.91502e02.js","_app/immutable/chunks/paths.2f7d1989.js","_app/immutable/chunks/SuperDebug.svelte_svelte_type_style_lang.1d9a784e.js","_app/immutable/chunks/navigation.2af17450.js","_app/immutable/chunks/singletons.698dd5ff.js","_app/immutable/chunks/index.607909ad.js","_app/immutable/chunks/stores.062ec7c5.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/spread.8a54911c.js"];
export const stylesheets = ["_app/immutable/assets/5.b0025aee.css","_app/immutable/assets/Indicator.1d121e74.css","_app/immutable/assets/SuperDebug.ecbcbe74.css"];
export const fonts = [];
