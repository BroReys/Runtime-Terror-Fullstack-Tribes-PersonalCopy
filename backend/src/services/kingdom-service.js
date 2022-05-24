import KingdomRepository from "../repositories/kingdom-repository";
import MapService from "./map-service";
import UserService from "./user-service";
import bcrypt from "bcrypt";
import UnitLevelService from "./unit-level-service";
import Kingdom from "../models/kingdom";
import UnitLevelRepository from "../repositories/unit-level-repository";
import {troopRules} from "../rules/troops-rules";
import {buildingRules} from "../rules/building-rules";
import BuildingService from "./building-service";
import TroopsService from "./troops-services/troops-service";
import BuildingRepository from "../repositories/building-repository";
import UserRepository from "../repositories/user-repository";
import User from "../models/user";
import banditsUtil from '../utilities/bandits'

const createKingdom = async ({
  username,
  password,
  kingdomName,
  coordinateX,
  coordinateY
}) => {

  const {error, status} = await MapService.identifyKingdom(coordinateX,
      coordinateY);

  const userInDatabase = await UserService.findByUsername(username);

  if (!username) {
    return {status: 400, error: 'Username must be provided!'};

  } else if (!password) {
    return {status: 400, error: 'Password must be provided!'};

  } else if (!userInDatabase) {
    return {status: 404, error: 'User not found!'};

  } else {

    let hashedPassword = userInDatabase.password;
    const doesPasswordMatch = bcrypt.compareSync(password, hashedPassword);

    if (userInDatabase.hadKingdomAlready) {
      return {status: 404, error: 'You already have a kingdom!'};

    } else if (!userInDatabase.active) {
      return {status: 403, error: 'User registration not completed!'};

    } else if (!doesPasswordMatch) {
      return {status: 403, error: 'Invalid password'};

   // } else if (!coordinateX || !coordinateY) {
   } else if (isNaN(coordinateX) || isNaN(coordinateY)) {
      return {status: 400, error: 'Coordinates must be provided!'};

    } else if (error) {
      return {status: 403, error: error};

    } else if (status === "taken") {
      return {
        status: 403,
        error: 'Coordinates already taken by another kingdom'
      };

    } else {
      let kingdom = {
        name: kingdomName || userInDatabase.username + "'s kingdom",
        coordinateX: coordinateX,
        coordinateY: coordinateY,
        userId: userInDatabase.id,
      };
      const savedKingdom = await KingdomRepository.createKingdom(kingdom);
      userInDatabase.hadKingdomAlready = true;
      await userInDatabase.save();
      await UnitLevelService.generateBasicUnitLevels(savedKingdom.id);
      await BuildingService.generateStarterBuildings(savedKingdom.id);
      return {
        status: 200,
        message: `Congratulations '${username}'! Your kingdom '${kingdom.name}' has been found at world map coordinates [${coordinateX},${coordinateY}]!`
      };
    }
  }
};

const createAiKingdoms = async () => {

  if (!(await UserRepository.findUserByUsername('AI-ruler'))) {
    //TODO exclude from middlewares
    let buildingTypes = buildingRules().type;
    let troopTypes = troopRules().type;

    let user = {
      username: "AI-ruler",
      email: "airuler@hotmail.com",
      password: "Password123",
      role: "user"
    }

    let savedUser = await User.create(user);

    for (let i = 1; i <= Math.floor(Math.random() * (10) + 3); i++) {

      let level = Math.floor(Math.random() * (15 - 1) + 1);
      let x = Math.floor(Math.random() * 10); // TODO (10-1) + 1 vs (10) + 1
      let y = Math.floor(Math.random() * 10);

      while ((await MapService.identifyKingdom(x, y)).status === 'taken'
      || (await MapService.identifyKingdom(x, y)).error) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }

      let kingdom = {
        name: `AI-kingdom${i}`,
        coordinateX: x,
        coordinateY: y,
        gold: 1000 * level,
        food: 2000 * level,
        userId: savedUser.id
      };

      let newKingdom = await Kingdom.create(kingdom);
      await UnitLevelService.generateBasicUnitLevels(newKingdom.id);

      for (let j = 0; j < buildingTypes.length; j++) {

        await BuildingService.addBuildingToKingdom(newKingdom.id,
            buildingTypes[j], newKingdom.userId);
        let building = await BuildingRepository.findOneByKingdomIdWhereType(
            newKingdom.id, buildingTypes[j]);

        if (buildingTypes[j] === 'townhall') {
          building.level = level + 1;
        } else {
          building.level = level;
        }
        await building.save();
      }

      let unitQuantities = [
        {'phalanx': 0.25, 'swordsman': 0.25, 'scout': 0.25, 'cavalry': 0.25},
        {'phalanx': 0.50, 'swordsman': 0.15, 'scout': 0.10, 'cavalry': 0.25},
        {'phalanx': 0.75, 'swordsman': 0.00, 'scout': 0.25, 'cavalry': 0.00},
        {'phalanx': 0.50, 'swordsman': 0.00, 'scout': 0.50, 'cavalry': 0.00}
      ];

      let randomUnitQuantity = Math.floor(
          Math.random() * unitQuantities.length);

      for (let l = 0; l < troopTypes.length; l++) {

        if (troopTypes[l] !== 'diplomat' && troopTypes[l] !== 'settlers'
            && troopTypes[l] !== 'catapult') {

          //TODO 100 * level ? 10 * level ?
          let quantity = (100 * level)
              * unitQuantities[randomUnitQuantity][troopTypes[l]];
          await TroopsService.joinTroopArmy(troopTypes[l], quantity,
              newKingdom.id);

          let unitLevel = await UnitLevelRepository.findUnitLevelByTroopTypeAndByKingdomId(
              newKingdom.id, troopTypes[l]);
          unitLevel.upgradeLevel = level;
          await unitLevel.save();
        }
      }
      newKingdom.gold = 1000 * (level + 1);
      newKingdom.food = 2000 * (level + 1);
      await newKingdom.save();
    }
    await banditsUtil.createBandits(1)
  }
};

const updateKingdomName = async (kingdomId, kingdomName, userId) => {

  let kingdom = await KingdomRepository.findKingdomById(kingdomId);
  let owner = await UserService.findById(userId);

  if (!kingdomId) {
    return {status: 400, error: 'Id must be provided!'};

  } else if (!kingdom) {
    return {status: 404, error: 'No kingdom with this id found!'};

  } else if (!kingdomName) {
    return {status: 400, error: "Kingdom's name must be provided!"};

  } else if (kingdom.userId !== owner.id) {
    return {status: 403, error: 'Kingdom belongs to another user!'};

  } else {
    kingdom.name = kingdomName;
    await KingdomRepository.save(kingdom);
    return {status: 200, message: "ok"};
  }
};

const getKingdomDetails = async (kingdomId, userId) => {
  let kingdom = await KingdomRepository.findKingdomById(kingdomId);
  let owner = await UserService.findById(userId);

  if (!kingdomId) {
    return {status: 400, error: 'Id must be provided!'};

  } else if (!kingdom) {
    return {status: 404, error: 'No kingdom with this id found!'};

  } else if (kingdom.userId !== owner.id) {
    return {status: 403, error: 'Kingdom belongs to another user!'};

  } else {
    return {
      status: 200,
      details: {
        kingdom: {
          kingdomId: kingdom.id,
          kingdomName: kingdom.name,
          ruler: owner.username,
          loyalty: kingdom.loyalty,
          location: {
            coordinateX: kingdom.coordinateX,
            coordinateY: kingdom.coordinateY,
          }
        },
        resources: [
          {
            type: 'food',
            amount: kingdom.food,
            production: kingdom.foodProduction
          }, {
            type: 'gold',
            amount: kingdom.gold,
            production: kingdom.goldProduction
          }
        ],
        buildings: await KingdomRepository.getKingdomsBuildings(kingdom.id),
        troops: await KingdomRepository.getKingdomsTroops(kingdom.id),
      }
    };
  }
};

const findKingdomsByUserId = async (userId) => KingdomRepository.findKingdomByUserId(
    userId);

const getAllKingdoms = async () => KingdomRepository.getAllKingdoms();

const getAllKingdomsByUserId = async (userId) => KingdomRepository.findKingdomsByUserId(userId);

const getKingdomsBuildings = async () => KingdomRepository.getKingdomsBuildings();

const getKingdomsTroops = async () => KingdomRepository.getKingdomsTroops();

const getWinnerStats = async () => {
  let top_ruler = await KingdomRepository.getWinnerStats();
  return {
    userId: top_ruler[0].get('userId'),
    count: top_ruler[0].get('count')
  }
};

const getKingdomsCount = async () => KingdomRepository.count();

const getFirstPlayer = async () => KingdomRepository.getFirstPlayer();

const getKingdomById = async (kingdomId) => KingdomRepository.findKingdomById(
    kingdomId);

const getDTOAllKingdoms = async () => {
  let kingdoms = await KingdomRepository.getAllKingdoms();
  let DTOs = [];
  for (let i = 0; i < kingdoms.length; i++) {
    let user = await UserService.findById(kingdoms[i].userId);
    let username = user === null ? null : user.username;
    let DTO = {
      id : kingdoms[i].id,
      name: kingdoms[i].name,
      ruler: username,
      coordinateX: kingdoms[i].coordinateX,
      coordinateY: kingdoms[i].coordinateY
    }
    DTOs[i] = DTO;
  }
  return DTOs;
}

const getAllUsersKingdomsOrdered = async (userId) => KingdomRepository.findKingdomsByUserIdOrderedByAcquiredAt(userId);


export default {
  createKingdom,
  createAiKingdoms,
  updateKingdomName,
  getKingdomDetails,
  getKingdomsTroops,
  getKingdomsBuildings,
  findKingdomsByUserId,
  getAllKingdoms,
  getWinnerStats,
  getKingdomsCount,
  getFirstPlayer,
  getKingdomById,
  getAllKingdomsByUserId,
  getDTOAllKingdoms,
  // getUsersKingdoms,
  getAllUsersKingdomsOrdered
};
