import * as server from '../entries/pages/admin/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+page.server.js";
export const imports = ["_app/immutable/nodes/3.ff171b8d.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js","_app/immutable/chunks/SuperDebug.svelte_svelte_type_style_lang.1d9a784e.js","_app/immutable/chunks/navigation.2af17450.js","_app/immutable/chunks/singletons.698dd5ff.js","_app/immutable/chunks/index.607909ad.js","_app/immutable/chunks/paths.2f7d1989.js","_app/immutable/chunks/stores.062ec7c5.js","_app/immutable/chunks/parse.7d180a0f.js"];
export const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css","_app/immutable/assets/SuperDebug.ecbcbe74.css"];
export const fonts = [];
