import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async({cookies, request}) => {
        const formData = await request.formData();
        const username = formData.get("username");
        const password = formData.get("password");
        if (username === "BHLWebSiteAdmin" && password === "@BHLWebSiteAdmin#") {
            cookies.set("access", "dataAdmin"),{path: "/",sameSite:"strict"};
            throw redirect(302,"/admin/panel");
        }
        return {
            username,
            message: "Wrong username or password"
        }
    }
}

