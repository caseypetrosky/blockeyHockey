<script>
	const templatePlayer = {
    name: 'Caspet',
    position: 'Forward',
    image: 'https://minotar.net/armor/bust/caspet/100.png',
    goals: 4,
    assists: 2,
    gamesPlayed: 4,
		teamColor: '#246752',
		UUID: '95d7d710-5ca6-4089-a6f8-dc40bb80def8',
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
import TeamDisplayLG from '$lib/TeamDisplayLg.svelte';
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

<div class="container py-4 mx-auto text-white tabs ">
	<a href="/leagues/blockeyLeague" class="tab tab-bordered text-2xl">League Info</a> 
	<a href="/leagues/blockeyLeague/rosters" class="tab tab-bordered  tab-active text-2xl ">Team Rosters</a> 
	<a href="/leagues/blockeyLeague/standings" class="tab tab-bordered text-2xl">Standings</a>
	<a href="/leagues/blockeyLeague/bhlstats" class="tab tab-bordered text-2xl">Stats Leaderboard</a>
  </div>

<TeamDisplayLG  imgSource={bostonGrizzlies.logo} teamName={bostonGrizzlies.name} teamOwner={bostonGrizzlies.owner} teamWins={bostonGrizzlies.wins} teamLosses={bostonGrizzlies.losses} teamPoints={bostonGrizzlies.points} teamTwitter={bostonGrizzlies.Twitter} players={bostonGrizzlies.players} teamColor={bostonGrizzlies.teamColor}/>
<h1>The Blockey Hockey League Consists of 9 teams</h1>