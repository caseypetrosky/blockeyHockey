import { redirect, fail } from "@sveltejs/kit";
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { auth } from "$lib/server/lucia";

// Define your validation schemas
const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const load = async ({locals}) => {
    const LoginForm = await superValidate(locals, LoginSchema);
    const session = await locals.auth.validate();
    if (session) {
        throw redirect(302, '/');
    }
    return {
        LoginForm,
    };
};

export const actions = {
    LoginForm: async (event) => {
        // Use SignupSchema here, not signupForm
        const form = await superValidate(event, LoginSchema);
        if(!form.valid){
            return fail(400,{
                form
            })
        }
        console.log(form);

        const {username, password} = form.data;

        try {
            const key = await auth.useKey('username', username, password);
            const session = await auth.createSession({
                userId: key.userId,
			    attributes: {}
            });
            event.locals.auth.setSession(session);
        } catch (err) {
            console.error(err);
            return fail(400, {form});
        }
        throw redirect(302, '/');
    },
};
