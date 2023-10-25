<!-- routes/signup/+page.svelte -->
<script>
import { z } from "zod";
import { superForm } from "sveltekit-superforms/client";

export let data;


const SignupSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
const {form, errors, enhance} = superForm(data.signupForm, {
    validators: SignupSchema,
     // Reset the form upon a successful result
    resetForm: true,
    multipleSubmits: 'prevent',
	
  });

</script>

<div class="flex gap-4">
<h3 class="my-4 text-xl font-medium text-gray-900 dark:text-white underline">
	Create A New Account
</h3>
<a href="admin/login" class="my-4 text-xl font-medium text-gray-900 dark:text-white hover:dark:text-gray-300">
	Log In
</a>
</div>
<form method="POST" action="?/signupForm" use:enhance>
	
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
		  <button type="submit"  class="btn btn-primary my-4 w-full max-w-xs">Sign Up</button>
		 
</form>
<a href="admin/login">Sign in</a>