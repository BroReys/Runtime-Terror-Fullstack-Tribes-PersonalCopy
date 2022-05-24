import {troopRules} from "../rules/troops-rules";
import KingdomRepository from "../repositories/kingdom-repository";
import UnitLevelRepository from "../repositories/unit-level-repository";

const canAffordUnitUpgrade = async  (kingdomId, type) => {
  let kingdom = await KingdomRepository.findKingdomById(kingdomId);
  let kingdomGold = kingdom.gold;
  let kingdomUnitLevel = await UnitLevelRepository
  .findUnitLevelByTroopTypeAndByKingdomId(kingdomId,type);
  let currentUpgradeLevel = kingdomUnitLevel.upgradeLevel
// --->looping through troopsRules object tree, finding corresponding value<---
  for (let val in troopRules(currentUpgradeLevel)) {
    //--->if matches values matches type, fetch object and calculate<---
    if (val === type) {
      let troopUpgradeCost = troopRules(currentUpgradeLevel)[val].upgrade_cost;
      if (troopUpgradeCost <= kingdomGold) {
        kingdom.gold -= troopUpgradeCost;
        await kingdom.save();
        return true
      } else {
        return false
      }
    }
  }
}


export {canAffordUnitUpgrade};