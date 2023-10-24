const _processHockeyStats = (input) => {
  const titleRegex = /----- BLOCKEY HOCKEY STATISTICS -----/;
  const mainRegex = /vvv ([A-Z]{3}) @ ([A-Z]{3}) on (\d{4}-\d{2}-\d{2}) - (\d{2}:\d{2}\w{3}) vvv/g;
  const playerRegex = /(?<playerUUID>[a-f\d-]{36}) (\d+) (\d+) (\d+) (\d+) (\d+)/g;
  const teamStatsRegex = /([A-Z]{3}) (\d+) (\d+) (\d+) (\d+) (\d+)/;
  input = input.replace(titleRegex, "");
  console.log(input);
  const generatedByRegex = /^Generated by.*$/gm;
  input = input.replace(generatedByRegex, "");
  const mainMatches = [...input.matchAll(mainRegex)];
  let matchInf = {};
  for (const mainMatch of mainMatches) {
    const awayTeamR = mainMatch[1];
    const homeTeamR = mainMatch[2];
    const date = mainMatch[3];
    const time = mainMatch[4];
    matchInf = {
      awayTeam: awayTeamR,
      homeTeam: homeTeamR,
      date,
      time
    };
  }
  input = input.replace(mainRegex, "");
  const parts = input.split("|");
  let homeTeam = parts[0].toString();
  let awayTeam = parts[1].toString();
  const nonEmptyLinesRegex = /\n/g;
  homeTeam = homeTeam.replace(nonEmptyLinesRegex, (match) => match.trim());
  awayTeam = awayTeam.replace(nonEmptyLinesRegex, (match) => match.trim());
  const homeTeamStats = homeTeam.match(teamStatsRegex);
  const homeTeamReturn = {};
  homeTeamReturn.team = homeTeamStats[1];
  homeTeamReturn.goals = Number(homeTeamStats[2]) + Number(homeTeamStats[3]) + Number(homeTeamStats[4]) + Number(homeTeamStats[5]);
  if (homeTeamStats[5] == 1) {
    homeTeamReturn.overtime = true;
  }
  homeTeamReturn.shots = homeTeamStats[6];
  homeTeamReturn.players = [];
  const homeTeamPlayers = [...homeTeam.matchAll(playerRegex)];
  for (const homeTeamPlayer of homeTeamPlayers) {
    const playerUUID = homeTeamPlayer[1];
    const goals = homeTeamPlayer[2];
    const assists = homeTeamPlayer[3];
    const touches = homeTeamPlayer[4];
    const toi = homeTeamPlayer[5];
    homeTeamReturn.players.push({
      playerUUID,
      goals,
      assists,
      touches,
      toi
    });
  }
  console.log(homeTeamReturn);
  const awayTeamStats = awayTeam.match(teamStatsRegex);
  const awayTeamReturn = {};
  awayTeamReturn.team = awayTeamStats[1];
  awayTeamReturn.goals = Number(awayTeamStats[2]) + Number(awayTeamStats[3]) + Number(awayTeamStats[4]) + Number(awayTeamStats[5]);
  if (awayTeamStats[5] == 1) {
    awayTeamReturn.overtime = true;
  }
  awayTeamReturn.shots = awayTeamStats[6];
  awayTeamReturn.players = [];
  const awayTeamPlayers = [...awayTeam.matchAll(playerRegex)];
  for (const awayTeamPlayer of awayTeamPlayers) {
    const playerUUID = awayTeamPlayer[1];
    const goals = awayTeamPlayer[2];
    const assists = awayTeamPlayer[3];
    const touches = awayTeamPlayer[4];
    const toi = awayTeamPlayer[5];
    awayTeamReturn.players.push({
      playerUUID,
      goals,
      assists,
      touches,
      toi
    });
  }
  console.log(awayTeamReturn);
  console.log(matchInf);
  return {
    homeTeamReturn,
    awayTeamReturn,
    matchInf
  };
};
export {
  _processHockeyStats
};
