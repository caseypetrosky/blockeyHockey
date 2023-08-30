<script>
	import '../app.postcss';
    let myImage = '/src/static/bhl.png';
	import { goto } from '$app/navigation';
	
    let search = '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`https://playerdb.co/api/player/minecraft/${search}`);
            const data = await response.json();
            
            const playerId = data.data.player.raw_id;
            
            goto(`/stats/${playerId}`);
        } catch (error) {
            console.error("An error occurred:", error);
        }
		search = '';
    };

</script>
<svelte:head>
  <link rel="icon" type="image/svg" href={myImage} />
</svelte:head>

<div class="navbar bg-primary-500">
	<div class="navbar-start">
		<div class="dropdown">
			
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<label tabindex="0" class="btn btn-ghost lg:hidden">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
			  </label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

			<ul
				tabindex="0"
				class="dropdown-content menu rounded-box menu-sm bg-base-100 z-[1] mt-3 w-52 p-2 shadow"
			>

				<li><a href="/teams">Teams</a></li>
				<li>
					<summary>Leagues</summary>
					<ul class="p-2">
						<li><a href="/leagues/blockeyLeague">BHL</a></li>
						<li><a href="/leagues/namhl">NAMHL</a></li>
						<li><a href="/leagues/jbhl">JBHL</a></li>
					</ul>
				</li>	
				
				<li>
					<summary>Social Media</summary>
					<ul class="p-2">
						<li><a href="https://www.youtube.com/c/blockeysportsnetwork">Youtube</a></li>
						<li><a href="https://twitter.com/BlockeyHockeyMC">Twitter</a></li>
						<li><a href="https://discord.com/invite/TWp3vnuuwX">Discord</a></li>
					</ul>
				</li>
				<li><a href="/stats">Stats</a></li>
				<li><a href="https://store.blockeyhockey.com">Store</a></li>
			</ul>
		</div>
		<a class="btn-ghost btn" href="/"
			><img src={myImage} class="h-12 w-12 object-contain" alt="Blockey Hockey League Logo" />
			<h1 class="hidden text-xl normal-case lg:flex">Blockey Hockey League</h1></a
		>
	</div>

	<!--Desktop Navbar-->

	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal tabs tabs-boxed px-1">
			
			<li>
				<a href="/teams"> Teams </a>
			</li>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

			<li tabindex="0" class="z-40">
				<details>
					<summary>Leagues</summary>
					<ul class="p-2">
						<li>
							<a href="/leagues/blockeyLeague"> BHL </a>
						</li>
						<li>
							<a href="/leagues/namhl"> NAMHL </a>
						</li>
						<li>
							<a href="/leagues/jbhl"> JBHL </a>
						</li>
					</ul>	
				</details>
			</li>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

			<li tabindex="0" class="z-50">
				<details>
					<summary>Social Media</summary>
					<ul class="p-2">
						<li><a href="https://www.youtube.com/c/blockeysportsnetwork">Youtube</a></li>
						<li><a href="https://twitter.com/BlockeyHockeyMC">Twitter</a></li>
						<li><a href="https://discord.com/invite/TWp3vnuuwX">Discord</a></li>
					</ul>	
				</details>
			</li>
			<li>
				<a href="/stats"> Player Stats </a>
			</li>
			<li>
				<a href="https://store.blockeyhockey.com"> Store </a>
			</li>
		</ul>
	</div>

	<div class="navbar-end">
		<form on:submit={handleSubmit}>
			<div class="form-control">
				<input bind:value={search} type="search" placeholder="Player Search" class="input" />
			</div>
		</form>
	</div>
</div>
<div />
<slot />
<footer class="footer b-0 footer-center bg-base-100 text-base-content hidden p-4 lg:block">
	<div>
		<p>Copyright &#xa9; 2023 - All right reserved by Blockey Hockey LLC</p>
		<a href="/admin" class="hover:text-accent-focus ">Admin Login</a>
		<p>Coded by Caspet</p>
	</div>
</footer>
