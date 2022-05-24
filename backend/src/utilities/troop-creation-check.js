import KingdomRepository from "../repositories/kingdom-repository";
import {troopRules} from "../rules/troops-rules";

const canAfford = async (kingdomId, type, quantity) => {
  let kingdom = await KingdomRepository.findKingdomById(kingdomId);
  let kingdomGold = kingdom.gold;
  // --->looping through troopsRules object tree, finding corresponding value<---
  for (let val in troopRules()) {
    //--->if matches values matches type, fetch object and calculate<---
    if (val === type) {
      let troopsTotalGoldCost = troopRules()[val].gold_cost * quantity;
      if (troopsTotalGoldCost <= kingdomGold) {
        kingdom.gold -= troopsTotalGoldCost
        await kingdom.save()
        return true;
      } else {
        return false;
      }
    }
  }
}

export {canAfford};
