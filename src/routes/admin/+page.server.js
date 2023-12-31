import { redirect, fail } from "@sveltejs/kit";
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { auth } from "$lib/server/lucia";

// Define your validation schemas
const SignupSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const load = async ({locals}) => {
    const signupForm = await superValidate(locals, SignupSchema);
    const session = await locals.auth.validate();
    if (session) {
        throw redirect(302, '/');
    }
    return {
        signupForm,
    };
};

export const actions = {
    signupForm: async (event) => {
        // Use SignupSchema here, not signupForm
        const form = await superValidate(event, SignupSchema);
        if(!form.valid){
            return fail(400,{
                form
            })
        }

        const {username, password} = form.data;

        try {
            await auth.createUser({
                key: {
                    providerId: "username",
                    providerUserId: username,
                    password,
                },
                attributes: {
                    username,
                },
            });
        } catch (err) {
            console.error(err);
            return fail(400, {form});
        }
        throw redirect(302, 'admin/login');
    },
};
