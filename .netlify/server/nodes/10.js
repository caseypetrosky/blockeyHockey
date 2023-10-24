import * as server from '../entries/pages/leagues/blockeyLeague/rosters/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/leagues/blockeyLeague/rosters/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/leagues/blockeyLeague/rosters/+page.server.js";
export const imports = ["_app/immutable/nodes/10.f7f1cfeb.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js","_app/immutable/chunks/each.91502e02.js","_app/immutable/chunks/bhlcutePlayerDisp.b3c54209.js"];
export const stylesheets = [];
export const fonts = [];
