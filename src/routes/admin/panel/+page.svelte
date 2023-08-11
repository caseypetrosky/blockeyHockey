<script>
	import { page } from '$app/stores';
    import { Button, Modal, Label, Input, Checkbox, Select, Textarea  } from 'flowbite-svelte';
    import { _processHockeyStats } from './+page.js';

    let gameData = ``
    let newGame = ``;

  export let data;
    //modals
    let playerCreate = false;
    let teamCreate = false;
    let gameCreate = false;

    // Team select
  let selected;
  let teams = [];
  $: {
    teams = data.team ? data.team.map(team => ({ value: team.id, name: team.name })) : [];
  }
  let bhlTeams = [];
    $: {
        bhlTeams = data.team ? data.team.filter(team => team.leagueId == 1).map(team => ({ value: team.id, name: team.name })) : [];
    }
    let namhlTeams = [];
    $: {
        namhlTeams = data.team ? data.team.filter(team => team.leagueId == 2).map(team => ({ value: team.id, name: team.name })) : [];
    }
    let jbhlTeams = [];
    $: {
        jbhlTeams = data.team ? data.team.filter(team => team.leagueId == 3).map(team => ({ value: team.id, name: team.name })) : [];
    }
  // Contract select
    let contractType;
    let contractTypes = [
        { value: 'Superstar', name: 'Superstar' },
        { value: 'Pro', name: 'Pro' },
        { value: 'Amateur', name: 'Amateur' }
    ]
    let contractLength;
    let lengths= [
        { value: '1', name: '1 season' },
        { value: '2', name: '2 seasons' },
        { value: '3', name: '3 seasons'}
    ]
    // Team League
    let teamLeague;
    let leagues = [
        { value: '1', name: 'BHL' },
        { value: '2', name: 'NAMHL' },
        { value: '3', name: 'JBHL' }
    ]
    let gameLeague;
    let homeTeam;
    let awayTeam;
   
</script>
  <div class="container mx-auto mt-4">
  <Button on:click={() => (playerCreate = true)}>New Player Creation</Button>
  
  <Modal bind:open={playerCreate} size="lg" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" action="#">
      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create A New Player</h3>

      <Label class="space-y-2">
        <span>Minecraft Username</span>
        <Input type="username" name="username" placeholder="Username" required />
      </Label>

      <Label class="space-y-2">
        <span>Number </span>
        <Input type="number" name="number" placeholder="Number" required />
      </Label>

      <Label class="space-y-2">
        Select a team
        <Select class="mt-2" items={teams} bind:value={selected} required/>
      </Label>
      
      <Label class="space-y-2">
        Contract info
        <Select class="mt-2" items={lengths} bind:value={contractLength} />
        <Input class="mt-2" type="number" name="contractPrice" placeholder="Contract Price" />
        <Select class="mt-2" items={contractTypes} bind:value={contractType} />
      </Label>

      <Label class="space-y-2">
        League Roles
        <Input type="text" name="leagueRoles" placeholder="League Roles" />
      </Label>

      <Label class="space-y-2">
        Is this player a goalie?
        <div class="flex items-start">
            <Checkbox>Goalie</Checkbox>
        </div>
    </Label>

      <Button type="submit" class="w-full1">Submit New Player</Button>
    </form>
  </Modal>

  <Button on:click={() => (teamCreate = true)}>New Team Creation</Button>

  <Modal bind:open={teamCreate} size="lg" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" action="#">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create A New Team</h3>
  
        <Label class="space-y-2">
          <span>Team Name</span>
          <Input type="text" name="teamName" placeholder="Team Name" required />
        </Label>

        <Label class="space-y-2">
            <span>Team Shorthand</span>
            <Input type="text" name="teamID" placeholder="Team Shorthand" required />
        </Label>

        <Label class="space-y-2">
            <span>Team Owner</span>
            <Input type="text" name="teamOwner" placeholder="Team Owner IGN" required />
        </Label>

        <Label class="space-y-2">
            <span>Team League</span>
            <Select class="mt-2" items={leagues} bind:value={teamLeague} />
        </Label>
          
        <Button type="submit" class="w-full1">Submit New Team</Button> 
      </form>
  </Modal>

  <Button on:click={() => (gameCreate = true)}>New Game</Button>

  <Modal bind:open={gameCreate} size="lg" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" on:submit={newGame = _processHockeyStats(gameData)} >
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Input A New Game</h3>
  
        <Label class="space-y-2">
            <span>League</span>
            <Select class="mt-2" items={leagues} bind:value={gameLeague} />
        </Label>

        <Label class="space-y-2">
            <span>Tell Raw Output</span>
            <Textarea type="text" rows="10" class="resize" bind:value={gameData} placeholder="Raw Output" required />
        </Label>
        <Label class="space-y-2">
            <span>Is a Playoff Game?</span>
            <div class="flex items-start">
                <Checkbox>Playoff Game</Checkbox>
            </div>
        </Label>
        <Label class="space-y-2">
            
        </Label>
        <Button type="submit" class="w-full1">Submit New Game Score</Button> 
      </form>
  </Modal>
</div>
    
<pre>
    {JSON.stringify($page,null,2)}
</pre>