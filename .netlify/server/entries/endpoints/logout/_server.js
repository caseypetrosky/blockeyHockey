import { a as auth } from "../../../chunks/lucia.js";
import { r as redirect } from "../../../chunks/index.js";
const POST = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) {
    throw redirect(302, "/");
  }
  await auth.invalidateSession(session.sessionId);
  locals.auth.setSession(null);
  throw redirect(302, "/");
};
export {
  POST
};
