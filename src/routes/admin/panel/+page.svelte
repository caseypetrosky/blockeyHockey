<script>
  import { page } from "$app/stores";
  import { z } from "zod";
  
  export let data;
  import {
    Button,
    Modal,
    Label,
    Input,
    Checkbox,
    Select,
    Textarea,
  } from "flowbite-svelte";
  import { _processHockeyStats } from "./+page.js";
  import { superForm } from "sveltekit-superforms/client";
  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  import AutoComplete from 'simple-svelte-autocomplete';


  let bhlGoalies = [];
  
// Define the columns for the player table
    const columns = [
      { key: 'username', label: 'Username' },
      { key: 'number', label: 'Number' },
      { key: 'teamId', label: 'Team ID' },
      { key: 'goalie', label: 'Goalie' },
      {key: 'awards', label: 'Awards'},
      {key: 'leagueRoles', label: 'League Roles'},
      { key: 'contractType', label: 'Contract Type' },
      { key: 'contractLength', label: 'Contract Length' },
      { key: 'contractPrice', label: 'Contract Price' },
    ];
    
// Define the validation schema for creating a new player
  const newPlayerSchema = z.object({
    username: z.string().min(3).max(16),
    number: z.number().min(0).max(99),
    teamId: z.string().min(1).max(4),
    goalie: z.boolean(),
    contractType: z.enum(['Pro', 'Superstar', 'Amateur']),
    contractLength: z.number().min(1).max(3),
    contractPrice: z.number().min(1500).max(15000),
});

  // Define the validation schema for creating a new team
const newTeamSchema = z.object({
    name: z.string().min(3),
    leagueId: z.number(),
    team_owner: z.string().min(3),
    color: z.string().min(3),
    id: z.string().min(1).max(4),
    description: z.string()
});

// Define the validation schema for creating a new game
const newGameScehma = z.object({
    gameTellRaw: z.string(),
    leagueId: z.number(),
    isPlayoffs: z.boolean(),
    homeTeamGoalie1: z.object({
      saves: z.number(),
      shotsAgainst: z.number(),
    }),
    homeTeamGoalie2: z.object({
      username: z.string(),
      saves: z.number(),
      shotsAgainst: z.number(),
    }),
    homeTeamGoalie3: z.object({
      username: z.string(),
      saves: z.number(),
      shotsAgainst: z.number(),
    }),
    awayTeamGoalie1: z.object({
      username: z.string(),
      saves: z.number(),
      shotsAgainst: z.number(),
    }),
    awayTeamGoalie2: z.object({
      username: z.string(),
      saves: z.number(),
      shotsAgainst: z.number(),
    }),
    awayTeamGoalie3: z.object({
      username: z.string(),
      saves: z.number(),
      shotsAgainst: z.number(),
    }),

})




// Create a new superform for the new player form
  const {form, errors, enhance} = superForm(data.newPlayerForm, {
    validators: newPlayerSchema,
      // Reset the form upon a successful result
    resetForm: true,
    // On ActionResult error, render the nearest +error.svelte page
    onError: 'apply',
    // No message when navigating away from a modified form
    taintedMessage: null,
    multipleSubmits: 'prevent',

  });

  // Create a new superform for the new team form
  const {form:teamform,erors: teamErrors,enhance: teamenhance} = superForm(data.newTeamForm, {
    validators: newTeamSchema,
      // Reset the form upon a successful result
    resetForm: true,
    // On ActionResult error, render the nearest +error.svelte page
    onError: 'apply',
    // No message when navigating away from a modified form
    taintedMessage: null,
    multipleSubmits: 'prevent',

  });

  // Create a new superform for the new game form
  const{form:gameForm, errors:gameErrors, enhance:gameEnhance} = superForm(data.newGameForm, {
    dataType: 'json',
    validators: newGameScehma,
     // Reset the form upon a successful result
     resetForm: true,
    // On ActionResult error, render the nearest +error.svelte page
    onError: 'apply',
    // No message when navigating away from a modified form
    taintedMessage: null,
    multipleSubmits: 'prevent',
  })

  
// Initialize variables for storing game data and new game data
  let gameData = ``;
  let newGame = ``;

  // Initialize variables for showing and hiding modals
  let playerCreate = false;
  let teamCreate = false;
  let gameCreate = false;

  // Initialize variables for selected team, goalie, contract type, contract length, team league, and game league
  let selected;
  let teams = [];
  $: {
    teams = data.team
      ? data.team.map((team) => ({ value: team.id, name: team.name }))
      : [];
  }

  // Goalie select
  //select goalies in the data.goalies array that are in the BHL

  // Contract select
  let contractType;
  let contractTypes = [
    { value: "Superstar", name: "Superstar" },
    { value: "Pro", name: "Pro" },
    { value: "Amateur", name: "Amateur" },
  ];
  let contractLength;
  let lengths = [
    { value:1, name: "1 season" },
    { value:2, name: "2 seasons" },
    { value:3, name: "3 seasons" },
  ];
  // Team League
  let teamLeague;
  let leagues = [
    { value:1, name: "BHL" },
    { value:2, name: "NAMHL" },
    { value:3, name: "JBHL" },
  ];
  let gameLeague;

  let playerLeague = "1";

  // Initialize variables for showing and hiding certain form fields based on user input
  let homegoalie2visible = false;
  let homegoalie3visible = false;
  let awaygoalie2visible = false;
  let awaygoalie3visible = false;

  // Define functions for showing and hiding certain form fields based on user input
  function homeGoalie2() {
    homegoalie2visible = !homegoalie2visible;
  }
  function homeGoalie3() {
    homegoalie3visible = !homegoalie3visible;
  }
  function awayGoalie2() {
    awaygoalie2visible = !awaygoalie2visible;
  }
  function awayGoalie3() {
    awaygoalie3visible = !awaygoalie3visible;
  }

  //create an update player function for the table

    // Client-side script
    
   

</script>

<div class="container mx-auto mt-4 text-white">

<div class="flex gap-4">
  <h1 class="text-3xl font-semibold text-gray-900 dark:text-white underline">
    Admin Panel
  </h1>
  <a href="/admin/panel/playerUpdate" class="text-3xl font-semibold text-gray-900 dark:text-white">
    Player editing table
  </a>
</div>

   <div class="grid grid-cols-2">

      
      <form method="POST" action="?/newPlayerForm" use:enhance>
        <h3 class="my-4 text-xl font-medium text-gray-900 dark:text-white">
          Create A New Player
        </h3>
          <div class="form-control w-full max-w-xs">
            <label class="label text-white" for="username">Username</label>
            <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="username" placeholder="Username" required bind:value={$form.username}/>
            {#if $errors.username}
              <small class="text-red-500">{$errors.username}</small>
            {/if}
          </div>
          
          <div class="form-control w-full max-w-xs">
            <label class="label text-white" for="number">Number</label>
            <input class="input input-bordered input-accent w-full max-w-xs" type="number" name="number" placeholder="Number" required bind:value={$form.number}/>
            {#if $errors.number}
              <small class="text-red-500">{$errors.number}</small>
            {/if}
          </div>
          
          <div class="w-full max-w-xs">
          <label for="teamId">Team ID</label>
            <select class="select select-accent w-full max-w-xs" name="teamId" bind:value={$form.teamId}>
              {#each teams as team}
                  <option value={team.value}>{team.name}</option>
              {/each}
            </select>
            {#if $errors.teamId}
                  <small class="text-red-500">{$errors.teamId}</small>
            {/if}
              
        </div>
        <div class="w-full max-w-xs form-control">
          <label class="label text-white cursor-pointer" for="goalie">
            <span class="label-text">Is this player a goalie?</span> 
            <input name="goalie" type="checkbox" class="checkbox" bind:checked={$form.goalie}/>
          </label>
          {#if $errors.goalie}
            <small class="text-red-500">{$errors.goalie}</small>
          {/if}

        <div class="w-full max-w-xs">
          <label for="contractPrice">Contract Price</label>
          <input class="input input-bordered input-accent w-full max-w-xs" type="number" name="contractPrice" placeholder="Contract Price" required bind:value={$form.contractPrice}/>
          {#if $errors.contractPrice}
            <small class="text-red-500">{$errors.contractPrice}</small>
          {/if}
        </div>
        <div class="w-full max-w-xs">
          <label for="contractType">Contract Type</label>
          <select class="select select-accent w-full max-w-xs" name="contractType" bind:value={$form.contractType}>
            {#each contractTypes as contractType}
              <option value={contractType.value}>{contractType.name}</option>
            {/each}
          </select>
          {#if $errors.contractType}
                  <small class="text-red-500">{$errors.contractType}</small>
            {/if}
        </div>
        <div class="w-full max-w-xs">
          <label for="contractLength">Contract Length</label>
          <select class="select select-accent w-full max-w-xs" name="contractLength" bind:value={$form.contractLength}>
            {#each lengths as length}
              <option value={length.value}>{length.name}</option>
            {/each}
          </select>
          {#if $errors.contractLength}
                  <small class="text-red-500">{$errors.contractLength}</small>
            {/if}
        </div>
        <button type="submit"  class="btn btn-primary my-4 w-full max-w-xs">Submit New Player</button>
    </form>

    <form method="POST" action="?/newTeamForm" use:teamenhance>
      <h3 class="my-4 text-xl font-medium text-gray-900 dark:text-white">
        Create A New Team
      </h3>
      <div class="form-control w-full max-w-xs">
        <label class="label text-white" for="teamName">Team Name</label>
        <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="teamName" placeholder="Team Name" required bind:value={$teamform.name}/>
        
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label text-white" for="teamID">Team Shorthand</label>
        <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="teamID" placeholder="Team Shorthand" required bind:value={$teamform.id}/>
        
      </div>
      <div class="w-full max-w-xs">
        <label for="leagueId">Team League</label>
        <select class="select select-accent w-full max-w-xs" name="leagueId" bind:value={$teamform.leagueId}>
          {#each leagues as league}
            <option value={league.value}>{league.name}</option>
          {/each}
        </select>
        
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label text-white" for="team_owner">Team Owner</label>
        <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="team_owner" placeholder="Team Owner" required bind:value={$teamform.team_owner}/>
        
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label text-white" for="color">Team Color Code</label>
        <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="color" placeholder="#FFFFFF" required bind:value={$teamform.color}/>
        
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label text-white" for="description">Team Page Description</label>
        <textarea  class="textarea textarea-accent w-full max-w-xs" type="text" name="description" placeholder="Description" required bind:value={$teamform.description}/>
        
      </div>
      <button type="submit"  class="btn btn-primary my-4 w-full max-w-xs">Submit New Team</button>
    </form>

   </div>

   <form method="POST" class="" action="?/newGameForm" use:gameEnhance>
    <h3 class="my-4 text-xl font-medium text-gray-900 dark:text-white">
      Input a new Game
    </h3>
    <div class="w-full ">
      <label for="gameleagueId">Game League</label>
      <select class="select select-accent w-full " name="gameleagueId" bind:value={$gameForm.leagueId}>
        {#each leagues as league}
          <option value={league.value}>{league.name}</option>
        {/each}
      </select>
      {#if $gameErrors.leagueId}
              <small class="text-red-500">{$gameErrors.leagueId}</small>
        {/if}
    </div>

    

    <div class="w-fullform-control">
      <label class="label text-white cursor-pointer" for="playoffs">
        <span class="label-text">Is this a playoff game?</span> 
        <input name="playoffs" type="checkbox" class="checkbox" bind:checked={$gameForm.isPlayoffs}/>
      </label>
      {#if $gameErrors.isPlayoffs}
        <small class="text-red-500">{$gameErrors.isPlayoffs}</small>
      {/if}
    </div>
    <div class="form-control w-full ">
      <label class="label text-white" for="tellraw">Tell Raw Output</label>
      <textarea  class="textarea textarea-accent w-full" type="text" name="tellraw" placeholder="Tell Raw" required bind:value={$gameForm.gameTellRaw}/>
      {#if $gameErrors.gameTellRaw}
        <small class="text-red-500">{$gameErrors.gameTellRaw}</small>
      {/if}
    </div>
    <div class="form-control w-full gap-3">
      <label class="label text-white" for="homeTeamGoalie1">Home Team Goalie 1</label>
        
      <AutoComplete
        class="input input-bordered input-accent w-full"
        items={data.goalies.filter((goalie) => goalie.team.leagueId === $gameForm.leagueId).map((goalie) => goalie.username)}
        bind:value={$gameForm.homeTeamGoalie1.username}
        placeholder="Home Team Goalie 1"
        required
      ></AutoComplete>
      {#if $gameErrors.homeTeamGoalie1username}
          <small class="text-red-500">{$gameErrors.homeTeamGoalie1username}</small>
        {/if}
      <div class="flex flex-row gap-3">
          <label class="label text-white" for="homeTeamGoalie1saves">Home Team Goalie 1 Saves</label>
          <input class="input input-bordered input-accent max-w-xs" type="number" name="homeTeamGoalie1saves" placeholder="Saves" required bind:value={$gameForm.homeTeamGoalie1.saves}/>
          {#if $gameErrors.homeTeamGoalie1saves}
          
            <small class="text-red-500">{$gameErrors.homeTeamGoalie1saves}</small>
          {/if}
          <label class="label text-white" for="homeTeamGoalie1shotsAgainst">Home Team Goalie 1 Shots Against</label>
          <input class="input input-bordered input-accent max-w-xs" type="number" name="homeTeamGoalie1shotsAgainst" placeholder="Shots Against" required bind:value={$gameForm.homeTeamGoalie1.shotsAgainst}/>
          {#if $gameErrors.homeTeamGoalie1shotsAgainst}
            <small class="text-red-500">{$gameErrors.homeTeamGoalie1shotsAgainst}</small>
          {/if}
        </div>
    </div>
    
<button on:click={homeGoalie2} type="button" class="btn btn-primary">Show Home Goalie 2</button>
    <button on:click={homeGoalie3} type="button" class="btn btn-primary">Show Home Goalie 3</button>


{#if homegoalie2visible}
    <div class="form-control w-full gap-3">
      <label class="label text-white" for="homeTeamGoalie2">Home Team Goalie 2</label>
      <AutoComplete
        class="input input-bordered input-accent w-full"
        items={data.goalies.filter((goalie) => goalie.team.leagueId === $gameForm.leagueId).map((goalie) => goalie.username)}
        bind:value={$gameForm.homeTeamGoalie2.username}
        placeholder="Home Team Goalie 2"
        ></AutoComplete>
      {#if $gameErrors.homeTeamGoalie2username}
        <small class="text-red-500">{$gameErrors.homeTeamGoalie2username}</small>
      {/if}
      
      <div class="flex flex-row gap-3">
          <label class="label text-white" for="homeTeamGoalie2saves">Home Team Goalie 2 Saves</label>
          <input class="input input-bordered input-accent max-w-xs" type="number" name="homeTeamGoalie2saves" placeholder="Saves" required bind:value={$gameForm.homeTeamGoalie2.saves}/>
          {#if $gameErrors.homeTeamGoalie2saves}
            <small class="text-red-500">{$gameErrors.homeTeamGoalie2saves}</small>
          {/if}
          <label class="label text-white" for="homeTeamGoalie2shotsAgainst">Home Team Goalie 2 Shots Against</label>
          <input class="input input-bordered input-accent max-w-xs" type="number" name="homeTeamGoalie2shotsAgainst" placeholder="Shots Against" required bind:value={$gameForm.homeTeamGoalie2.shotsAgainst}/>
          {#if $gameErrors.homeTeamGoalie2shotsAgainst}
            <small class="text-red-500">{$gameErrors.homeTeamGoalie2shotsAgainst}</small>
          {/if}
        </div>
    </div>
{/if}

{#if homegoalie3visible}
    <div class="form-control w-full gap-3">
      <label class="label text-white" for="homeTeamGoalie3">Home Team Goalie 3</label>
      <AutoComplete
        class="input input-bordered input-accent w-full"
        items={data.goalies.filter((goalie) => goalie.team.leagueId === $gameForm.leagueId).map((goalie) => goalie.username)}
        bind:value={$gameForm.homeTeamGoalie3.username}
        placeholder="Home Team Goalie 3"></AutoComplete>
      {#if $gameErrors.homeTeamGoalie3username}
        <small class="text-red-500">{$gameErrors.homeTeamGoalie3username}</small>
      {/if}
      <div class="flex flex-row gap-3">
          <label class="label text-white" for="homeTeamGoalie3saves">Home Team Goalie 3 Saves</label>
          <input class="input input-bordered input-accent max-w-xs" type="number" name="homeTeamGoalie3saves" placeholder="Saves" required bind:value={$gameForm.homeTeamGoalie3.saves}/>
          {#if $gameErrors.homeTeamGoalie3saves}
                      <small class="text-red-500">{$gameErrors.homeTeamGoalie3saves}</small>
                    {/if}
                    <label class="label text-white" for="homeTeamGoalie3shotsAgainst">Home Team Goalie 3 Shots Against</label>
                    <input class="input input-bordered input-accent max-w-xs" type="number" name="homeTeamGoalie3shotsAgainst" placeholder="Shots Against" required bind:value={$gameForm.homeTeamGoalie3.shotsAgainst}/>
                    {#if $gameErrors.homeTeamGoalie3shotsAgainst}
                      <small class="text-red-500">{$gameErrors.homeTeamGoalie3shotsAgainst}</small>
                    {/if}
                  </div>
              </div>
          {/if}
              <div class="form-control w-full gap-3">
                <label class="label text-white" for="awayTeamGoalie1">Away Team Goalie 1</label>
                <AutoComplete
                  class="input input-bordered input-accent w-full"
                  items={data.goalies.filter((goalie) => goalie.team.leagueId === $gameForm.leagueId).map((goalie) => goalie.username)}
                  bind:value={$gameForm.awayTeamGoalie1.username}
                  placeholder="Away Team Goalie 1"
                  required
                  ></AutoComplete>
                {#if $gameErrors.awayTeamGoalie1username}
                  <small class="text-red-500">{$gameErrors.awayTeamGoalie1username}</small>
                {/if}
                <div class="flex flex-row gap-3">
                    <label class="label text-white" for="awayTeamGoalie1saves">Away Team Goalie 1 Saves</label>
                    <input class="input input-bordered input-accent max-w-xs" type="number" name="awayTeamGoalie1saves" placeholder="Saves" required bind:value={$gameForm.awayTeamGoalie1.saves}/>
                    {#if $gameErrors.awayTeamGoalie1saves}
                      <small class="text-red-500">{$gameErrors.awayTeamGoalie1saves}</small>
                    {/if}
                    <label class="label text-white" for="awayTeamGoalie1shotsAgainst">Away Team Goalie 1 Shots Against</label>
                    <input class="input input-bordered input-accent max-w-xs" type="number" name="awayTeamGoalie1shotsAgainst" placeholder="Shots Against" required bind:value={$gameForm.awayTeamGoalie1.shotsAgainst}/>
                    {#if $gameErrors.awayTeamGoalie1shotsAgainst}
                      <small class="text-red-500">{$gameErrors.awayTeamGoalie1shotsAgainst}</small>
                    {/if}
                  </div>
              </div>
          <button on:click={awayGoalie2} type="button" class="btn btn-primary">Show Away Goalie 2</button>
              <button on:click={awayGoalie3} type="button" class="btn btn-primary">Show Away Goalie 3</button>

          {#if awaygoalie2visible}
              <div class="form-control w-full gap-3">
                <label class="label text-white" for="awayTeamGoalie2">Away Team Goalie 2</label>
                <AutoComplete
                  class="input input-bordered input-accent w-full"
                  items={data.goalies.filter((goalie) => goalie.team.leagueId === $gameForm.leagueId).map((goalie) => goalie.username)}
                  bind:value={$gameForm.awayTeamGoalie2.username}
                  placeholder="Away Team Goalie 2"></AutoComplete>
                {#if $gameErrors.awayTeamGoalie2username}
                  <small class="text-red-500">{$gameErrors.awayTeamGoalie2username}</small>
                {/if}
                <div class="flex flex-row gap-3">
                    <label class="label text-white" for="awayTeamGoalie2saves">Away Team Goalie 2 Saves</label>
                    <input class="input input-bordered input-accent max-w-xs" type="number" name="awayTeamGoalie2saves" placeholder="Saves" required bind:value={$gameForm.awayTeamGoalie2.saves}/>
                    {#if $gameErrors.awayTeamGoalie2saves}
                      <small class="text-red-500">{$gameErrors.awayTeamGoalie2saves}</small>
                    {/if}
                    <label class="label text-white" for="awayTeamGoalie2shotsAgainst">Away Team Goalie 2 Shots Against</label>
                    <input class="input input-bordered input-accent max-w-xs" type="number" name="awayTeamGoalie2shotsAgainst" placeholder="Shots Against" required bind:value={$gameForm.awayTeamGoalie2.shotsAgainst}/>
                    {#if $gameErrors.awayTeamGoalie2shotsAgainst}
                      <small class="text-red-500">{$gameErrors.awayTeamGoalie2shotsAgainst}</small>
                    {/if}
                  </div>
              </div>
          {/if}

          {#if awaygoalie3visible}

              <div class="form-control w-full gap-3">
                <label class="label text-white" for="awayTeamGoalie3">Away Team Goalie 3</label>
                <AutoComplete
                  class="input input-bordered input-accent w-full"
                  items={data.goalies.filter((goalie) => goalie.team.leagueId === $gameForm.leagueId).map((goalie) => goalie.username)}
                  bind:value={$gameForm.awayTeamGoalie3.username}
                  placeholder="Away Team Goalie 3"></AutoComplete>
                {#if $gameErrors.awayTeamGoalie3username}
                  <small class="text-red-500">{$gameErrors.awayTeamGoalie3username}</small>
                {/if}
                <div class="flex flex-row gap-3">
                    <label class="label text-white" for="awayTeamGoalie3saves">Away Team Goalie 3 Saves</label>
                    <input class="input input-bordered input-accent max-w-xs" type="number" name="awayTeamGoalie3saves" placeholder="Saves" required bind:value={$gameForm.awayTeamGoalie3.saves}/>
                    {#if $gameErrors.awayTeamGoalie3saves}
                      <small class="text-red-500">{$gameErrors.awayTeamGoalie3saves}</small>
                    {/if}
                    <label class="label text-white" for="awayTeamGoalie3shotsAgainst">Away Team Goalie 3 Shots Against</label>
                    <input class="input input-bordered input-accent max-w-xs" type="number" name="awayTeamGoalie3shotsAgainst" placeholder="Shots Against" required bind:value={$gameForm.awayTeamGoalie3.shotsAgainst}/>
                    {#if $gameErrors.awayTeamGoalie3shotsAgainst}
                      <small class="text-red-500">{$gameErrors.awayTeamGoalie3shotsAgainst}</small>
                    {/if}
                  </div>
              </div>
          {/if}

    <button type="submit"  class="btn btn-primary my-4 w-full max-w-xs">Submit New Game</button>

   </form>



</div>

