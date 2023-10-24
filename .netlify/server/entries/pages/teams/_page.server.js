import { p as prisma } from "../../../chunks/prisma.js";
const load = async () => {
  return {
    teams: await prisma.team.findMany()
  };
};
export {
  load
};
