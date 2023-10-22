import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from '$lib/prisma';

export const auth = lucia({
    adapter: prismaAdapter(prisma),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
			role: userData.role
		}
	},
    getUserAttributes: (user) => {
        return {
            userId: user.userId,
            username: user.username,
            role: user.role
        }
    }
});
