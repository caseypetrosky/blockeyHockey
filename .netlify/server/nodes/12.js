

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/leagues/jbhl/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.80c2c583.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js"];
export const stylesheets = [];
export const fonts = [];
