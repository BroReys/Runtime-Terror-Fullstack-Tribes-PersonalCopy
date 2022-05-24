import {troopRules} from "../rules/troops-rules";
import TroopsRepository
  from "../repositories/troops-repositories/troops-repository";
import MapService from "./map-service";
import KingdomRepository from "../repositories/kingdom-repository";
import UserRepository from "../repositories/user-repository";
import UnitLevelService from "./unit-level-service";
import BuildingService from "./building-service";

const initiatePilgrimageToSettleKingdom = async (settlerRuler, settlerKingdom,
    coordinateX,
    coordinateY, troops) => {

  let speedOfSettlers = await getSpeedOfSettlers(settlerKingdom)
  let timeOfTravel = calculateDistance(settlerKingdom, coordinateX, coordinateY
  ) / speedOfSettlers;
  let troopsOfKingdom = await settlerKingdom.getTroops();
  let settlers = troopsOfKingdom.filter(troop => troop.type === 'settlers');

  settlers[0].timeOfArrival = Math.floor(
      Date.now() / 1000 + timeOfTravel * 60 * 60);
  settlers[0].quantityInBattle = settlers[0].quantityInBattle
      + troops[0].quantity;
  settlers[0].quantity = settlers[0].quantity - troops[0].quantity;
  settlers[0].coordinateX = coordinateX;
  settlers[0].coordinateY = coordinateY;

  await settlers[0].save();

  return settlers[0];
}

async function getSpeedOfSettlers(settlerKingdom) {
  let troops = await settlerKingdom.getTroops();
  let settler = await troops.filter(troop => troop.type === 'settlers');
  let unitLevel = await settler[0].getUnitLevel();

  let speed = troopRules(unitLevel.upgradeLevel).settlers.speed;
  return speed;
}

function calculateDistance(settlerKingdom, coordinateX, coordinateY) {
  let x1 = settlerKingdom.coordinateX;
  let y1 = settlerKingdom.coordinateY;
  let x2 = coordinateX;
  let y2 = coordinateY;

  return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
}

const findArrivedSettlers = async () => {
  return await TroopsRepository.findArrivedSettlers();
}

const findReturnedSettlers = async () => {
  return await TroopsRepository.findReturnedSettlers();
}

const setPropertiesOfReturnedSettlers = async (returnedSettlers) => {

  for (let i = 0; i < returnedSettlers.length; i++) {
    returnedSettlers[i].quantity = returnedSettlers[i].quantity
        + returnedSettlers[i].quantityInBattle;
    returnedSettlers[i].quantityInBattle = returnedSettlers[i].quantityInBattle
        - returnedSettlers[i].quantityInBattle;
    returnedSettlers[i].coordinateX = null;
    returnedSettlers[i].coordinateY = null;
    returnedSettlers[i].timeOfComeback = null;
    returnedSettlers[i].save();
  }
}

const tileCheckOfArrivedSettlers = async (arrivedSettlers) => {

  for (let i = 0; i < arrivedSettlers.length; i++) {
    let tile = (await MapService.identifyKingdom(
        arrivedSettlers[i].coordinateX,
        arrivedSettlers[i].coordinateY));

    if (tile.status !== 'free') {
      await setTimeOfComeBack(arrivedSettlers[i]);
    } else {
      await createKingdomFromSettlers(arrivedSettlers[i]);
    }
  }

}

async function setTimeOfComeBack(settlers) {
  let settlerKingdom = await KingdomRepository.findKingdomById(
      settlers.kingdomId);
  let speedOfSettlers = await getSpeedOfSettlers(settlerKingdom);
  let timeOfTravel = calculateDistance(settlerKingdom, settlers.coordinateX,
      settlers.coordinateY
  ) / speedOfSettlers;

  settlers.timeOfComeback = Math.floor(Date.now() / 1000 + timeOfTravel);
  settlers.timeOfArrival = null;
  await settlers.save();
}

async function createKingdomFromSettlers(settlers) {
  const originKingdom = await KingdomRepository.findKingdomById(
      settlers.kingdomId);
  const user = await UserRepository.findById(originKingdom.userId);
  const userKingdoms = await user.getKingdoms();
  const romanNum = romanizer(userKingdoms.length);
  const kingdomName = `${user.username}’s kingdom ${romanNum}`;

  let kingdomFromSettlers = {
    name: kingdomName,
    coordinateX: settlers.coordinateX,
    coordinateY: settlers.coordinateY,
    userId: user.id,
  };

  const kingdomSavedFromSettlers = await KingdomRepository.createKingdom(
      kingdomFromSettlers);
  await UnitLevelService.generateBasicUnitLevels(kingdomSavedFromSettlers.id);
  //todo generate basic buildings
  await BuildingService.generateStarterBuildings(kingdomSavedFromSettlers.id)

  settlers.quantityInBattle = settlers.quantityInBattle
      - settlers.quantityInBattle;
  settlers.timeOfArrival = null;
  settlers.coordinateX = null;
  settlers.coordinateY = null;
  settlers.save();
}

function romanizer(num) {
  let lookup = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  }, roman = '', i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

export default {
  initiatePilgrimageToSettleKingdom,
  findArrivedSettlers,
  tileCheckOfArrivedSettlers,
  setPropertiesOfReturnedSettlers,
  findReturnedSettlers
}