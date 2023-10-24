import { p as prisma } from "../../../../../../chunks/prisma.js";
import { a as auth } from "../../../../../../chunks/lucia.js";
import { e as error, f as fail, r as redirect } from "../../../../../../chunks/index.js";
import { z } from "zod";
import { s as superValidate } from "../../../../../../chunks/superValidate.js";
const playerSchema = z.object({
  username: z.string(),
  number: z.number().min(0).max(99),
  teamId: z.string().min(1).max(4),
  goalie: z.boolean(),
  awards: z.string(),
  league_roles: z.string(),
  contractTier: z.enum(["Pro", "Superstar", "Amateur"]),
  contractLength: z.number().min(1).max(3),
  contractPrice: z.number().min(1500).max(15e3)
});
let userId;
const load = async ({ params, locals }) => {
  const session = await locals.auth.validate();
  userId = session.user.userId;
  const user = await auth.getUser(userId);
  if (!user || !session || user.role != "admin") {
    throw error(401, "You do not have the required permissions to view this content.");
  } else {
    const player = await prisma.player.findUnique({
      //find a player in prisma where the username is equal to the username in the url or the uuid is equal to the uuid in the url
      where: {
        uuid: params.uuid
      }
    });
    const teams = await prisma.team.findMany({
      select: {
        name: true,
        id: true,
        leagueId: true
      }
    });
    const form = await superValidate(player, playerSchema);
    return {
      form,
      player,
      teams
    };
  }
};
const actions = {
  updatePlayerForm: async ({ request, params }) => {
    const form = await superValidate(request, playerSchema);
    await prisma.Logs.create({
      data: {
        type: "UpdatePlayer",
        data: JSON.stringify(form),
        user: {
          connect: {
            id: userId
          }
        },
        date: /* @__PURE__ */ new Date()
      }
    });
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    await prisma.player.update({
      where: {
        uuid: params.uuid
      },
      data: {
        username: form.data.username,
        number: form.data.number,
        teamId: form.data.teamId,
        goalie: form.data.goalie,
        awards: form.data.awards,
        league_roles: form.data.league_roles,
        contractTier: form.data.contractTier,
        contractLength: form.data.contractLength,
        contractPrice: form.data.contractPrice
      }
    });
    throw redirect(308, `/admin/panel/playerUpdate`);
  }
};
export {
  actions,
  load
};
