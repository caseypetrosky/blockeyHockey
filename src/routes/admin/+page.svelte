<script>
    export let form;
    console.log(form);
</script>

<div class="container mx-auto">
    <h1 class="text-xl">Login</h1> 
    {#if form?.message}
        <p class="text-red-500">{form.message}</p>
     {/if}
    
    <form method="POST" class="mt-4">
        <input type="text" name="username" placeholder="Username"  class="input input-bordered input-primary w-full max-w-xs">
        <input type="password"name="password" placeholder="password" class="input input-bordered input-primary w-full max-w-xs"><br>
        <button type="submit" class="btn btn-outline btn-primary btn-wide mt-3">Login</button>
    </form>
</div>