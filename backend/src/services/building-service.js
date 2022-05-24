import BuildingRepository from "../repositories/building-repository";
import generateErrorMessage from "../utilities/error-message";
import KingdomRepository from "../repositories/kingdom-repository";
import {buildingRules} from "../rules/building-rules";
import {rules} from "../rules/rules";
import UnitLevelRepository from "../repositories/unit-level-repository";

const getBuildings = async (kingdomId, userId) => {
  let currentKingdom = await KingdomRepository.findKingdomById(kingdomId);

  let authenticationError = null;
  let idError = checkKingdomIdError(kingdomId);
  const parseId = parseInt(kingdomId);
  let buildings = null;

  if (idError) {
    return {idError, buildings};
  }

  if (!currentKingdom || currentKingdom.userId !== userId) {
    authenticationError = generateErrorMessage(
        "This kingdom does not belong to authenticated player");
    return {authenticationError, buildings};
  }

  buildings = await BuildingRepository.findAllByKingdomIdAndStatusTrue(parseId);

  if (buildings.length === 0) {
    buildings = {"status": "Kingdom has 0 active buildings"};
    return buildings;
  }

  return buildings;
};

const getKingdomBuildings = async (kingdomId) => BuildingRepository.findAllBuiltAndActiveByKingdomId(
    kingdomId);

const addBuildingToKingdom = async (kingdomId, type, userId) => {
  let authenticationError = null;

  let idError = checkKingdomIdError(kingdomId);
  let inputError = null;
  const parseId = parseInt(kingdomId);
  let buildingToCreate = null;
  const kingdom = await KingdomRepository.findKingdomById(parseId);

  if (idError) {
    return {idError, buildingToCreate};
  }

  if (type === undefined || type === null) {
    inputError = generateErrorMessage("Type is required!");
    return {inputError, buildingToCreate};
  }

  if (!kingdom) {
    inputError = generateErrorMessage("No kingdom with provided ID!")
    return {inputError, buildingToCreate};
  }

  if (!kingdom || kingdom.userId !== userId) {
    authenticationError = generateErrorMessage(
        "This kingdom does not belong to authenticated player");
    return {authenticationError, buildingToCreate};
  }

  // searching for correct building names
  const buildingStats = getBuildingStatsByName(1, type);

  if (!buildingStats) {
    inputError = generateErrorMessage("Incorrect type!");
    return {inputError, buildingToCreate};
  }

  const buildingWithTargetPosition = await BuildingRepository.findAllByKingdomIdWhereType(
      parseId, type);
  if (buildingWithTargetPosition.length !== 0) {
    inputError = generateErrorMessage("That type of building already exists!");
    return {inputError, buildingToCreate};
  }

  const currentGold = kingdom.gold;
  const currentFood = kingdom.food;
  let resourceError = null

  if (buildingStats.foodCost > currentFood || buildingStats.goldCost
      > currentGold) {
    resourceError = generateErrorMessage("Not enough resources!");
    return {resourceError, buildingToCreate};
  }

  buildingToCreate = {
    type: buildingStats.name,
    position: buildingStats.position,
    status: false,
    level: 1,
    startTime: Math.floor(Date.now() / 1000),
    endTime: Math.floor(Date.now() / 1000) + buildingStats.constructionTime,
    destroyTime: null,
    kingdomId: kingdom.id
  }
  kingdom.food = currentFood - buildingStats.foodCost;
  kingdom.gold = currentGold - buildingStats.goldCost;
  await KingdomRepository.save(kingdom);
  await BuildingRepository.createBuilding(buildingToCreate);
  return buildingToCreate;
}

const upgradeOrTeardownBuilding = async (kingdomId, buildingId, action, instant,
    userId) => {
  let kingdomIdError = checkKingdomIdError(kingdomId);
  let buildingIdError = checkBuildingIdError(buildingId);
  let typeOfAction = action;
  let inputError = null;
  let resourceError = null;
  let currentBuilding = await BuildingRepository.findBuildingByPk(buildingId);
  let currentKingdom = await KingdomRepository.findKingdomById(kingdomId);
  let kingdomTownhall = await BuildingRepository.findTownhallByKingdomId(
      kingdomId);

  let authenticationError = null;

  if (kingdomIdError) {
    return {kingdomIdError, currentBuilding};
  }
  if (buildingIdError) {
    return {buildingIdError, currentBuilding};
  }

  // if (!currentKingdom || currentKingdom.userId !== userId) {
  //   authenticationError = generateErrorMessage(
  //       "This kingdom does not belong to authenticated player");
  //   return {authenticationError, buildings};
  // }

  if (!typeOfAction) {
    inputError = {error: "Missing action!"};
    return {inputError, currentBuilding};
  }

  if (typeOfAction !== "upgrade" && typeOfAction !== "tear-down") {
    inputError = {error: "Wrong action!"};
    return {inputError, currentBuilding};
  }

  if (!currentBuilding || !currentKingdom) {
    inputError = generateErrorMessage("Invalid ID!");
    return {inputError, currentBuilding};
  }

  if (currentBuilding.kingdomId !== currentKingdom.id) {
    inputError = generateErrorMessage(
        "This building doesn't belong to this kingdom!");
    return {inputError, currentBuilding};
  }

  if (currentBuilding.status === false) {
    inputError = generateErrorMessage(
        "You can't upgrade this building right now!")
    return {inputError, currentBuilding};
  }

  if (typeOfAction === "upgrade") {
    if (currentBuilding.level >= rules(1).max_townhall_level
        || (currentBuilding.level >= kingdomTownhall.level
            && currentBuilding.position !== 1)) {
      inputError = generateErrorMessage(
          "You can't upgrade building above townhall level!");
      return {inputError, currentBuilding};
    }
    currentBuilding = await upgradeBuilding(currentBuilding, currentKingdom);
    console.log(currentBuilding)
    if (!currentBuilding) {
      resourceError = generateErrorMessage(
          "You don't have enough resources to upgrade!");
      return {resourceError, currentBuilding};
    }
  }

  if (typeOfAction === "tear-down" && instant === true) {
    if (currentBuilding.get({ plain : true}).type === "townhall") {
      resourceError = generateErrorMessage("You can't teardown your Townhall!")
      return {resourceError, currentBuilding};
    }
    currentBuilding = teardownWithInstantTrue(currentBuilding, currentKingdom);
    if (!currentBuilding) {
      resourceError = generateErrorMessage(
          "You don't have enough resources to teardown!");
      return {resourceError, currentBuilding};
    } else {
      return {status: "Instant teardown successful!"}
    }
  }

  if (typeOfAction === "tear-down" && instant === false) {
    if (currentBuilding.level === 1) {
      inputError = generateErrorMessage(
          "You can't teardown building on level 1! Please use instant teardown!");
      return {inputError, currentBuilding};
    }
    currentBuilding = teardownWithInstantFalse(currentBuilding);
    return currentBuilding;
  }

  return currentBuilding;

}

const upgradeBuilding = (building, kingdom) => {
  const currentBuildingLevel = building.level;
  const currentKingdomFood = kingdom.food;
  const currentKingdomGold = kingdom.gold;
  const upgradeBuildingLevel = currentBuildingLevel + 1;
  let buildingStats = getBuildingStatsByName(upgradeBuildingLevel,
      building.type);

  console.log(currentKingdomGold < buildingStats.goldCost || currentKingdomFood
      < buildingStats.foodCost)

  console.log(currentKingdomFood
      < buildingStats.foodCost)

  console.log(currentKingdomGold < buildingStats.goldCost)

  if (currentKingdomGold < buildingStats.goldCost || currentKingdomFood
      < buildingStats.foodCost) {
    return null;
  }

  kingdom.set({
    food: currentKingdomFood - buildingStats.foodCost,
    gold: currentKingdomGold - buildingStats.goldCost
  })

  KingdomRepository.save(kingdom);

  building.set({
    status: false,
    level: currentBuildingLevel + 1,
    startTime: Math.floor(Date.now() / 1000),
    endTime: Math.floor(Date.now() / 1000) + buildingStats.constructionTime
  })

  building = BuildingRepository.saveBuilding(building);

  return building;
}

const teardownWithInstantFalse = (building) => {
  const currentBuildingLevel = building.level;
  let buildingStats = getBuildingStatsByName(currentBuildingLevel,
      building.type);
  let buildingTime = buildingStats.constructionTime / 10;

  building.set({
    status: false,
    level: currentBuildingLevel - 1,
    startTime: Math.floor(Date.now() / 1000),
    endTime: Math.floor(Date.now() / 1000) + buildingTime
  })

  building = BuildingRepository.saveBuilding(building);

  return building;
}

const teardownWithInstantTrue = (building, kingdom) => {
  const currentBuildingLevel = building.level;
  const currentKingdomFood = kingdom.food;
  const currentKingdomGold = kingdom.gold;
  const teardownBuildingLevel = currentBuildingLevel - 1;
  let buildingStats = getBuildingStatsByName(teardownBuildingLevel,
      building.type);

  if (currentKingdomGold < buildingStats.goldCost || currentKingdomFood
      < buildingStats.foodCost) {
    return null;
  }

  kingdom.set({
    food: currentKingdomFood - buildingStats.foodCost,
    gold: currentKingdomGold - buildingStats.goldCost
  })

  KingdomRepository.save(kingdom);

  BuildingRepository.destroyBuilding(building);

  return {status: "ok"};
}

const getBuildingStatsByName = (level, type) => {
  const buildingArray = Object.entries(buildingRules(level));
  let buildingStats;
  for (let i = 0; i < buildingArray.length; i++) {
    if (type === buildingArray[i][1].name) {
      buildingStats = buildingArray[i][1];
    }
  }
  return buildingStats;
}

const checkKingdomIdError = (kingdomId) => {
  let idError = null;
  const parseId = parseInt(kingdomId);

  if (Number.isNaN(parseId)) {
    idError = generateErrorMessage("Kingdom ID is not a number!");
    return idError;
  }

  if (kingdomId === null || kingdomId === undefined) {
    idError = generateErrorMessage("Wrong kingdom ID!");
    return idError;
  }
}

const checkBuildingIdError = (buildingId) => {
  let idError = null;
  const parseId = parseInt(buildingId);

  if (Number.isNaN(parseId)) {
    idError = generateErrorMessage("Building ID is not a number!");
    return idError;
  }

  if (buildingId === null || buildingId === undefined) {
    idError = generateErrorMessage("Wrong building ID!");
    return idError;
  }
}

const updateBuildings = async (kingdomId, currentTime) => {
  const buildings = await BuildingRepository.findAllByKingdomIdAndStatusFalse(
      kingdomId);
  if (!currentTime) {
    currentTime = Math.floor(Date.now() / 1000);
  }

  for (const currentBuilding of buildings) {
    if (currentBuilding.endTime < currentTime) {
      currentBuilding.status = true;
      await BuildingRepository.saveBuilding(currentBuilding);
    }
  }

}

const countBuildingsResources = async (kingdomId) => {
  let foodConsumption = 0;
  let goldConsumption = 0;
  let foodProduction = 0;
  let goldProduction = 0;
  let buildings = await getKingdomBuildings(kingdomId);

  if (buildings) {

    //count food/gold consumption and generation for each active and built building in a kingdom
    for (let building of buildings) {
      if (building.type === 'farm') {
        foodProduction += (buildingRules(building.level).farm.generation || 0);
      } else if (building.type === 'mine') {
        goldProduction += (buildingRules(building.level).mine.generation || 0);
      }
      foodConsumption += (buildingRules(
          building.level)[building.type].foodConsumption || 0);
      goldConsumption += (buildingRules(
          building.level)[building.type].goldConsumption || 0);
    }

  }
  return {
    foodConsumption: foodConsumption,
    goldConsumption: goldConsumption,
    foodProduction: foodProduction,
    goldProduction: goldProduction
  }
}

const getKingdomLevelByTownhall = async (kingdomId) => {
  let townhall = await BuildingRepository.findTownhallByKingdomId(kingdomId);
  if (townhall) {
    return townhall.level;
  } else {
    return 0;
  }
}

const countDestroyableBuildingsForFood = async (kingdomId) => {
  let buildings = await BuildingRepository.countDestroyableBuildingsExcept(
      kingdomId, "farm");
  let townhall = await getKingdomLevelByTownhall(kingdomId);
  return townhall + buildings;
}

const countDestroyableBuildingsForGold = async (kingdomId) => {
  let buildings = await BuildingRepository.countDestroyableBuildingsExcept(
      kingdomId, "mine");
  let townhall = await getKingdomLevelByTownhall(kingdomId);
  return townhall + buildings;
}

const destroyRandomBuildingExcept = async (kingdomId, buildingType) => {
  let building = await BuildingRepository.getRandomBuildingExcept(kingdomId,
      buildingType);
  // if there is some building which is not farm or townhall -> destroy
  if (building) {
    await BuildingRepository.destroyBuilding(building);
  } else {
    //if not, then downgrade townhall by one level
    let townhall = await BuildingRepository.findTownhallByKingdomId(kingdomId);
    townhall.level -= 1;
    await BuildingRepository.saveBuilding(townhall);
  }
}

const destroyRandomBuildingForFood = async (kingdomId) => destroyRandomBuildingExcept(
    kingdomId, "farm");
const destroyRandomBuildingForGold = async (kingdomId) => destroyRandomBuildingExcept(
    kingdomId, "mine");

const getUpdateBreakpoints = async (kingdomId, currentTick) => {
  let breakpoints = [];
  let buildings = await BuildingRepository.findAllInProgressUntil(kingdomId, currentTick);
  for (let building of buildings) {
    breakpoints.push(building.endTime);
  }
  return breakpoints;
}

//---> used during Kingdom creation, to generate lvl 1 starter buildings  <---
const generateStarterBuildings = async (kingdomId) => {
  let starterBuildingTypes = buildingRules().startedBuildings;
  for (let i = 0; i < starterBuildingTypes.length; i++) {
    let buildingStats = getBuildingStatsByName(1, starterBuildingTypes[i]);
    let buildingToCreate = {
      type: buildingStats.name,
      position: buildingStats.position,
      status: true,
      level: 1,
      startTime: Math.floor(Date.now() / 1000),
      endTime: Math.floor(Date.now() / 1000),
      destroyTime: null,
      kingdomId: kingdomId
    }
    await BuildingRepository.createBuilding(buildingToCreate);
  }
}

export default {
  getBuildings,
  getKingdomBuildings,
  addBuildingToKingdom,
  getBuildingStatsByName,
  upgradeOrTeardownBuilding,
  updateBuildings,
  countBuildingsResources,
  getKingdomLevelByTownhall,
  destroyRandomBuildingForFood,
  destroyRandomBuildingForGold,
  countDestroyableBuildingsForFood,
  countDestroyableBuildingsForGold,
  checkKingdomIdError,
  checkBuildingIdError,
  getUpdateBreakpoints,
  generateStarterBuildings
}