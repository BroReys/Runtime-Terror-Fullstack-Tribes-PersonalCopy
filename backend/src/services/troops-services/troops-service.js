import TroopsRepository
  from "../../repositories/troops-repositories/troops-repository";
import KingdomRepository from "../../repositories/kingdom-repository";
import {troopRules} from "../../rules/troops-rules";
import UnitLevelService from "../unit-level-service";

const listAllRecruitedKingdomTroops = async (kingdomId, user) => {

  let authenticatedUserKingdom = await KingdomRepository
  .findKingdomById(kingdomId);

  if (!authenticatedUserKingdom) {
    return "kingdom_not_exists"
  } else if (user.id !== authenticatedUserKingdom.userId) {
    return "no_authorized";
  } else {
    return "ok";
  }
}
// --->used in middleware to join the troop army<---
const joinTroopArmy = async (type, quantity, kingdomId) => {
  const troops = await TroopsRepository.findRecruitedTroopTypeByKingdomId(
      kingdomId, type);
  if (troops) {
    troops.quantity += quantity;
    await troops.save();
  } else {
    let unitLevel = await UnitLevelService
    .findUnitLevelByTroopTypeAndKingdomId(kingdomId, type)
    if (!unitLevel) {
      return null;
    }
    let unitLevelId = unitLevel.id;
    let troop = {
      type: type,
      kingdomId: kingdomId,
      quantity: quantity,
      unitLevelId: unitLevelId
    }
    await TroopsRepository.createTroop(troop);
  }

}

const countTroopsInKingdom = async (kingdomId) => {
  let sum = 0;
  let kingdomTroops = await TroopsRepository.findRecruitedKingdomTroops(
      kingdomId);
  if (kingdomTroops) {
    for (let troop of kingdomTroops) {
      sum += troop.quantity;
    }
  }
  console.log(sum);
  return sum;
}

const countTroopsInBattle = async (kingdomId) => {
  let sum = 0;
  let kingdomTroops = await TroopsRepository.findRecruitedKingdomTroops(
      kingdomId);
  if (kingdomTroops) {
    for (let troop of kingdomTroops) {
      sum += troop.quantityInBattle;
    }
  }
  console.log(sum);
  return sum;
}

const countFoodConsumption = async (kingdomId) => {
  let food = 0;
  let kingdomTroops = await TroopsRepository.findRecruitedKingdomTroops(
      kingdomId);
  if (kingdomTroops) {
    for (let troop of kingdomTroops) {
      food += troopRules()[troop.type].foodConsumption * (troop.quantity + troop.quantityInBattle);
    }
  }
  return food;
}

const killRandomTroop = async (kingdomId) => {
  let randomTroop = await TroopsRepository.findRandomKingdomTroop(kingdomId);
  randomTroop.quantity -= 1;
  await randomTroop.save();
}

const killRandomTroopInBattle = async (kingdomId) => {
  let randomTroop = await TroopsRepository.findRandomKingdomTroopInBattle(kingdomId);
  let randomTroopInBattle;
  if (randomTroop.type !== "settlers") {
    randomTroopInBattle = await TroopsRepository.findTroopInBattle(randomTroop.type, kingdomId);
  }
  if (randomTroop) {
    randomTroop.quantityInBattle -= 1;
    await randomTroop.save();
  }
  if (randomTroopInBattle) {
    randomTroopInBattle.quantity -= 1;
    await randomTroopInBattle.save();
  }
}

export default {
  listAllRecruitedKingdomTroops,
  joinTroopArmy,
  countTroopsInKingdom,
  countTroopsInBattle,
  countFoodConsumption,
  killRandomTroop,
  killRandomTroopInBattle
}
