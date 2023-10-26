<script>
    import { page } from '$app/stores';
    import { superForm } from "sveltekit-superforms/client";
    import {z} from 'zod';

    export let data;


    const playerSchema = z.object({
    username: z.string(),
    number: z.number().min(0).max(99),
    teamId: z.string().min(1).max(4),
    goalie: z.boolean(),
    awards: z.string(),
    league_roles: z.string(),
    contractTier: z.enum(['Pro', 'Superstar', 'Amateur']),
    contractLength: z.number().min(1).max(3),
    contractPrice: z.number().min(1500).max(15000),
});


    const { form, errors, enhance, message } = superForm(data.form, {
      dataType: 'json',
      validators: playerSchema,
      // On ActionResult error, render the nearest +error.svelte page
      onError: 'apply',
      // No message when navigating away from a modified form
      taintedMessage: null,
      multipleSubmits: 'prevent',
      // On ActionResult success, redirect to the nearest +success.svelte page
      

    }
  );
  let contractTypes = [
    { value: "Superstar", name: "Superstar" },
    { value: "Pro", name: "Pro" },
    { value: "Amateur", name: "Amateur" },
  ];
  let lengths = [
    { value:1, name: "1 season" },
    { value:2, name: "2 seasons" },
    { value:3, name: "3 seasons" },
  ];
  $form.uuid = $page.params.uuid;
</script>


{#if $message}
  <h3 class:invalid={$page.status >= 400}>{$message}</h3>
{/if}
<div class="flex justify-center">
    <a class=" btn btn-primary my-4 w-full max-w-xs" href="/admin/panel/playerUpdate">Back to Admin Panel</a>
</div>
<!--center the form-->
<div class="flex justify-center">
    
<form method="POST" action="?/updatePlayerForm" use:enhance>
   
    <h3 class="my-4 text-xl font-medium text-gray-900 dark:text-white">
        Edit the selected player
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
            {#each data.teams as team}
                <option value={team.id}>{team.name}</option>
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
        </div>

    <div class="w-full max-w-xs form-control">
        <label for="awards">Player awards</label>
        <textarea  class="textarea textarea-accent w-full max-w-xs" type="text" name="awards" placeholder="Player Awards" bind:value={$form.awards}/>
        {#if $errors.awards}
          <small class="text-red-500">{$errors.awards}</small>
        {/if}
    </div>
        <div class="w-full max-w-xs form-control">
        <label for="roles">Player roles</label>
        <textarea  class="textarea textarea-accent w-full max-w-xs" type="text" name="Roles" placeholder="Player Roles" bind:value={$form.league_roles}/>
        {#if $errors.league_roles}
          <small class="text-red-500">{$errors.league_roles}</small>
        {/if}
    </div>


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
      
      <button type="submit"  class="btn btn-primary my-4 w-full max-w-xs">Submit Edits</button>
</form>
</div>