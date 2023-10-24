import * as server from '../entries/pages/stats/_page.server.js';

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/stats/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/stats/+page.server.js";
export const imports = ["_app/immutable/nodes/20.49023bea.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/tw-merge.1166cefb.js","_app/immutable/chunks/Search.13a2b5fa.js","_app/immutable/chunks/navigation.2af17450.js","_app/immutable/chunks/singletons.698dd5ff.js","_app/immutable/chunks/index.607909ad.js","_app/immutable/chunks/paths.2f7d1989.js"];
export const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
export const fonts = [];
