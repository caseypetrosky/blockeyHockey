<script>
    export let data;
   </script>
   
   <div class="container">
       <main>
           <h1>Player Usernames</h1>
           {#each data.teams as team}
            {team.id} {team.name} {team.team_owner}<br>
           {/each}
         </main>
   </div>