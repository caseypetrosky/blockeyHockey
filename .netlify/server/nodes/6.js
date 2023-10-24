import * as server from '../entries/pages/admin/panel/playerUpdate/_page.server.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/panel/playerUpdate/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/panel/playerUpdate/+page.server.js";
export const imports = ["_app/immutable/nodes/6.b9e530bf.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js","_app/immutable/chunks/each.91502e02.js","_app/immutable/chunks/Search.13a2b5fa.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/tw-merge.1166cefb.js"];
export const stylesheets = ["_app/immutable/assets/6.e2ced29c.css","_app/immutable/assets/Indicator.1d121e74.css"];
export const fonts = [];
