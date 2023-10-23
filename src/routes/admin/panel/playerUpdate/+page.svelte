<script>
    import { Search } from 'flowbite-svelte'
    export let data;
    let search = '';
    
    // This function is used to filter your players based on the search query

    $: filteredPlayers = search ?
        data.players.filter(player => player.username.toLowerCase().includes(search.toLowerCase())) :
        data.players;
</script>
<style>
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* This will create a grid with a minimum column width of 300px and a maximum of 1 fraction of available space */


    }
  </style>


<div class="container mx-auto mt-4 gap-4 text-white">
    <div class="flex gap-4">
        <a href="/admin/panel" class="text-3xl font-semibold text-gray-900 dark:text-white ">
        Admin Panel
        </a>
        <h1  class="text-3xl font-semibold text-gray-900 dark:text-white underline">
        Player editing table
        </h1>
    </div>

    <br>
    <!-- This is your search input -->
    <Search bind:value={search} size='lg' class="flex gap-2 items-center" placeholder="Search for player by username"></Search>
    <div class="grid gap-4 mt-4">
    {#each filteredPlayers as player}
    <a href="./playerUpdate/{player.uuid}">
    <div class="flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-lg">
        <div class="flex-shrink-0">
        <img src="https://minotar.net/armor/bust/{player.uuid}/300.png" alt="player avatar" class="rounded-sm w-8 h-8">
        </div>
        <div class="flex-grow">
        <h1 class="text-lg font-semibold">{player.username}</h1>
        </div>
    </div></a>
    {/each}
    </div>
</div>