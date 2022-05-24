import KingdomRepository from "../../repositories/kingdom-repository";
import {troopRules} from "../../rules/troops-rules";
import generateTroopCreationTime
  from "../../utilities/generate-troop-creation-time";
import TroopsInBarracksRepository
  from "../../repositories/troops-repositories/troops-in-barracks-repository";
import {canAfford} from "../../utilities/troop-creation-check";
import TroopsRepository
  from "../../repositories/troops-repositories/troops-repository";
import kingdom from "../../models/kingdom";
import {refundTroop} from "../../utilities/troop-refund-check";
import BuildingRepository from "../../repositories/building-repository";

const trainTroop = async (type,quantity,kingdomId,user) => {

  let authenticatedUserKingdom = await KingdomRepository
  .findKingdomById(kingdomId);

  let kingdomsBarracks = await BuildingRepository
  .findBarracksByKingdomId(kingdomId);

  if (!type || !quantity) {
    return "missing_field";
  } else if (!authenticatedUserKingdom) {
    return "kingdom_not_exists";
  } else if (user.id !== authenticatedUserKingdom.userId) {
    return "wrong_kingdom_id";
  } else if (!troopRules().type.includes(type)) {
    return "wrong_type";
  } else if (!kingdomsBarracks) {
    return "no_barracks";
  } else if (!kingdomsBarracks.status) {
    return "barracks_destroyed";
  } else if (type === "settlers" && quantity > 1) {
    return "settler_only_one";
  } else if (!await canAfford(kingdomId,type,quantity)) {
    return "no_gold";
  } else {
    if (type === "settlers") {
      let settlersInBarracks = await TroopsInBarracksRepository
      .findKingdomTroopsInBarracksByTypeAndOrderByEndtimeDesc(kingdomId,type);
      let settlers = await TroopsRepository
      .findRecruitedTroopTypeByKingdomId(kingdomId,type);
      if (settlersInBarracks[0].length > 0 || settlers.quantity > 0 || settlers.quantityInBattle > 0) {
        return "already_built_settler"
      }
    }
    let troops = [];
    for (let i = 1; i <= quantity ; i++) {
      let troop = {
        kingdomId: kingdomId,
        type: type,
        isTrained: false,
        startTime: 0,
        endTime: 0
      }
      troops.push(troop);
    }
    // -----> necessary to look into troops in barracks table and check whether same type of troop is training <-----
    let kingdomTroopsInBarracksByType = await TroopsInBarracksRepository
    .findKingdomTroopsInBarracksByTypeAndOrderByEndtimeDesc(kingdomId,type);
    let maxEndtime;
    // -----> check if such troop is still training by accesing returned object and get into array <-----
    if ((kingdomTroopsInBarracksByType[0]).length !== 0) {
      maxEndtime = kingdomTroopsInBarracksByType[0][0].endTime;
    }
    for (let i = 0; i < troops.length ; i++) {
      // ----> firstly access first element of array - first troop to create <----
      if (i === 0) {
        // ----> then check if maxEndtime is truthy - if yes, it means there is already a troop of same type still training <----
        if (maxEndtime && !(Math.floor(Date.now()/1000) >= maxEndtime) ) {
          // ----> if there is a troop still, we need to set the start of  next batch of sent to academy
          // according to the latest time of troop which is still training <----
            troops[i].startTime = maxEndtime;
            troops[i].endTime = generateTroopCreationTime
            .createsAtWhenPreviousExists(type,maxEndtime);
        } else {
          // ---> if maxEndtime is falsy or smaller than Date.now set start time of first troop in batch according to Date.now
          troops[i].startTime = Math.floor(Date.now()/1000);
          troops[i].endTime = generateTroopCreationTime.createsAt(type);
        }
      } else {
        // ---> this sets time of next troop in the loop after 0 index troop
        troops[i].startTime = troops[i-1].endTime;
        troops[i].endTime = troops[i-1]
            .endTime + generateTroopCreationTime.createsAtNextTroop(type);
      }
    }
    await TroopsInBarracksRepository.bulkCreateTroops(troops);
    return "ok";
  }
}

const findKingdomTroopsInBarracks = async (kingdomId) => {
  return await TroopsInBarracksRepository.findKingdomTroopsInBarracks(kingdomId);
}

const findKingdomTroopsInBarracksByType = async (kingdomId,type) => {
  return await TroopsInBarracksRepository
  .findKingdomTroopsInBarracksByTypeAndOrderByEndtimeDesc(kingdomId,type);
}

const removeKingdomTroopsInBarracksByType = async (kingdomId,type,quantity) => {

  if (!quantity || typeof quantity !== "number") {
    return 'wong_type';
  }
  if (!(quantity > 0)) {
    return 'wrong_quantity'
  }
  let allTroopsInBarracksPerType = await TroopsInBarracksRepository
  .findKingdomTroopsInBarracksByTypeAndOrderByEndtimeDesc(kingdomId,type);

  let troopsToRemove = allTroopsInBarracksPerType[0].splice(0,quantity);
  let arrayOfTroopsIds = [];
  for (let troop of troopsToRemove) {
    arrayOfTroopsIds.push(troop.id);
  }
  await refundTroop(kingdomId,type,quantity);
  await TroopsInBarracksRepository
  .bulkDestroyTroopsInBarracks(arrayOfTroopsIds);

  return 'ok_removed'
}

export default {
  trainTroop,
  findKingdomTroopsInBarracks,
  findKingdomTroopsInBarracksByType,
  removeKingdomTroopsInBarracksByType
}