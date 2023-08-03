<script>
  import { Avatar } from "flowbite-svelte";

    export let data;
   </script>
   
   <div class="container mx-auto mt-10">
        <div>
           <h1>BHL Teams</h1>
           
           {#each data.teams as team}
            {#if team.leagueId == 1}
            <a class="m-2  btn" href="/teams/{team.id}">
               <img class="h-12 w-12 object-contain" alt="{team.id}" src="/src/static/logos/{team.id}.png">{team.name}
               </a>
            {/if}
           {/each}
        </div>
        <br>
        <div>
            <h1>NAMHL Teams</h1>

            {#each data.teams as team}
            {#if team.leagueId == 2}
            <a class="m-2  btn" href="/teams/{team.id}">
                <img class="h-12 w-12 object-contain" alt="{team.id}" src="/src/static/logos/{team.id}.png">{team.name}
                </a>
            {/if}
           {/each}
         </div>
   </div>