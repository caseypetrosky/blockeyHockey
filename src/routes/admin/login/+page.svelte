<script>
  import { z } from "zod";
  import { superForm } from "sveltekit-superforms/client";
  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  export let data;
  
  
  const LoginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  });
  const {form, errors, enhance} = superForm(data.LoginForm, {
      validators: LoginSchema,
       // Reset the form upon a successful result
      resetForm: true,
      multipleSubmits: 'prevent',
    
    });
  
  </script>
 


<div class="flex gap-4">
  <a href="/admin" class="my-4 text-xl font-medium text-gray-900 dark:text-white hover:dark:text-gray-300">
    Create A New Account
  </a>
  <h3  class="my-4 text-xl font-medium text-gray-900 dark:text-white underline" >
    Log In
  </h3>
  </div>

  <form method="POST" action="?/LoginForm" use:enhance>
    
		<div class="form-control w-full max-w-xs">
		  <label class="label text-white" for="username">Username</label>
		  <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="username" placeholder="Username" required bind:value={$form.username}/>
		  {#if $errors.username}
			<small class="text-red-500">{$errors.username}</small>
		  {/if}
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="label text-white" for="password">Password</label>
			<input class="input input-bordered input-accent w-full max-w-xs" type="text" name="password" placeholder="password" required bind:value={$form.password}/>
			{#if $errors.password}
			  <small class="text-red-500">{$errors.password}</small>
			{/if}
		  </div>
		  <button type="submit"  class="btn btn-primary my-4 w-full max-w-xs">Log in</button>
		 
  </form>
