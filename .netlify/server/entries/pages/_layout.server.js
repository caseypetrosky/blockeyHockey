const load = async ({ locals }) => {
  try {
    const response = await locals.auth.validate();
    if (!response || !response.user) {
      return { props: { user: null } };
    }
    const { user, session } = response;
    return { user };
  } catch (error) {
    console.error("Error in load function:", error);
    return { props: { user: null } };
  }
};
export {
  load
};
