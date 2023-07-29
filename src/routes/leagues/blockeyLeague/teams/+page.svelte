<script>
   /* import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { teams } from '../../../../stores/teams.js';
    import { getTeams } from '../../../../api/teams.js';

    onMount(async () => {
        if (get(teams).length === 0) {
            await getTeams();
        }
    });
    {#each teams as team}
        <li>
            <a href="/leagues/blockeyLeague/teams/{team.id}">
                {team.name}
            </a>
        </li>
        {/each}
    */
</script>

<div class="container">
    <h1>Teams</h1>
    <ul>
            
    </ul>
</div>