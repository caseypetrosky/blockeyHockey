// src/hooks.server.ts
import { auth } from "$lib/server/lucia";
import { sequence } from "@sveltejs/kit/hooks";

export const customHandle = async ({ resolve, event }) => {
    return resolve(event);
}

export const handle =  sequence(customHandle, auth) 