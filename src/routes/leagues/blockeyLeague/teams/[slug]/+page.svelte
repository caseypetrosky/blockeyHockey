<script>
    import {page} from '$app/stores';
    export let data;
</script>
<h1>{data.title}</h1>
<pre>
    {JSON.stringify($page,null,2)}
</pre>