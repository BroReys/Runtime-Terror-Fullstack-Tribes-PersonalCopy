import TroopsInBarracksRepository from "../../repositories/troops-repositories/troops-in-barracks-repository";
import {troopRules} from "../../rules/troops-rules";
import TroopsService from "./troops-service";
import UnitLevelRepository from "../../repositories/unit-level-repository";

const getUpdateBreakpoints = async (kingdomId, currentTick) => {
  let breakpoints = [];
  let troopsInBarracks = await TroopsInBarracksRepository.findAllByKingdomIdAndUntil(kingdomId, currentTick);
  for (let troop of troopsInBarracks) {
    breakpoints.push(troop.endTime);
  }
  return breakpoints;
}

const updateTroops = async (kingdomId, currentTick) => {
  let troopTypes = troopRules().type;

  for (let i = 0; i < troopTypes.length; i++) {
    // --->first check if there are troops of same type trained in barracks<---
    let trainedTroopsInBarracks = await TroopsInBarracksRepository
    .findTrainedKingdomTroopsInBarracksByType(kingdomId, troopTypes[i], currentTick);
    // --->u have to access first element, because sequalize returns object tree - [results][metadata]<---
    let quantity = trainedTroopsInBarracks[0].length;
    //--->if there are troops, call joinTroopArmy
    await TroopsService.joinTroopArmy(troopTypes[i], quantity, kingdomId);

  }

  await TroopsInBarracksRepository.deleteAllAlreadyTrainedTroops();

}
// TODO maybe refactor..
const updateTroopsUnitLevel = async (kingdomId,currentTick) => {
  let kingdomsUnitLevels = await UnitLevelRepository
  .findAllUnitLevelsByKingdomIdRaw(kingdomId);
  let currentDate = currentTick;
  console.log(kingdomsUnitLevels);
  for (let kingdomUnitLevel of kingdomsUnitLevels) {
    if (kingdomUnitLevel.endTime) {
      console.log('testUnit!')
      if (kingdomUnitLevel.endTime <= currentDate) {
        let typeOfUnitLevel = kingdomUnitLevel.type;
        let unitLevelToUpdate = await UnitLevelRepository
        .findUnitLevelByTroopTypeAndByKingdomId(kingdomId,typeOfUnitLevel);
        unitLevelToUpdate.upgradeLevel += 1;
        unitLevelToUpdate.endTime = null;
        await unitLevelToUpdate.save();
        // await kingdomUnitLevel.save()
      }
    }
  }
}

export default {
  getUpdateBreakpoints,
  updateTroops,
  updateTroopsUnitLevel
}