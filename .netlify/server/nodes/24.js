import * as server from '../entries/pages/teams/_teamID_/_page.server.js';

export const index = 24;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/teams/_teamID_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/teams/[teamID]/+page.server.js";
export const imports = ["_app/immutable/nodes/24.387955a4.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js","_app/immutable/chunks/each.91502e02.js","_app/immutable/chunks/cutePlayerDisp.43b68c8b.js","_app/immutable/chunks/bhlcutePlayerDisp.b3c54209.js","_app/immutable/chunks/paths.2f7d1989.js"];
export const stylesheets = [];
export const fonts = [];
