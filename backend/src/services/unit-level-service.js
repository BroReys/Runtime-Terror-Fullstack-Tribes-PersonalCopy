import UnitLevelRepository from "../repositories/unit-level-repository";
import {troopRules} from "../rules/troops-rules";
import KingdomRepository from "../repositories/kingdom-repository";
import {canAffordUnitUpgrade} from "../utilities/upgrade-troop-level-check";
import BuildingRepository from "../repositories/building-repository";
import {
  createsAtUnitLevel
} from "../utilities/generate-unit-level-creation-time";
import kingdom from "../models/kingdom";

//---> used during Kingdom registration, to generate lvl 1 upgradeLevels <---
const generateBasicUnitLevels = async (kingdomId) => {
  let troopTypes = troopRules().type;
  for (let i = 0; i < troopTypes.length; i++) {
    let unitLevel = {
      type: troopTypes[i],
      upgradeLevel: 1,
      kingdomId: kingdomId
    }
    await UnitLevelRepository.generateUnitLevel(unitLevel)
  }
}

// ---> to upgrade unitLevel, goes through several checks
const upgradeUnitLevel = async (type, kingdomId, user) => {
  let authenticatedUserKingdom = await KingdomRepository
  .findKingdomById(kingdomId);
  let kingdomsAcademy = await BuildingRepository
  .findAcademyByKingdomId(kingdomId);
  let unitLevel = await UnitLevelRepository
  .findUnitLevelByTroopTypeAndByKingdomId(kingdomId, type);

  if (!type) {
    return "wrong_type";
  } else if (!authenticatedUserKingdom) {
    return "kingdom_not_exists";
  } else if (user.id !== authenticatedUserKingdom.userId) {
    return "wrong_kingdom_id";
  } else if (!troopRules().type.includes(type)) {
    return "wrong_troop_type";
  } else if (!await canAffordUnitUpgrade(kingdomId, type)) {
    return "no_gold";
  } else if (!kingdomsAcademy) {
    return "no_academy";
  } else if (!kingdomsAcademy.status) {
    return "academy_destroyed";
  }else if (unitLevel.endTime) {
    return "still_upgrading";
  } else {
    if (unitLevel.upgradeLevel >= 20) {
      return "max_level";
    }
    // unitLevel.upgradeLevel += 1;
    unitLevel.endTime = createsAtUnitLevel(type);
    await unitLevel.save();
    return "ok";
  }
}

const findUnitLevelByTroopTypeAndKingdomId = async (kingdomId, type) => {
  return UnitLevelRepository.findUnitLevelByTroopTypeAndByKingdomId(kingdomId,
      type)
}

const mapAndGetCorrespondingUnitLevelsByKingdomId = async (kingdomId) => {
  let arrayOfUnitLevels = await UnitLevelRepository.findAllUnitLevelsByKingdomId(kingdomId);
  let mappedTroops = [];
  for (let unitLevel of arrayOfUnitLevels) {
    let currentUpgradeLevelOfTroop = unitLevel.upgradeLevel;
    for (let val in troopRules(currentUpgradeLevelOfTroop)) {
      if (val === unitLevel.type) {
        let mappedTroop = troopRules(currentUpgradeLevelOfTroop)[val];
        mappedTroops.push(mappedTroop);
      }
    }
  }
  return mappedTroops;
}

const getCurrentUnitLevelByKingdomId = async (kingdomId,type) => {
  let currentUnitLevel = await UnitLevelRepository.findUnitLevelByTroopTypeAndByKingdomId(kingdomId,type);
  if (!currentUnitLevel) {
    return "error"
  }
  return currentUnitLevel;
}

export default {
  generateBasicUnitLevels,
  findUnitLevelByTroopTypeAndKingdomId,
  upgradeUnitLevel,
  mapAndGetCorrespondingUnitLevelsByKingdomId,
  getCurrentUnitLevelByKingdomId
}
