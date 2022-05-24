import LeaderboardRepository from "../repositories/leaderboard-repository";
import KingdomRepository from "../repositories/kingdom-repository";
import UserRepository from "../repositories/user-repository";
import {troopRules} from "../rules/troops-rules";

const getLeaderboardsByKingdoms = async () => {
  let buildingsLevelSum = await LeaderboardRepository.getKingdomsBuildingPoints();

  if (buildingsLevelSum.length > 0) {
    let buildingPoints;
    let troopPoints;
    let maxBP = buildingsLevelSum[0].total;
    let maxTP = 0;
    let leaderboard = [];

    for (let index = 0; index < buildingsLevelSum.length; index++) {
      let kingdom = await KingdomRepository.findKingdomById(buildingsLevelSum[index].kingdomId);
      let user = await UserRepository.findById(kingdom.userId);
      buildingPoints = Math.floor((buildingsLevelSum[index].total / maxBP) * 50);
      troopPoints = await getKingdomTroopPoints(kingdom);

      if (maxTP < troopPoints) {
        maxTP = troopPoints;
      }
      leaderboard[index] = {
        ruler: user.username,
        kingdom: kingdom.name,
        points: 0,
        buildingPoints: buildingPoints,
        troopPoints: troopPoints
      }
    }
    leaderboard = await finalizeTheLeaderboard(leaderboard, maxTP);
    return {status: 200, leaderboard};

  } else {
    return {status: 400, error: 'No leaderboards available!'};
  }
};

const getLeaderboardsByRulers = async () => {
  let buildingsLevelSum = await LeaderboardRepository.getRulerBuildingPoints();

  if (buildingsLevelSum.length > 0) {
    let buildingPoints;
    let maxBP = buildingsLevelSum[0].total;
    let maxTP = 0;
    let leaderboard = [];

    for (let index = 0; index < buildingsLevelSum.length; index++) {
      let user = await UserRepository.findById(buildingsLevelSum[index].userId);
      let userKingdoms = await user.getKingdoms();
      let troopPoints = 0;
      buildingPoints = Math.floor((buildingsLevelSum[index].total / maxBP) * 50);

      for (let index = 0; index < userKingdoms.length; index++) {
        troopPoints += await getKingdomTroopPoints(userKingdoms[index]);
      }
      if (maxTP < troopPoints) {
        maxTP = troopPoints;
      }
      leaderboard[index] = {
        ruler: user.username,
        points: 0,
        buildingPoints: buildingPoints,
        troopPoints: troopPoints
      }
    }
    leaderboard = await finalizeTheLeaderboard(leaderboard, maxTP);
    return {status: 200, leaderboard};

  } else {
    return {status: 400, error: 'No leaderboards available!'};
  }
};

const getKingdomTroopPoints = async (kingdom) => {
  let kingdomTroops = await kingdom.getTroops();
  let troopPoints = 0;

  for (let index = 0; index < kingdomTroops.length; index++) {
    let unitLevel = await kingdomTroops[index].getUnitLevel();
    troopPoints += (troopRules(unitLevel.upgradeLevel)[kingdomTroops[index].type].attack
            + troopRules(unitLevel.upgradeLevel)[kingdomTroops[index].type].defence)
        * kingdomTroops[index].quantity;
  }
  return troopPoints;
};

const finalizeTheLeaderboard = async (leaderboard, maxTP) => {
  for (let j = 0; j < leaderboard.length; j++) {
    leaderboard[j].points = Math.floor(leaderboard[j].buildingPoints + ((leaderboard[j].troopPoints / maxTP * 50) || 0));
    delete leaderboard[j].buildingPoints;
    delete leaderboard[j].troopPoints;
  }
  return leaderboard.sort((a, b) => b.points - a.points);
};

export default {
  getLeaderboardsByKingdoms,
  getLeaderboardsByRulers
}
