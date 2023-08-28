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
    description: z.string()});

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
        <label class="label text-white" for="description">Team Color Code</label>
        <textarea  class="textarea textarea-accent w-full max-w-xs" type="text" name="description" placeholder="Description" required bind:value={$teamform.description}/>
        {#if $errors.description}
          <small class="text-red-500">{$errors.description}</small>
        {/if}
      </div>
      <button type="submit"  class="btn btn-primary my-4 w-full max-w-xs">Submit New Team</button>
    </form>

   </div>
  <Button on:click={() => (teamCreate = true)}>New Team Creation</Button>

  <Modal bind:open={teamCreate} size="lg" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" action="#">
      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        Create A New Team
      </h3>

      <Label class="space-y-2">
        <span>Team Name</span>
        <Input type="text" name="teamName" placeholder="Team Name" required />
      </Label>

      <Label class="space-y-2">
        <span>Team Shorthand</span>
        <Input
          type="text"
          name="teamID"
          placeholder="Team Shorthand"
          required
        />
      </Label>

      <Label class="space-y-2">
        <span>Team Owner</span>
        <Input
          type="text"
          name="teamOwner"
          placeholder="Team Owner IGN"
          required
        />
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
    <form
      class="space-y-6"
      on:submit={(newGame = _processHockeyStats(gameData))}
    >
      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        Input A New Game
      </h3>

      <Label class="space-y-2">
        <span>League</span>
        <Select class="mt-2" items={leagues} bind:value={gameLeague} />
      </Label>

      <Label class="space-y-2">
        <span>Tell Raw Output</span>
        <Textarea
          type="text"
          rows="10"
          class="resize"
          bind:value={gameData}
          placeholder="Raw Output"
          required
        />
      </Label>
      <Label class="space-y-2">
        <span>Is a Playoff Game?</span>
        <div class="flex items-start">
          <Checkbox>Playoff Game</Checkbox>
        </div>
      </Label>
      <div class="grid grid-cols-3">
        <Label class="space-y-2">
          <span>Home Team Goalie</span>
          {#if gameLeague == 1}
            <Select
              class="mt-2"
              items={bhlGoalies}
              bind:value={homeTeamGoalie1}
            />
          {:else if gameLeague == 2}
            <Select
              class="mt-2"
              items={namhlGoalies}
              bind:value={homeTeamGoalie1}
            />
          {:else if gameLeague == 3}
            <Select
              class="mt-2"
              items={jbhlGoalies}
              bind:value={homeTeamGoalie1}
            />
          {/if}
        </Label>
        <Label class="space-y-2">
          <span>Saves</span>
          <Input
            type="number"
            name="homeTeamGoalie1saves"
            placeholder="Saves"
            required
          />
        </Label>
        <Label class="space-y-2">
          <span>Shots Against</span>
          <Input
            type="number"
            name="homeTeamGoalie1shotsAgainst"
            placeholder="Shots Against"
            required
          />
        </Label>
      </div>
        <div class="grid grid-cols-3">
          <Label class="space-y-2">
            <span>Home Team Goalie2</span>
            {#if gameLeague == 1}
              <Select
                class="mt-2"
                items={bhlGoalies}
                bind:value={homeTeamGoalie2}
              />
            {:else if gameLeague == 2}
              <Select
                class="mt-2"
                items={namhlGoalies}
                bind:value={homeTeamGoalie2}
              />
            {:else if gameLeague == 3}
              <Select
                class="mt-2"
                items={jbhlGoalies}
                bind:value={homeTeamGoalie2}
              />
            {/if}
          </Label>
          <Label class="space-y-2">
            <span>Saves</span>
            <Input
              type="number"
              name="homeTeamGoalie2saves"
              placeholder="Saves"
              
            />
          </Label>
          <Label class="space-y-2">
            <span>Shots Against</span>
            <Input
              type="number"
              name="homeTeamGoalie2shotsAgainst"
              placeholder="Shots Against"
              
            />
          </Label>
        </div>
        <div class="grid grid-cols-3">
          <Label class="space-y-2">
            <span>Home Team Goalie3</span>
            {#if gameLeague == 1}
              <Select
                class="mt-2"
                items={bhlGoalies}
                bind:value={homeTeamGoalie3}
              />
            {:else if gameLeague == 2}
              <Select
                class="mt-2"
                items={namhlGoalies}
                bind:value={homeTeamGoalie3}
              />
            {:else if gameLeague == 3}
              <Select
                class="mt-2"
                items={jbhlGoalies}
                bind:value={homeTeamGoalie3}
              />
            {/if}
          </Label>
          <Label class="space-y-2">
            <span>Saves</span>
            <Input
              type="number"
              name="homeTeamGoalie3saves"
              placeholder="Saves"
              
            />
          </Label>
          <Label class="space-y-2">
            <span>Shots Against</span>
            <Input
              type="number"
              name="homeTeamGoalie3shotsAgainst"
              placeholder="Shots Against"
              
            />
          </Label>
        </div>

        <div class="grid grid-cols-3">
          <Label class="space-y-2">
            <span>Away Team Goalie</span>
            {#if gameLeague == 1}
              <Select
                class="mt-2"
                items={bhlGoalies}
                bind:value={awayTeamGoalie1}
              />
            {:else if gameLeague == 2}
              <Select
                class="mt-2"
                items={namhlGoalies}
                bind:value={homeTeamGoalie1}
              />
            {:else if gameLeague == 3}
              <Select
                class="mt-2"
                items={jbhlGoalies}
                bind:value={homeTeamGoalie1}
              />
            {/if}
          </Label>
          <Label class="space-y-2">
            <span>Saves</span>
            <Input type="number" name="saves" placeholder="Saves"  required/>
          </Label>
          <Label class="space-y-2">
            <span>Shots Against</span>
            <Input
              type="number"
              name="shotsAgainst"
              placeholder="Shots Against"
              required
            />
          </Label>
        </div>
        <div class="grid grid-cols-3">
          <Label class="space-y-2">
            <span>Away Team Goalie2</span>
            {#if gameLeague == 1}
              <Select
                class="mt-2"
                items={bhlGoalies}
                bind:value={awayTeamGoalie2}
              />
            {:else if gameLeague == 2}
              <Select
                class="mt-2"
                items={namhlGoalies}
                bind:value={awayTeamGoalie2}
              />
            {:else if gameLeague == 3}
              <Select
                class="mt-2"
                items={jbhlGoalies}
                bind:value={awayTeamGoalie2}
              />
            {/if}
          </Label>
          <Label class="space-y-2">
            <span>Saves</span>
            <Input
              type="number"
              name="awayTeamGoalie2saves"
              placeholder="Saves"
              
            />
          </Label>
          <Label class="space-y-2">
            <span>Shots Against</span>
            <Input
              type="number"
              name="awayTeamGoalie2shotsAgainst"
              placeholder="Shots Against"
              
            />
          </Label>
        </div>
        <div class="grid grid-cols-3">
          <Label class="space-y-2">
            <span>Away Team Goalie3</span>
            {#if gameLeague == 1}
              <Select
                class="mt-2"
                items={bhlGoalies}
                bind:value={awayTeamGoalie3}
              />
            {:else if gameLeague == 2}
              <Select
                class="mt-2"
                items={namhlGoalies}
                bind:value={awayTeamGoalie3}
              />
            {:else if gameLeague == 3}
              <Select
                class="mt-2"
                items={jbhlGoalies}
                bind:value={awayTeamGoalie3}
              />
            {/if}
          </Label>
          <Label class="space-y-2">
            <span>Saves</span>
            <Input
              type="number"
              name="awayTeamGoalie3saves"
              placeholder="Saves"
              
            />
          </Label>
          <Label class="space-y-2">
            <span>Shots Against</span>
            <Input
              type="number"
              name="awayTeamGoalie3shotsAgainst"
              placeholder="Shots Against"
              
            />
          </Label>
        </div>
        <Button type="submit" class="w-full1">Submit New Game Score</Button>
    </form>
  </Modal>
</div>

<pre>
    {JSON.stringify($page, null, 2)}
</pre>
