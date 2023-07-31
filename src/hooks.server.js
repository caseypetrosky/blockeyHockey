import { redirect } from '@sveltejs/kit';
const protectedroutes = ['/admin/panel'];
export const handle = async ({ event, request, resolve }) => {
    const access = event.cookies.get('access');
    if (!access && protectedroutes.includes(event.url.pathname)) {
        throw redirect(303, '/');
    }
    if (access) {
        event.locals.user = {
            isAuthenticated: true
        };
    } else {
        if (protectedroutes.includes(event.url.pathname)) {
            throw redirect(303, '/');
        }
    }
    return resolve(event);
};