
<script>
</script>

<div class="hero bg-base-200">
	<div class=" hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-s font-bold md:text-lg lg:text-5xl">Welcome to the Blockey Hockey League</h1>
			<p class="py-6 text-xs md:text-base lg:text-xl">The Premier Minecraft Hockey Experience.</p>
		</div>
	</div>
	<div class="carousel w-full">
		<div id="slide1" class="carousel-item relative w-full">
			<img src="BackgroundPics/WinterClassic2BG.png" class="carousel-img w-full" alt="bhl game"/>
			<div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
				<a href="#slide4" class="btn-circle btn bg-primary">❮</a>
				<a href="#slide2" class="btn-circle btn bg-primary">❯</a>
			</div>
		</div>
		<div id="slide2" class="carousel-item relative w-full">
			<img src="BackgroundPics/WinterClassicBG.png" class="carousel-img w-full"alt="bhl game" />
			<div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
				<a href="#slide1" class="btn-circle btn bg-primary">❮</a>
				<a href="#slide3" class="btn-circle btn bg-primary">❯</a>
			</div>
		</div>
		<div id="slide3" class="carousel-item relative w-full">
			<img src="BackgroundPics\odrBG.png" class="carousel-img w-full" alt="bhl spawn"/>
			<div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
				<a href="#slide2" class="btn-circle btn bg-primary">❮</a>
				<a href="#slide1" class="btn-circle btn bg-primary">❯</a>
			</div>
		</div>
	</div>
</div>
<div class="stats mx-auto shadow">
	<div class="stat">
		<div class="stat-title">Since 2019</div>
		<div class="stat-value">18 Seasons</div>
		<div class="stat-desc" />
	</div>

	<div class="stat">
		<div class="stat-figure text-secondary" />
		<div class="stat-title">Discord Members</div>
		<div class="stat-value">2000+</div>
	</div>

	<div class="stat">
		<div class="stat-figure text-secondary">
		</div>
		<div class="stat-title">League Goals</div>
		<div class="stat-value">3500+</div>
		<div class="stat-desc">Scored</div>
	</div>
</div>
<div class=" py-8 text-white">
	<div class="container mx-auto px-4">
		<h2 class="mb-4 mt-4 text-2xl font-bold">Introduction</h2>
		<p class="text-lg">
			Step onto the ice and immerse yourself in the thrilling world of the Blockey Hockey League
			(BHL)! We're proud to present our custom-coded hockey experience. BHL boasts an array of
			exclusive mechanics, diverse gamemodes, and an impressive collection of over a thousand
			cosmetic items to collect as you play. Dive into our captivating gameplay that is split into
			two thrilling parts: League and Quickplay.
		</p>
		<h2 class="mb-4 mt-4 text-2xl font-bold">League</h2>
		<p class="text-lg">
			Embrace the thrill of competitive hockey with our hallmark League gameplay! Engage with
			numerous teams in a heated regular season battle that climaxes in an exhilarating playoff
			showdown. Just like in a real-world league, you'll encounter awards, trades, and more on your
			seasonal journey. Delve into the depths of the BHL legacy and carve out your own piece of its
			history today.
		</p>
		<h2 class="mb-4 mt-4 text-2xl font-bold">Quickplay</h2>
		<p class="text-lg">
			Looking for a swift, spontaneous hockey match? We've got you covered with Quickplay. This mode
			allows you to enjoy the rush of the game without committing to a team. Simply find a queue,
			and our server handles the rest, catapulting you into the heat of the match. With Quickplay,
			you're just a click away from experiencing the thrill that only BHL can offer. Whether you're
			a Minecraft veteran or a newbie, BHL promises an unmatched hockey experience. Lace up your
			skates and join the action today!
		</p>
	</div>
</div>

<style>
	.carousel-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.25;
		border-radius: 0.5rem;
	}

	.stats {
		display: flex;
        flex-wrap: wrap; /* Allow the stats to wrap to a new line on smaller screens */
        justify-content: center;
        align-items: center;
	}

	.stat {  
		margin: 1rem;
        text-align: center;
        flex-basis: 50%; /* Set the width of each stat to 50% on smaller screens */
				border: none; /* Remove the border */
        padding-bottom: 0; /* Remove the spacing between the stats */

	}
</style>
