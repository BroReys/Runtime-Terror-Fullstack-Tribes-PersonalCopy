import KingdomRepository from "../repositories/kingdom-repository";
import {troopRules} from "../rules/troops-rules";

const refundTroop = async (kingdomId, type, quantity) => {
  let kingdom = await KingdomRepository.findKingdomById(kingdomId);
  let kingdomGold = kingdom.gold;
  // --->looping through troopsRules object tree, finding corresponding value<---
  for (let val in troopRules()) {
    //--->if matches values matches type, fetch object and calculate<---
    if (val === type) {
      let troopsTotalGoldRefund = Math.floor((troopRules()[val].gold_cost * quantity)/2)
      kingdom.gold += troopsTotalGoldRefund
      await kingdom.save()
    }
  }
}

export {refundTroop};