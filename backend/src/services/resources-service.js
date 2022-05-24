import {rules} from "../rules/rules";
import KingdomService from "./kingdom-service";
import BuildingService from "./building-service";
import TroopsService from "./troops-services/troops-service";
import TroopsUpdateService from "./troops-services/troops-update-service";

const updateResourcesByKingdomId = async (kingdomId) => {
  await updateResources(await KingdomService.getKingdomById(kingdomId));
}

const updateResources = async (kingdom, currentTick) => {

  console.log("======== UPDATING RESOURCES - " + kingdom.name);

  if (!currentTick) {
    currentTick = Math.floor(Date.now() / 1000);
  }

  let kingdomId = kingdom.get('id');
  let elapsedTicks = (currentTick - kingdom.lastTick) / rules().tick_length;
  elapsedTicks = Math.floor(elapsedTicks);

  let breakpoints = [
    ...await BuildingService.getUpdateBreakpoints(kingdomId, currentTick),
    ...await TroopsUpdateService.getUpdateBreakpoints(kingdomId, currentTick),
    currentTick
  ];
  let breakpointsUnique = [...new Set(breakpoints)];
  breakpointsUnique.sort();

  console.log(breakpointsUnique);

  for (let currentTick of breakpointsUnique) {

    //update buildings
    await BuildingService.updateBuildings(kingdomId, currentTick);

    //update troops
    await TroopsUpdateService.updateTroops(kingdomId, currentTick);

    //update troopsUnitLevels
    await TroopsUpdateService.updateTroopsUnitLevel(kingdomId, currentTick);

    //update loyalty 1/114 per tick (=10 per 24h) - we use randomness to produce whole integers
    if (kingdom.loyalty < 100) {
      let newLoyalty = 0;
      for (let i = 0; i < elapsedTicks; i++) {
        let random = Math.floor(Math.random() * 114);
        if (random === 1) {
          newLoyalty++;
        }
      }
      kingdom.loyalty = Math.min(kingdom.loyalty + newLoyalty, 100);
    }

    let buildingStats = await BuildingService.countBuildingsResources(kingdomId);
    let level = await BuildingService.getKingdomLevelByTownhall(kingdomId);

    console.log(buildingStats);
    console.log(level);

    // count food consumption of troops and kill some if we don't have enough food
    let foodForTroops = kingdom.food + (buildingStats.foodProduction - buildingStats.foodConsumption) * elapsedTicks;
    let troopsFoodConsumption = await TroopsService.countFoodConsumption(kingdomId);
    let troopsInKingdom = await TroopsService.countTroopsInKingdom(kingdomId);
    console.log("=== Troops food consumption:" + troopsFoodConsumption);

    while ((foodForTroops < (troopsFoodConsumption * elapsedTicks)) && (troopsInKingdom > 0)) {
      await TroopsService.killRandomTroop(kingdomId);
      troopsInKingdom--;
      troopsFoodConsumption = await TroopsService.countFoodConsumption(kingdomId);
    }

    //kill some troop in battle if we still don't have enough food
    troopsFoodConsumption = await TroopsService.countFoodConsumption(kingdomId);
    let troopsInBattle = await TroopsService.countTroopsInBattle(kingdomId);

    while ((foodForTroops < (troopsFoodConsumption * elapsedTicks)) && (troopsInBattle > 0)) {
      await TroopsService.killRandomTroopInBattle(kingdomId);
      troopsInBattle--;
      troopsFoodConsumption = await TroopsService.countFoodConsumption(kingdomId);
    }

    //destroy some buildings if we don't have enough FOOD for their consumption

    let foodForBuildings = kingdom.food + (buildingStats.foodProduction - troopsFoodConsumption) * elapsedTicks;
    let buildingsToDestroyFood = await BuildingService.countDestroyableBuildingsForFood(kingdomId);

    while ((foodForBuildings < (buildingStats.foodConsumption * elapsedTicks)) && (buildingsToDestroyFood > 0)) {
      await BuildingService.destroyRandomBuildingForFood(kingdomId);
      buildingsToDestroyFood--;
      buildingStats = await BuildingService.countBuildingsResources(kingdomId);
    }

    //destroy some buildings if we don't have enough GOLD for their consumption

    let goldForBuildings = kingdom.gold + (buildingStats.goldProduction * elapsedTicks);
    let buildingsToDestroyGold = await BuildingService.countDestroyableBuildingsForGold(kingdomId);

    while ((goldForBuildings < (buildingStats.goldConsumption * elapsedTicks)) && (buildingsToDestroyGold > 0)) {
      await BuildingService.destroyRandomBuildingForGold(kingdomId);
      buildingsToDestroyGold--;
      buildingStats = await BuildingService.countBuildingsResources(kingdomId);
    }

    let foodPerTick = (buildingStats.foodProduction - buildingStats.foodConsumption - troopsFoodConsumption);
    let goldPerTick = (buildingStats.goldProduction - buildingStats.goldConsumption);

    //produce gold to maximum level
    let maxGold = rules(level).kingdom.max_gold;
    if (kingdom.gold < maxGold) {
      let newGold = goldPerTick * elapsedTicks;
      kingdom.gold = Math.min(maxGold, kingdom.gold + newGold);
    } else {
      kingdom.gold = maxGold;
    }

    //produce food to maximum level
    let maxFood = rules(level).kingdom.max_food;
    if (kingdom.food < maxFood) {
      let newFood = foodPerTick * elapsedTicks;
      kingdom.food = Math.min(maxFood, kingdom.food + newFood);
    } else {
      kingdom.food = maxFood;
    }

    //update last tick and food/gold production and save
    kingdom.lastTick += elapsedTicks * rules().tick_length;
    kingdom.foodProduction = buildingStats.foodProduction;
    kingdom.goldProduction = buildingStats.goldProduction;

    await kingdom.save();

  }

}

export default {
  updateResources,
  updateResourcesByKingdomId
}
