<!-- routes/signup/+page.svelte -->
<script lang="ts">
import { enhance } from '$app/forms';
import { z } from "zod";
import { superForm } from "sveltekit-superforms/client";
import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
</script>

<h1>Sign up</h1>

<form method="post" use:enhance>
	<label for="username">Username</label>
	<input name="username" id="username" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" /><br />
	<input type="submit" />
</form>
<a href="admin/login">Sign in</a>