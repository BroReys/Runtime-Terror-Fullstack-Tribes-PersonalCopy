import authenticationMiddleware from "../middlewares/authentication-middleware";
import MapService from "../services/map-service";
import UserService from "../services/user-service";
import generateErrorMessage from "../utilities/error-message";
import {troopRules} from "../rules/troops-rules";
import KingdomRepository from "../repositories/kingdom-repository";
import SettleService from "../services/settle-service"

const startSettlersPilgrimage = async (req, res) => {

  let token = req.user;
  let settlerRuler = await UserService.findById(req.user.id);
  let settlerKingdomId = req.params.kingdomId;
  let settlerKingdom = await KingdomRepository.findKingdomById(
      settlerKingdomId);
  let coordinateX = req.body.coordinateX;
  let coordinateY = req.body.coordinateY;
  let tileStatus = await MapService.identifyKingdom(coordinateX, coordinateY);
  let troops = req.body.troops;

  if (token === null || token === undefined) {
    res.status(401).json(generateErrorMessage('Token is missing!'));

  } else if (!settlerRuler) {
    res.status(404).json(generateErrorMessage('User not found!'));

  } else if (!settlerKingdom) {
    res.status(404).json(generateErrorMessage('Kingdom not found!'));

  } else if ((tileStatus).status !== 'free') {
    res.status(403).json(
        generateErrorMessage('Target tile not valid or is not free!'));

  } else if (!troops) {
    res.status(400).json(generateErrorMessage('Settlers must be defined!'));

  } else if (!doTroopsHaveTypeSettlers(troops)) {
    res.status(400).json(generateErrorMessage(
        'Only settlers can be part of pilgrimage to settle new Kingdom!'));

  } else if (!isTroopQuantitySpecified(troops)) {
    res.status(400).json(
        generateErrorMessage('Valid quantity of troops must be specified!'));

  } else if (!(await doesRulerHaveEnoughSettlers(settlerKingdom, troops))) {
    res.status(400).json(
        generateErrorMessage('Not enough settlers in kingdom!'));

  } else {
    let settlersOnPilgrimage = await SettleService.initiatePilgrimageToSettleKingdom(
        settlerRuler, settlerKingdom, coordinateX, coordinateY, troops);
    res.json(settlersOnPilgrimage);
  }
}

const doTroopsHaveTypeSettlers = (troops) => {
  let doTroopsHaveTypeSettlers = true;
  for (let i = 0; i < troops.length; i++) {
    if (!troops[i].type && troops[i].type !== 'settlers') {
      let doTroopsHaveTypeSettlers = false;
      return doTroopsHaveTypeSettlers;
    }
  }
  return doTroopsHaveTypeSettlers;
}

const isTroopQuantitySpecified = (troops) => {
  let isTroopQuantitySpecified = true;
  for (let i = 0; i < troops.length; i++) {
    if (!troops[i].quantity || troops[i].quantity < 0 || isNaN(
        troops[i].quantity)) {
      isTroopQuantitySpecified = false;
      return isTroopQuantitySpecified;
    }
  }
  return isTroopQuantitySpecified;
};

async function doesRulerHaveEnoughSettlers(settlerKingdom, troopsToSettle) {
  let troops = await settlerKingdom.getTroops();
  let settler = await troops.filter(troop => troop.type === 'settlers');
  let doesRulerHaveEnoughSettlers = true;
  if (troopsToSettle[0].quantity > settler[0].quantity) {
    doesRulerHaveEnoughSettlers = false;
    return doesRulerHaveEnoughSettlers;
  }

  return doesRulerHaveEnoughSettlers;
}

export default {
  startSettlersPilgrimage,
}