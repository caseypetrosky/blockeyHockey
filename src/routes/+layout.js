//sveltekit search form that takes entered data and passes it through an api and redirects to the returned page
    <form on:submit={handleSubmit}>
    
        <input type="text" bind:value={search} placeholder="Search for a movie" />
        <button type="submit">Search</button>
    </form>