export const load  = async ({ locals }) => {
    try {
        const response = await locals.auth.validate();
        
        // Check if the response or the user object is null
        if (!response || !response.user) {
            
            // Handle the scenario when there's no user data
            return { props: { user: null } };
        }

        const { user, session } = response;

        

        return { user };
    } catch (error) {
        console.error('Error in load function:', error);
        // Handle the error appropriately
        return { props: { user: null } };
    }
}
