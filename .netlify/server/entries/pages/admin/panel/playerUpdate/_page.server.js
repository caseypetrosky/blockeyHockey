import { p as prisma } from "../../../../../chunks/prisma.js";
import { e as error } from "../../../../../chunks/index.js";
import "devalue";
import { a as auth } from "../../../../../chunks/lucia.js";
const load = async ({ params, locals }) => {
  const session = await locals.auth.validate();
  const userId = session.user.userId;
  const user = await auth.getUser(userId);
  if (!user || !session || user.role != "admin") {
    throw error(401, "You do not have the required permissions to view this content.");
  } else {
    const players = await prisma.player.findMany({});
    return {
      players
    };
  }
};
export {
  load
};
