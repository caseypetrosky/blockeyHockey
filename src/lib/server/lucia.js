import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { prisma  as prismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from '$lib/prisma';


export const auth = lucia({
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),
	adapter: prismaAdapter(prisma),
});

    
    transformUserData: (user) => ({
        return : {
            userId: user.id,
            username: user.username,
        }
    })
