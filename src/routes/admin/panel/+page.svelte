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
    

  const newPlayerSchema = z.object({
    username: z.string().min(3).max(16),
    number: z.number().min(0).max(99),
    teamId: z.string().min(1).max(4),
    goalie: z.boolean(),
    contractType: z.enum(['Pro', 'Superstar', 'Amateur']),
    contractLength: z.number().min(1).max(3),
    contractPrice: z.number().min(1500).max(15000),
});
const newTeamSchema = z.object({
    name: z.string().min(3),
    leagueId: z.number(),
    team_owner: z.string().min(3),
    color: z.string().min(3),
    id: z.string().min(1).max(4),
    description: z.string()
});

const newGameScehma = z.object({
    gameTellRaw: z.string(),
    leagueId: z.number(),
    isPlayoffs: z.boolean(),
    homeTeamGoalie1: z.object({
      username: z.string(),
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




  const {form, errors, enhance} = superForm(data.newPlayerForm, {
    taintedMessage: "This field has been changed",
    validators: newPlayerSchema,
     // Reset the form upon a successful result
    resetForm: true,
    multipleSubmits: 'prevent',

  });
  const {form:teamform,erors: teamerrors,enhance: teamenhance} = superForm(data.newTeamForm, {
    taintedMessage: "This field has been changed",
    validators: newTeamSchema,
     // Reset the form upon a successful result
    resetForm: true,
    multipleSubmits: 'prevent',
  });
  const{form:gameForm, errors:gameErrors, enhance:gameEnhance} = superForm(data.newGameForm, {
    dataType: 'json',
    taintedMessage: "This field has been changed",
    validators: newGameScehma,
    resetForm: true,
    multipleSubmits: 'prevent',
  })

  

  let gameData = ``;
  let newGame = ``;

  //modals
  let playerCreate = false;
  let teamCreate = false;
  let gameCreate = false;

  // Team select
  let selected;
  let teams = [];
  $: {
    teams = data.team
      ? data.team.map((team) => ({ value: team.id, name: team.name }))
      : [];
  }

  // Goalie select
  let bhlGoalies = [];
  //select goalies in the data.goalies array that are in the BHL
  $: {
    bhlGoalies = data.goalies
      ? data.goalies
          .filter((goalie) => goalie.team.leagueId == 1)
          .map((goalie) => ({ value: goalie.uuid, name: goalie.username }))
      : [];
  }
  let namhlGoalies = [];
  //select goalies in the data.goalies array that are in the NAMHL
  $: {
    namhlGoalies = data.goalies
      ? data.goalies
          .filter((goalie) => goalie.team.leagueId == 2)
          .map((goalie) => ({ value: goalie.uuid, name: goalie.username }))
      : [];
  }
  let jbhlGoalies = [];
  //select goalies in the data.goalies array that are in the JBHL
  $: {
    jbhlGoalies = data.goalies
      ? data.goalies
          .filter((goalie) => goalie.team.leagueId == 3)
          .map((goalie) => ({ value: goalie.uuid, name: goalie.username }))
      : [];
  }

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
  let homeTeamGoalie1;
  let homeTeamGoalie2;
  let homeTeamGoalie3;

  let awayTeamGoalie1;
  let awayTeamGoalie2;
  let awayTeamGoalie3;
  let playerLeague = "1";
</script>

<div class="container mx-auto mt-4 text-white">

  <SuperDebug data={$form} bind:errors={$errors} />
  <SuperDebug data={$teamform} bind:errors={$teamerrors} />
  <SuperDebug data={$gameForm} bind:errors={$gameErrors} />



  <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">
    Admin Panel
  </h1>

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
        {#if $errors.name}
          <small class="text-red-500">{$errors.name}</small>
        {/if}
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label text-white" for="teamID">Team Shorthand</label>
        <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="teamID" placeholder="Team Shorthand" required bind:value={$teamform.id}/>
        {#if $errors.id}
          <small class="text-red-500">{$errors.id}</small>
        {/if}
      </div>
      <div class="w-full max-w-xs">
        <label for="leagueId">Team League</label>
        <select class="select select-accent w-full max-w-xs" name="leagueId" bind:value={$teamform.leagueId}>
          {#each leagues as league}
            <option value={league.value}>{league.name}</option>
          {/each}
        </select>
        {#if $errors.leagueId}
                <small class="text-red-500">{$errors.leagueId}</small>
          {/if}
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label text-white" for="team_owner">Team Owner</label>
        <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="team_owner" placeholder="Team Owner" required bind:value={$teamform.team_owner}/>
        {#if $errors.team_owner}
          <small class="text-red-500">{$errors.team_owner}</small>
        {/if}
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label text-white" for="color">Team Color Code</label>
        <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="color" placeholder="#FFFFFF" required bind:value={$teamform.color}/>
        {#if $errors.color}
          <small class="text-red-500">{$errors.color}</small>
        {/if}
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label text-white" for="description">Team Page Description</label>
        <textarea  class="textarea textarea-accent w-full max-w-xs" type="text" name="description" placeholder="Description" required bind:value={$teamform.description}/>
        {#if $errors.description}
          <small class="text-red-500">{$errors.description}</small>
        {/if}
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
      {#if $errors.leagueId}
              <small class="text-red-500">{$errors.leagueId}</small>
        {/if}
    </div>
    <div class="w-fullform-control">
      <label class="label text-white cursor-pointer" for="playoffs">
        <span class="label-text">Is this a playoff game?</span> 
        <input name="playoffs" type="checkbox" class="checkbox" bind:checked={$gameForm.isPlayoffs}/>
      </label>
      {#if $errors.isPlayoffs}
        <small class="text-red-500">{$errors.isPlayoffs}</small>
      {/if}
    </div>
    <div class="form-control w-full ">
      <label class="label text-white" for="tellraw">Tell Raw Output</label>
      <textarea  class="textarea textarea-accent w-full" type="text" name="tellraw" placeholder="Tell Raw" required bind:value={$gameForm.gameTellRaw}/>
      {#if $errors.gameTellRaw}
        <small class="text-red-500">{$errors.gameTellRaw}</small>
      {/if}
    </div>
    <div class="form-control w-full gap-3">
      <label class="label text-white" for="homeTeamGoalie1">Home Team Goalie 1</label>
      <AutoComplete
        class="input input-bordered input-accent w-full"
        items={bhlGoalies.map((goalie) => goalie.name)}
        bind:value={$gameForm.homeTeamGoalie1.username}
        placeholder="Home Team Goalie 1"></AutoComplete>
      {#if $errors.homeTeamGoalie1}
        <small class="text-red-500">{$errors.homeTeamGoalie1}</small>
      {/if}
      <div class="flex flex-row gap-3">
          <label class="label text-white" for="homeTeamGoalie1saves">Home Team Goalie 1 Saves</label>
          <input class="input input-bordered input-accent max-w-xs" type="number" name="homeTeamGoalie1saves" placeholder="Saves" required bind:value={$gameForm.homeTeamGoalie1.saves}/>
          {#if $errors.homeTeamGoalie1saves}
            <small class="text-red-500">{$errors.homeTeamGoalie1saves}</small>
          {/if}
          <label class="label text-white" for="homeTeamGoalie1shotsAgainst">Home Team Goalie 1 Shots Against</label>
          <input class="input input-bordered input-accent max-w-xs" type="number" name="homeTeamGoalie1shotsAgainst" placeholder="Shots Against" required bind:value={$gameForm.homeTeamGoalie1.shotsAgainst}/>
          {#if $errors.homeTeamGoalie1shotsAgainst}
            <small class="text-red-500">{$errors.homeTeamGoalie1shotsAgainst}</small>
          {/if}
        </div>
    </div>
    
    <div class="form-control w-full gap-3">
      <label class="label text-white" for="homeTeamGoalie2">Home Team Goalie 2</label>
      <AutoComplete
        class="input input-bordered input-accent w-full"
        items={bhlGoalies.map((goalie) => goalie.name)}
        bind:value={$gameForm.homeTeamGoalie2.username}
        placeholder="Home Team Goalie 2"></AutoComplete>
      {#if $errors.homeTeamGoalie2}
        <small class="text-red-500">{$errors.homeTeamGoalie2}</small>
      {/if}
      <div class="flex flex-row gap-3">
          <label class="label text-white" for="homeTeamGoalie2saves">Home Team Goalie 2 Saves</label>
          <input class="input input-bordered input-accent max-w-xs" type="number" name="homeTeamGoalie2saves" placeholder="Saves" required bind:value={$gameForm.homeTeamGoalie2.saves}/>
          {#if $errors.homeTeamGoalie2saves}
            <small class="text-red-500">{$errors.homeTeamGoalie2saves}</small>
          {/if}
          <label class="label text-white" for="homeTeamGoalie2shotsAgainst">Home Team Goalie 2 Shots Against</label>
          <input class="input input-bordered input-accent max-w-xs" type="number" name="homeTeamGoalie2shotsAgainst" placeholder="Shots Against" required bind:value={$gameForm.homeTeamGoalie2.shotsAgainst}/>
          {#if $errors.homeTeamGoalie2shotsAgainst}
            <small class="text-red-500">{$errors.homeTeamGoalie2shotsAgainst}</small>
          {/if}
        </div>
    </div>
    <div class="form-control w-full gap-3">
      <label class="label text-white" for="homeTeamGoalie3">Home Team Goalie 3</label>
      <AutoComplete
        class="input input-bordered input-accent w-full"
        items={bhlGoalies.map((goalie) => goalie.name)}
        bind:value={$gameForm.homeTeamGoalie3.username}
        placeholder="Home Team Goalie 3"></AutoComplete>
      {#if $errors.homeTeamGoalie3}
        <small class="text-red-500">{$errors.homeTeamGoalie3}</small>
      {/if}
      <div class="flex flex-row gap-3">
          <label class="label text-white" for="homeTeamGoalie3saves">Home Team Goalie 3 Saves</label>
          <input class="input input-bordered input-accent max-w-xs" type="number" name="homeTeamGoalie3saves" placeholder="Saves" required bind:value={$gameForm.homeTeamGoalie3.saves}/>
          {#if $errors.homeTeamGoalie3saves}
            <small class="text-red-500">{$errors.homeTeamGoalie3saves}</small>
          {/if}
          <label class="label text-white" for="homeTeamGoalie3shotsAgainst">Home Team Goalie 3 Shots Against</label>
          <input class="input input-bordered input-accent max-w-xs" type="number" name="homeTeamGoalie3shotsAgainst" placeholder="Shots Against" required bind:value={$gameForm.homeTeamGoalie3.shotsAgainst}/>
          {#if $errors.homeTeamGoalie3shotsAgainst}
            <small class="text-red-500">{$errors.homeTeamGoalie3shotsAgainst}</small>
          {/if}
        </div>
    </div>
    <div class="form-control w-full gap-3">
      <label class="label text-white" for="awayTeamGoalie1">Away Team Goalie 1</label>
      <AutoComplete
        class="input input-bordered input-accent w-full"
        items={bhlGoalies.map((goalie) => goalie.name)}
        bind:value={$gameForm.awayTeamGoalie1.username}
        placeholder="Away Team Goalie 1"></AutoComplete>
      {#if $errors.awayTeamGoalie1}
        <small class="text-red-500">{$errors.awayTeamGoalie1}</small>
      {/if}
      <div class="flex flex-row gap-3">
          <label class="label text-white" for="awayTeamGoalie1saves">Away Team Goalie 1 Saves</label>
          <input class="input input-bordered input-accent max-w-xs" type="number" name="awayTeamGoalie1saves" placeholder="Saves" required bind:value={$gameForm.awayTeamGoalie1.saves}/>
          {#if $errors.awayTeamGoalie1saves}
            <small class="text-red-500">{$errors.awayTeamGoalie1saves}</small>
          {/if}
          <label class="label text-white" for="awayTeamGoalie1shotsAgainst">Away Team Goalie 1 Shots Against</label>
          <input class="input input-bordered input-accent max-w-xs" type="number" name="awayTeamGoalie1shotsAgainst" placeholder="Shots Against" required bind:value={$gameForm.awayTeamGoalie1.shotsAgainst}/>
          {#if $errors.awayTeamGoalie1shotsAgainst}
            <small class="text-red-500">{$errors.awayTeamGoalie1shotsAgainst}</small>
          {/if}
        </div>
    </div>

    <button type="submit"  class="btn btn-primary my-4 w-full max-w-xs">Submit New Game</button>

   </form>
  <div class="overflow-x-auto">
   <table class="table  text-white">
    <thead>
      {#each columns as col}
        <th class="text-white text-lg">{col.label}</th>
      {/each}
    </thead>
    <tbody>
      {#each data.players as player}
        <tr class="hover">
          <td >{player.username}</td>
          <td contenteditable="true" on:blur={handleBlur}>{player.number}</td>
          <td>{player.teamId}</td>
          <td>{player.goalie}</td>
          <td>{player.awards}</td>
          <td>{player.league_roles}</td>
          <td>{player.contractTier}</td>
          <td>{player.contractLength}</td>
          <td>{player.contractPrice}</td>
        </tr>
      {/each}
    
   </table>
</div>



</div>

<pre>
    {JSON.stringify($page, null, 2)}
</pre>
