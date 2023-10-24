import { r as redirect, f as fail } from "../../../chunks/index.js";
import { s as superValidate } from "../../../chunks/superValidate.js";
import { z } from "zod";
import { a as auth } from "../../../chunks/lucia.js";
const SignupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long")
});
const load = async ({ locals }) => {
  const signupForm = await superValidate(locals, SignupSchema);
  const session = await locals.auth.validate();
  if (session) {
    throw redirect(302, "/");
  }
  return {
    signupForm
  };
};
const actions = {
  signupForm: async (event) => {
    const form = await superValidate(event, SignupSchema);
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    const { username, password } = form.data;
    try {
      await auth.createUser({
        key: {
          providerId: "username",
          providerUserId: username,
          password
        },
        attributes: {
          username
        }
      });
    } catch (err) {
      console.error(err);
      return fail(400, { form });
    }
    throw redirect(302, "admin/login");
  }
};
export {
  actions,
  load
};
