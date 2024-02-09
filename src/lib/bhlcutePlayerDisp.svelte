<script>
    export let player;
    let goals = 0;
    let assists = 0;
     let gamesPlayed = 0;
     let shots = 0;
     let saves = 0;
     let savepercentage = 0;
     let gaa = 0;
    if(!player.goalie){
        for(let i = 0; i < player.game_player_stats.length; i++){
                goals += player.game_player_stats[i].goals_scored;
                assists += player.game_player_stats[i].assists;
                gamesPlayed++;
            }
}
else{
        for(let i = 0; i < player.game_goalie_stats.length; i++){
            shots += player.game_goalie_stats[i].shots;
            saves += player.game_goalie_stats[i].saves;
            gamesPlayed++;
        }
    }
    savepercentage = saves / shots;
    gaa = goals / gamesPlayed;
let points = goals + assists;
let ppg = points / gamesPlayed ;
ppg = ppg.toFixed(2);
savepercentage = savepercentage.toFixed(3);
gaa = gaa.toFixed(2);
</script>

<div class="m-2">
    <a href="/stats/{player.uuid}" class="text-lg hover:text-accent-focus"><img  href="/stats/{player.uuid}" src="https://minotar.net/armor/bust/{player.uuid}/300.png" alt="player avatar" class="h-20 w-20">
   {player.username}</a>
    {#if player.goalie }
         <h2 >Goalie</h2>
        <div class="grid justify-start">
        <div class="tooltip" data-tip="shots">
            <p class="text-xs">S: {shots}</p>
        </div>
        <div class="tooltip" data-tip="saves">
            <p class="text-xs">SV: {saves}</p>
        </div>
        <div class="tooltip" data-tip="save percentage">
            <p class="text-xs">SV%: {savepercentage}</p>
        </div>
        <div class="tooltip" data-tip="games played">
            <p class="text-xs">GP: {gamesPlayed}</p>
        </div>
        <div class="tooltip" data-tip="goals against average">
            <p class="text-xs">GAA: {gaa}</p>
        </div>
    </div>

         
    {:else}       
        <h2>Skater</h2>
        <div class="grid justify-start">
        <div class="tooltip" data-tip="goals">
            <p class="text-xs">G: {goals}</p>
        </div>
        <div class="tooltip" data-tip="assists">
            <p class="text-xs">A: {assists}</p>
        </div>
        <div class="tooltip" data-tip="points per game">
            <p class="text-xs">PPG: {ppg}</p>
        </div>
        <div class="tooltip" data-tip="games played">
            <p class="text-xs">GP: {gamesPlayed}</p>
        </div>
        <div class="tooltip" data-tip="points">
            <p class="text-xs">PTS: {points}</p>
        </div>
        
        
    </div>
    {/if}
        
        
</div>
