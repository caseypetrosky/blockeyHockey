<script>
	const templatePlayer = {
    name: 'Caspet',
    position: 'Forward',
    image: 'https://minotar.net/armor/bust/caspet/100.png',
    goals: 4,
    assists: 2,
    gamesPlayed: 4,
		teamColor: '#246752',
  }
	const grizPlayers = [
		templatePlayer,
		templatePlayer,
		templatePlayer,
		templatePlayer,
		templatePlayer,
		templatePlayer,
		templatePlayer,
		templatePlayer,
		templatePlayer,
		templatePlayer

	]
import TeamDisplayLG from './TeamDisplayLG.svelte';
	// @ts-ignore
	function bhlTeam(logo, name, owner, wins, losses, points, twitter, players, teamColor){
		this.logo = logo;
		this.name = name;
		this.owner = owner;
		this.wins = wins;
		this.losses = losses;
		this.points = points;
		this.twitter = twitter;
		this.players = players;
		this.teamColor = teamColor;
	}
	const bostonGrizzlies = new bhlTeam("/src/static/Logos/BostonGrizzlies.png", "Boston Grizzlies", "Youppi", 5, 1, 10, "https://twitter.com/BostonGrizzlies", grizPlayers, "#246752")
</script>

  <header class="text-white py-4">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold">Blockey Hockey League</h1>
      <p class="text-lg mt-2">The highest tier of Blockey Hockey</p>
    </div>
  </header>

  <div class="container mx-auto px-4 py-8">
    <section class="mt-8">
      <h2 class="text-2xl font-bold mb-4">About the League</h2>
      <p class="text-lg">The Blockey Hockey League is a highly competitive league for blockey hockey teams from around the world. Founded in 2019, the league has been at the forefront of promoting and developing the gamemode.</p>
      <p class="text-lg mt-2">With a rich history, the Blockey Hockey League showcases the best talent, intense rivalries, and thrilling matches that keep fans on the edge of their seats.</p>
    </section>

    <section class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Teams</h2>
      <p class="text-lg">The league consists of 9 teams competing for the championship title each season. Each team represents a different city or region and are owned by players.</p>
      <p class="text-lg mt-2">Check out our teams page to learn more about the exciting roster of teams in the and a little bit about them.</p>
      <a href="/league/blockeyLeague/teams" class="btn bg-primary m-2">View Teams</a> 
    </section>

    <section class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Schedule</h2>
      <p class="text-lg">Stay up to date with the latest matches and game schedules in the Main Blockey Hockey League. Catch the thrilling action as teams battle it out on the ice for supremacy.</p>
      <p class="text-lg mt-2">Visit our schedule page to see the upcoming games and plan your attendance or tune in to the live broadcasts.</p>
      <a href="/leauge/blockeyLeague/schedule" class="btn bg-primary m-2">View Schedule</a>
    </section>
  </div>


<TeamDisplayLG  imgSource={bostonGrizzlies.logo} teamName={bostonGrizzlies.name} teamOwner={bostonGrizzlies.owner} teamWins={bostonGrizzlies.wins} teamLosses={bostonGrizzlies.losses} teamPoints={bostonGrizzlies.points} teamTwitter={bostonGrizzlies.Twitter} players={bostonGrizzlies.players} teamColor={bostonGrizzlies.teamColor}/>
<h1>The Blockey Hockey League Consists of 9 teams</h1>
