<script>
    import {page} from '$app/stores';
    export let data;
    let teamImg = `/src/static/logos/${data.team.id}.png`;
    let teamColor = data.team.color;
</script>


<div class="container mx-auto mt-10">

    <div class="inline-flex">
        <img src={teamImg} alt="team logo" class="h-40 w-40 mr-4">
        <div>
            <h1 class="my-auto text-4xl text-[{teamColor}]">{data.team.name}</h1>
            <h2>Owner: {data.team.team_owner}</h2>
            <h2>Leauge: {data.league.name}</h2>
            {#if data.team.championships   != null  }
                <h3>Championships: {data.team.championships}</h3>
            {/if}

        </div>

    </div>  
    <p>{data.team.description}</p>
</div>
<!--
<pre>
    {JSON.stringify($page,null,2)}
</pre>  
-->