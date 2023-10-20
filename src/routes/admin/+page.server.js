import { redirect } from "@sveltejs/kit";
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import prisma from '$lib/prisma';

export const load = async({locals}) => {
    const session = await locals.validate();
    if (session){
        throw redirect(302,"/admin/panel");
    }

};

export const actions = {
    default: async({request}) => {
        const {username, password} = Object.fromEntries(
            await request.formData()
        )

        try{
            await auth.createUser({
                key: {
                    providerId: 'username',
                    providerUserId: username,
                    password,
                },
                attributes: {
                    username,
                }

                })
        } catch(err){
            console.log(err);
            return fail(400, {message: "couldnt register user"})
        }
        throw redirect(302, "/admin/login");
    }
}