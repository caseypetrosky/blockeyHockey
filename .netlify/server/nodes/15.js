import * as server from '../entries/pages/leagues/jbhl/standings/_page.server.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/leagues/jbhl/standings/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/leagues/jbhl/standings/+page.server.js";
export const imports = ["_app/immutable/nodes/15.3272aaee.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js","_app/immutable/chunks/each.91502e02.js","_app/immutable/chunks/paths.2f7d1989.js"];
export const stylesheets = [];
export const fonts = [];
