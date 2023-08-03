<script>
    import {page} from '$app/stores';
    export let data;
</script>
<div class="container mx-auto">
    <h1>{data.player.username}</h1>
    <img src="https://minotar.net/armor/bust/{data.player.uuid}/300.png" alt="player avatar" class="h-40 w-40 mr-4">
</div>

<pre>
    {JSON.stringify($page,null,2)}
</pre>