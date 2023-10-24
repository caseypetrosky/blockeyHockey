import * as server from '../entries/pages/stats/_uuid_/_page.server.js';

export const index = 22;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/stats/_uuid_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/stats/[uuid]/+page.server.js";
export const imports = ["_app/immutable/nodes/22.53946e2e.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js","_app/immutable/chunks/each.91502e02.js","_app/immutable/chunks/paths.2f7d1989.js","_app/immutable/chunks/Tabs.04751229.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/index.607909ad.js","_app/immutable/chunks/tw-merge.1166cefb.js"];
export const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
export const fonts = [];
