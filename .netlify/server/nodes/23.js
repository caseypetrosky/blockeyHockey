import * as server from '../entries/pages/teams/_page.server.js';

export const index = 23;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/teams/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/teams/+page.server.js";
export const imports = ["_app/immutable/nodes/23.cea6a1ee.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js","_app/immutable/chunks/each.91502e02.js"];
export const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
export const fonts = [];
