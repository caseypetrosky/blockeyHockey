import { r as redirect, f as fail } from "../../../../chunks/index.js";
import { s as superValidate } from "../../../../chunks/superValidate.js";
import { z } from "zod";
import { a as auth } from "../../../../chunks/lucia.js";
const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long")
});
const load = async ({ locals }) => {
  const LoginForm = await superValidate(locals, LoginSchema);
  const session = await locals.auth.validate();
  if (session) {
    throw redirect(302, "/");
  }
  return {
    LoginForm
  };
};
const actions = {
  LoginForm: async (event) => {
    const form = await superValidate(event, LoginSchema);
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    console.log(form);
    const { username, password } = form.data;
    try {
      const key = await auth.useKey("username", username, password);
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {}
      });
      event.locals.auth.setSession(session);
    } catch (err) {
      console.error(err);
      return fail(400, { form });
    }
    throw redirect(302, "/");
  }
};
export {
  actions,
  load
};
