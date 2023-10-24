

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/leagues/namhl/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/16.d4d45b16.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js"];
export const stylesheets = [];
export const fonts = [];
