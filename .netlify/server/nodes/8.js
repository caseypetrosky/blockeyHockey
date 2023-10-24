

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/leagues/blockeyLeague/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.275dab77.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js"];
export const stylesheets = [];
export const fonts = [];
