<script>
    export let player;
    let goals = 0;
    if(!player.goalie){
    goals = player.game_player_stats[0].goals_scored;
}

</script>

<div>
    <img src="https://minotar.net/armor/bust/{player.uuid}/300.png" alt="player avatar" class="h-20 w-20">
    <h1 class="text-lg">{player.username}</h1>
    {#if player.goalie }
         <h2 >Goalie</h2>
         
    {:else}       
      <h2>Skater</h2>
    <p>G: {goals}</p>
    {/if}
</div>
