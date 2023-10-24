import * as server from '../entries/pages/admin/panel/playerUpdate/_uuid_/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/panel/playerUpdate/_uuid_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/panel/playerUpdate/[uuid]/+page.server.js";
export const imports = ["_app/immutable/nodes/7.70a5dbbd.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js","_app/immutable/chunks/each.91502e02.js","_app/immutable/chunks/stores.062ec7c5.js","_app/immutable/chunks/singletons.698dd5ff.js","_app/immutable/chunks/index.607909ad.js","_app/immutable/chunks/paths.2f7d1989.js","_app/immutable/chunks/SuperDebug.svelte_svelte_type_style_lang.1d9a784e.js","_app/immutable/chunks/navigation.2af17450.js","_app/immutable/chunks/parse.7d180a0f.js"];
export const stylesheets = ["_app/immutable/assets/SuperDebug.ecbcbe74.css"];
export const fonts = [];
