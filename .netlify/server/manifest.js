export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["BackgroundPics/odrBG.png","BackgroundPics/WinterClassic2BG.png","BackgroundPics/WinterClassicBG.png","bhl.png","favicon.png","Logos/AnaheimBarracuda.png","Logos/AtlantaThrashers.png","Logos/Blockey Hockey League.html","Logos/Blockey Hockey League_files/bhl.png","Logos/carolinacobras.png","Logos/ChicagoDawgs.png","Logos/CincinnatiCyclones.png","Logos/ColoradoComets.png","Logos/DetroitCars.png","Logos/Discord Icons/BabyHuskies.png","Logos/Discord Icons/BanditsIcon.png","Logos/Discord Icons/CobrasIcon.png","Logos/Discord Icons/DetroitCars.png","Logos/Discord Icons/EaglesIcon.png","Logos/Discord Icons/HattricksIcon.png","Logos/Discord Icons/HuskiesIcon.png","Logos/Discord Icons/JellyfishIcon.png","Logos/Discord Icons/MaineGrizzlies.png","Logos/Discord Icons/TurtlesIcon.png","Logos/Discord Icons/WhalersIcon.png","Logos/EdmontonExpress.png","Logos/FortWorthJets.png","Logos/HalifaxHighlanders.png","Logos/HartfordWhalers.png","Logos/HollywoodHattricks.png","Logos/IndyRacers.png","Logos/International/Antarctica.png","Logos/International/Canada.png","Logos/International/Colombia.png","Logos/International/Denmark.png","Logos/International/Finland.png","Logos/International/Germany.png","Logos/International/Mexico.png","Logos/International/Sweden.png","Logos/International/UnitedKingdom.png","Logos/International/UnitedStates.png","Logos/JacksonvilleJellyfish.png","Logos/JBHL Teams/AlaskaAces.png","Logos/JBHL Teams/AtlantaArmadillos.png","Logos/JBHL Teams/BanffBlizzard.png","Logos/JBHL Teams/BinghamptonWhalers.png","Logos/JBHL Teams/birdo.png","Logos/JBHL Teams/DetroitFlamingos.png","Logos/JBHL Teams/EverettEskimos.png","Logos/JBHL Teams/jets23.png","Logos/JBHL Teams/mikes.png","Logos/JBHL Teams/MinnesotaBlueOx.png","Logos/JBHL Teams/MinnesotaMallards.png","Logos/JBHL Teams/Oklahoma89ers.png","Logos/JBHL Teams/OrlandoOtters.png","Logos/JBHL Teams/PalmBeachHawks.png","Logos/JBHL Teams/PasadenaPanthers.png","Logos/JBHL Teams/PortlandAdmirals.png","Logos/JBHL Teams/QuebecRemparts.png","Logos/JBHL Teams/RaleighRaptors.png","Logos/JBHL Teams/RamsayvilleRams.png","Logos/JBHL Teams/RimouskiOceanic.png","Logos/JBHL Teams/RouynNorandaHuskies.png","Logos/JBHL Teams/SpaceCoastVoyagers.png","Logos/JBHL Teams/TorontoMayhem.png","Logos/JBHL Teams/VancouverEagles.png","Logos/JBHL Teams/WashingtonWasps.png","Logos/JBHL Teams/youppi.png","Logos/Leagues & Events/awardslogo.png","Logos/Leagues & Events/Draft Logos/hartforddraft.png","Logos/Leagues & Events/Draft Logos/NMHFDraft.png","Logos/Leagues & Events/Draft Logos/S18Draft.png","Logos/Leagues & Events/IMHL.png","Logos/Leagues & Events/JBHL.png","Logos/Leagues & Events/NAMHL.png","Logos/Leagues & Events/Special Logos/BHLPride.png","Logos/Leagues & Events/Special Logos/NMHF.png","Logos/Leagues & Events/WJC.png","Logos/ManitobaMoose.png","Logos/MichiganHornets.png","Logos/milwaukeemuskies.png","Logos/MississaugaRiptide.png","Logos/MontrealMilitia.png","Logos/NAMHL Teams/AnnArborHoneyBadgers.png","Logos/NAMHL Teams/HalifaxMooseheads.png","Logos/NAMHL Teams/MexicoCityCougars.png","Logos/NAMHL Teams/MontrealMonarchs.png","Logos/NAMHL Teams/QuebecNordiques.png","Logos/NAMHL Teams/SaskatoonBlades.png","Logos/NewYorkRevolution.png","Logos/NovaScotiaHuskies.png","Logos/Other Logos/BuffaloRampage.png","Logos/Other Logos/DetroitCars.png","Logos/Other Logos/DukeCityThrashers.png","Logos/Other Logos/MinnesotaNorthStars.png","Logos/Other Logos/NovaScotiaHuskies.png","Logos/Other Logos/QuebecRemparts.png","Logos/Other Logos/SaskatoonBlues.png","Logos/Other Logos/SurreyHitmen.png","Logos/PanamaCityPanic.png","Logos/PhiladelphiaFlames.png","Logos/QuebecCityVoyageurs.png","Logos/SanFransiscoStingrays.png","Logos/SanJoseBlaze.png","Logos/SarasotaSeaSlugs.png","Logos/SeattleGoldenEagles.png","Logos/SeattleGoldenEaglesOld.png","Logos/Smaller Versions (For Emotes)/AnaheimBarracudaEmoji.png","Logos/Smaller Versions (For Emotes)/BostonGrizzlies.png","Logos/Smaller Versions (For Emotes)/bsn.png","Logos/Smaller Versions (For Emotes)/DetroitCarsEmoji.png","Logos/Smaller Versions (For Emotes)/IND.png","Logos/Smaller Versions (For Emotes)/SacramentoSpartansEmoji.png","Logos/Smaller Versions (For Emotes)/VAN2.png","Logos/Smaller Versions (For Emotes)/WashingtonRedwolvesEmoji.png","Logos/VancouverOrcas.png","Logos/WinnipegIcecaps.png","teamlogos/ALB.png","teamlogos/BHL.png","teamlogos/BOS.png","teamlogos/HOU.png","teamlogos/LA.png","teamlogos/ORL.png","teamlogos/PHI.png","teamlogos/SAR.png","teamlogos/SAS.png","teamlogos/SEA.png","teamlogos/SJS.png","teamlogos/SUR.png","teamlogos/TBT.png","teamlogos/VAN.png","teamlogos/WSH.png"]),
	mimeTypes: {".png":"image/png",".html":"text/html"},
	_: {
		client: {"start":"_app/immutable/entry/start.b3aef86e.js","app":"_app/immutable/entry/app.eb0369b0.js","imports":["_app/immutable/entry/start.b3aef86e.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/singletons.698dd5ff.js","_app/immutable/chunks/index.607909ad.js","_app/immutable/chunks/paths.2f7d1989.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/entry/app.eb0369b0.js","_app/immutable/chunks/scheduler.c0440a5c.js","_app/immutable/chunks/index.aec86741.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js')),
			__memo(() => import('./nodes/20.js')),
			__memo(() => import('./nodes/21.js')),
			__memo(() => import('./nodes/22.js')),
			__memo(() => import('./nodes/23.js')),
			__memo(() => import('./nodes/24.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin/panel",
				pattern: /^\/admin\/panel\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/panel/playerUpdate",
				pattern: /^\/admin\/panel\/playerUpdate\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/panel/playerUpdate/[uuid]",
				pattern: /^\/admin\/panel\/playerUpdate\/([^/]+?)\/?$/,
				params: [{"name":"uuid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/leagues/blockeyLeague",
				pattern: /^\/leagues\/blockeyLeague\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/leagues/blockeyLeague/bhlstats",
				pattern: /^\/leagues\/blockeyLeague\/bhlstats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/leagues/blockeyLeague/rosters",
				pattern: /^\/leagues\/blockeyLeague\/rosters\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/leagues/blockeyLeague/standings",
				pattern: /^\/leagues\/blockeyLeague\/standings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/leagues/jbhl",
				pattern: /^\/leagues\/jbhl\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/leagues/jbhl/jbhlstats",
				pattern: /^\/leagues\/jbhl\/jbhlstats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/leagues/jbhl/rosters",
				pattern: /^\/leagues\/jbhl\/rosters\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/leagues/jbhl/standings",
				pattern: /^\/leagues\/jbhl\/standings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/leagues/namhl",
				pattern: /^\/leagues\/namhl\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/leagues/namhl/namhlstats",
				pattern: /^\/leagues\/namhl\/namhlstats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/leagues/namhl/rosters",
				pattern: /^\/leagues\/namhl\/rosters\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/leagues/namhl/standings",
				pattern: /^\/leagues\/namhl\/standings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/logout/_server.js'))
			},
			{
				id: "/stats",
				pattern: /^\/stats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/stats/leaderboard",
				pattern: /^\/stats\/leaderboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/stats/[uuid]",
				pattern: /^\/stats\/([^/]+?)\/?$/,
				params: [{"name":"uuid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/teams",
				pattern: /^\/teams\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/teams/[teamID]",
				pattern: /^\/teams\/([^/]+?)\/?$/,
				params: [{"name":"teamID","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
