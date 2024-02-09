<script>
  import { Avatar } from "flowbite-svelte";
    export let data;
    
  console.log(data.teams)
   </script>
   
   <div class="container mx-auto mt-10">
        <div>
          
           <h1 class="text-2xl">BHCL Teams</h1>
           
           {#each data.teams as team}
            {#if team.leagueId == 4}
            <a class="m-2  btn" href="/teams/{team.id}">
               <img class="h-10 w-auto object-contain" alt="{team.id}" src="/teamlogos/{team.id}.png">{team.name}
               </a>
            {/if}
            
           {/each}
           {#each data.teams as team}
            {#if team.leagueId == 0}
            <a class="m-2  btn" href="/teams/{team.id}">
               <img class="h-10 w-auto object-contain" alt="{team.id}" src="bhl.png">{team.name}
               </a>
            {/if}
            
           {/each}
        </div>
        <br>
        <!--
        <div>
            <h1 class="text-2xl">NAMHL Teams</h1>

            {#each data.teams as team}
            {#if team.leagueId == 2}
            <a class="m-2  btn" href="/teams/{team.id}">
                <img class="h-10 w-auto object-contain" alt="{team.id}" src="/teamlogos/{team.id}.png">{team.name}
                </a>
            {/if}
           {/each}
         </div>
         <br>
        <div>
            <h1 class="text-2xl">JBHL Teams</h1>

            {#each data.teams as team}
            {#if team.leagueId == 3}
            <a class="m-2  btn" href="/teams/{team.id}">
                <img class="h-10 w-auto object-contain" alt="{team.id}" src="/teamlogos/{team.id}.png">{team.name}
                </a>
            {/if}
           {/each}
         </div>
         -->
   </div>