<script>
   /**
	 * @type {any}
	 */
    export let imgSource;
  /**
	 * @type {any}
	 */
   export let teamName;
    /**
	 * @type {any}
	 */
   export let teamOwner;
    /**
     * @type {any}
     */
    export let teamWins;
    /**
     * @type {any}
     */
    export let teamLosses;
    /**
     * @type {any}
     */
    export let teamPoints;
    /**
     * @type {any}
     */
    export let teamTwitter;
        /**
     * @type list
     */
    export let players;
    export let teamColor;
    let teamURL = `/teams/${teamName}`;
    import PlayerRosterDisplay from './playerRosterDisplay.svelte';

</script>
<div class="lg:flex items-center rounded-lg  border-4 m-4  p-4" style="border-color: {teamColor}">
  <div class="grid grid-cols-2 shadow-md rounded-lg p-2 w-72 h-70 border-4 mr-4" style="border-color: {teamColor}">
  
    <div class="">
      <img src={imgSource} alt="Team Logo" class="object-cover" />
    </div>
 
  <div class="flex flex-col m-4">
    <a href={teamURL} class="text-xl font-bold cursor-pointer hover:text-neutral-400">{teamName}</a>
    <p class="text-gray-400">{teamOwner}</p>
    <p>Wins: {teamWins}</p>
    <p>Losses: {teamLosses}</p>
    <p>Points: {teamPoints}</p>
    <a href={teamTwitter} class="text-blue-500 cursor-pointer hover:text-blue-600">Team Twitter</a>
  </div>
</div>
  <button
    class="btn bg-primary md:hidden"
    on:click={() => {
      document.querySelector('.team-roster').classList.toggle('hidden');
      document.querySelector('.team-roster').classList.toggle('flex');

    }}
  >
    Show Team Roster
  </button>
  
<div class="team-roster hidden md:flex flex-wrap gap-4">
  {#if players.length === 0}
    <p>No players on this team</p>
  {:else}
    {#each players as player} 

      <PlayerRosterDisplay {player} class="basis-auto"/>
   
    {/each}
  {/if}
</div>
</div>
