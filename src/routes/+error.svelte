<script>
	import { page } from '$app/stores';
	import { Alert } from 'flowbite-svelte';
</script>

<div class="p-8">
	<Alert>
		<span class="font-medium">Team Not found!</span> 
	</Alert>
</div>
<pre>
    {JSON.stringify($page,null,2)}
</pre>