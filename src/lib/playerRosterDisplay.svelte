<script>
  export let player;

  const calculatePPG = (goals, assists, gamesPlayed) => {
    if (gamesPlayed === 0) {
      return 0;
    }
    return ((goals + assists) / gamesPlayed).toFixed(2);
  };
  let teamColor = player.teamColor;

  let playerUrl = `/players/${player.name}`;
  
</script>

<div class="teamBorder shadow-md rounded-lg p-2 w-32 border-4" style="border-color: {teamColor}">
  <div class="flex items-center justify-center mb-4">
    <img
      src={player.image}
      alt="Player"
      class="object-cover"
    />
  </div>
  <a href={playerUrl} class="text-xl font-bold cursor-pointer hover:text-neutral-400">{player.name}</a>
  <p class="text-gray-400">{player.position}</p>
  <div class="grid grid-cols-3 ">
    <div>
      <p class="font-bold">G</p>
      <p>{player.goals}</p>
    </div>
    <div>
      <p class="font-bold">A</p>
      <p>{player.assists}</p>
    </div>
    <div>
      <p class="font-bold">PTS</p>
      <p>{player.goals + player.assists}</p>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <p class="font-bold">GP</p>
      <p>{player.gamesPlayed}</p>
    </div>
    <div>
      <p class="font-bold">PPG</p>
      <p>{calculatePPG(player.goals, player.assists, player.gamesPlayed)}</p>
    </div>
  </div>
</div>


<style>
.teamBorder {
  --tw-border-opacity: 1;
}
</style>