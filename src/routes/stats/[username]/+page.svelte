<script>
    import {page} from '$app/stores';
    export let data;
    let goals = 0;
    let assists = 0;
     let gamesPlayed = 0;
     let shots = 0;
     let saves = 0;
     let savepercentage = 0;
     let gaa = 0;
    if(!data.player.goalie){
        for(let i = 0; i < data.player.game_player_stats.length; i++){
            goals += data.player.game_player_stats[i].goals_scored;
            assists += data.player.game_player_stats[i].assists;
            gamesPlayed++;
        }
    }
    else{
        for(let i = 0; i < data.player.game_goalie_stats.length; i++){
            shots += data.player.game_goalie_stats[i].shots;
            saves += data.player.game_goalie_stats[i].saves;
            gamesPlayed++;
        }
    }
    savepercentage = saves / shots;
    gaa = goals / gamesPlayed;
let points = goals + assists;
let ppg = points / gamesPlayed;
</script>
<div class="container mx-auto">
    <h1>{data.player.username}</h1>
    <img src="https://minotar.net/armor/bust/{data.player.uuid}/300.png" alt="player avatar" class="h-40 w-40 mr-4">
</div>
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

<pre>
    {JSON.stringify($page,null,2)}
</pre>