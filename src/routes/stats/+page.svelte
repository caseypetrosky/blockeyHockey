<script>
  import { Search, Button } from 'flowbite-svelte'
  import { goto } from '$app/navigation';

let search = '';

const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch(`https://playerdb.co/api/player/minecraft/${search}`);
        const data = await response.json();
        
        const playerId = data.data.player.raw_id;
        
        goto(`/stats/${playerId}`);
    } catch (error) {
        console.error("An error occurred:", error);
    }
search = '';
};

</script>
<div class="container py-4 mx-auto">
  <h1 class="text-4xl py-4">Player Stats Search</h1>
<form class="flex gap-2 " on:submit={handleSubmit}>
  <Search bind:value={search} size='lg' class="flex gap-2 items-center" placeholder="Search for player by username or uuid">
  </Search>
  <Button size='sm' class="bg-primary hover:bg-primary-focus">
    <svg class="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
    Search
  </Button>
</form>
</div>