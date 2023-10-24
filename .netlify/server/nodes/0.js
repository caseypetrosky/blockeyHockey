import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.eabd25bb.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js","_app/immutable/chunks/navigation.2af17450.js","_app/immutable/chunks/singletons.698dd5ff.js","_app/immutable/chunks/index.607909ad.js","_app/immutable/chunks/paths.2f7d1989.js"];
export const stylesheets = ["_app/immutable/assets/0.7bd15b15.css"];
export const fonts = [];
