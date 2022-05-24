import KingdomRepository from "../repositories/kingdom-repository";
import UserService from "../services/user-service";
import BattleService from "../services/battle-service";
import generateErrorMessage from "../utilities/error-message";
import {troopRules} from "../rules/troops-rules";

const storeBattle = async (req, res) => {

  let attacker = await UserService.findById(req.user.id);
  let attackingKingdomId = req.params.kingdomId;
  let attackingKingdom = await KingdomRepository.findKingdomById(
      attackingKingdomId);
  let defendingKingdomId = req.body.target ? req.body.target.kingdomId : null;
  let defendingKingdom = await KingdomRepository.findKingdomById(
      defendingKingdomId);
  let ruler = req.body.target ? req.body.target.ruler : null;
  let defender = await UserService.findByUsername(ruler);
  let troops = req.body.troops;

  if (attacker === null) {
    res.status(404).json(generateErrorMessage('User not found!'));

  } else if (attackingKingdom === null) {
    res.status(404).json(
        generateErrorMessage('Kingdom not found!'));

  } else if (attacker.id !== attackingKingdom.userId) {
    res.status(403).json(
        generateErrorMessage('Attacker must be ruler of the kingdom!'));

  } else if (defendingKingdomId === null || defendingKingdomId === undefined) {
    res.status(400).json(generateErrorMessage('Target ID must be defined!'));

  } else if (defendingKingdom === null) {
    res.status(404).json(generateErrorMessage('Target not found!'));

  } else if (attackingKingdomId == defendingKingdomId) {
    res.status(400).json(
        generateErrorMessage('Attacking own kingdom is forbidden!'));

  } else if (ruler === null || ruler == undefined) {
    res.status(400).json(generateErrorMessage('Ruler must be defined!'));

  } else if (defender === null) {
    res.status(404).json(generateErrorMessage('Ruler not found!'));

  } else if (defender.id !== defendingKingdom.userId) {
    res.status(404).json(
        generateErrorMessage('Ruler must match kingdoms ruler!))'));

  } else if (attacker.id === defender.id) {
    res.status(400).json(generateErrorMessage("Can't attack own kingdom"));

  } else if (troops === null || troops === undefined) {
    res.status(400).json(generateErrorMessage('Troops must be defined!'));

  } else if (!doTroopsHaveType(troops)) {
    res.status(400).json(generateErrorMessage('Troops type must be defined!'));

  } else if (!doesTroopTypeMatchRules(troops)) {
    res.status(400).json(generateErrorMessage(
        'Type of troops must match one of the allowed types!'));

  } else if (!isTroopQuantitySpecified(troops)) {
    res.status(400).json(
        generateErrorMessage('Quantity of troops must be specified!'));

  } else if (!isTroopQuantityGreaterThanZero(troops)) {
    res.status(400).json(
        generateErrorMessage('Quantity of troops must be greater than zero!'));

  } else if (!(await doesAttackerHaveEnoughTroops(attackingKingdom, troops))) {
    res.status(400).json(generateErrorMessage('Not enough troops in kingdom!'));

  } else {
    let battle = await BattleService.initiateBattle(attacker, defender,
        attackingKingdom, defendingKingdom, troops);
    res.json(battle);
  }
};

const showBattleReport = async (req, res) => {

  let user = await UserService.findById(req.user.id);
  let kingdomId = req.params.kingdomId;
  let kingdom = await KingdomRepository.findKingdomById(
      kingdomId);
  let battleId = req.params.battleId;
  let battle = await BattleService.findById(battleId);

  if (user === null) {
    res.status(404).json(generateErrorMessage('User not found!'));

  } else if (kingdom === null) {
    res.status(403).json(
        generateErrorMessage('Kingdom not found!'));

  } else if (user.id !== kingdom.userId) {
    res.status(403).json(
        generateErrorMessage('User must be ruler of the kingdom!'));

  } else if (battleId === undefined || battleId === null) {
    res.status(400).json(generateErrorMessage('Battle ID must be specified!'));

  } else if (battle === null) {
    res.status(404).json(generateErrorMessage('Battle not found!'));

  } else if (!(await isUserPatOfBattle(battle, user))) {
    res.status(403).json(generateErrorMessage('User not part of the battle!'));

  } else {
    res.json(await BattleService.getBattleReport(battle, user));
  }
};

const showAllBattles = async (req, res) => {

  let user = await UserService.findById(req.user.id);
  let kingdomId = req.params.kingdomId;
  let kingdom = await KingdomRepository.findKingdomById(kingdomId);

  if (user === null) {
    res.status(404).json(generateErrorMessage('User not found!'));

  } else if (kingdom === null) {
    res.status(403).json(
        generateErrorMessage('Kingdom not found'));

  } else {
    res.json(await BattleService.showAllBattlesAsAttackingAndDefendingKingdom(
        kingdomId));
  }
};

const getLatestReport = async (req, res) => {
  let attackingKingdomId = req.params.kingdomId;
  let defendingKingdomId = req.body.defendingKingdom
  let attackingKingdom = await KingdomRepository.findKingdomById(
      attackingKingdomId);
  let defendingKingdom = await KingdomRepository.findKingdomById(
      defendingKingdomId);

  let user = await UserService.findById(req.user.id);

  if (user === null) {
    res.status(404).json(generateErrorMessage('User not found!'));

  } else if (!attackingKingdomId) {
    res.status(400).json(
        generateErrorMessage('Attacking kingdom must be defined!'))

  } else if (!attackingKingdom) {
    res.status(404).json(generateErrorMessage('Kingdom not found!'));

  } else if (attackingKingdom.userId !== user.id) {
    res.status(403).json(
        generateErrorMessage('Access to foreign battles is forbidden!'))

  } else if (!defendingKingdomId) {
    res.status(400).json(
        generateErrorMessage('Defending kingdom must be defined!'));

  } else if (!defendingKingdom) {
    res.status(404).json(generateErrorMessage('Kingdom not found!'));

  } else {
    res.json(await BattleService.getLatestReport(attackingKingdomId,
        defendingKingdomId));
  }
};

const getAllActiveBattles = async (req, res) => {
  let user = await UserService.findById(req.user.id);
  let attackingKingdomId = req.params.kingdomId;
  let attackingKingdom = await KingdomRepository.findKingdomById(
      attackingKingdomId);

  if (user === null) {
    res.status(404).json(generateErrorMessage('User not found!'));

  } else if (!attackingKingdomId) {
    res.status(400).json(
        generateErrorMessage('Attacking kingdom must be defined!'))

  } else if (!attackingKingdom) {
    res.status(404).json(generateErrorMessage('Kingdom not found!'));

  } else if (attackingKingdom.userId !== user.id) {
    res.status(403).json(
        generateErrorMessage('Access to foreign battles is forbidden!'))

  } else {
    res.json(await BattleService.getAllUnfinishedIncomingOutgoing(
        attackingKingdomId));
  }
}

// -------  HELPER FUNCTIONS ----------

const isUserPatOfBattle = async (battle, user) => {
  let attacker = await battle.getAttacker();
  let defender = await battle.getDefender();
  if (attacker.id === user.id) {
    return true;
  } else if (defender.id = user.id) {
    return true
  } else {
    return false;
  }
}

const doesAttackerHaveEnoughTroops = async (attackingKingdom,
    troopsToBattle) => {
  let troops = await attackingKingdom.getTroops();
  let doesAttackerHaveEnoughTroops = true;
  for (let i = 0; i < troopsToBattle.length; i++) {
    for (let j = 0; j < troops.length; j++) {
      if (troopsToBattle[i].type === troops[j].type) {
        if (troopsToBattle[i].quantity > troops[j].quantity) {
          doesAttackerHaveEnoughTroops = false;
          return doesAttackerHaveEnoughTroops;
        }
      }
    }
  }
  return doesAttackerHaveEnoughTroops;
};

const doTroopsHaveType = (troops) => {
  let doTroopsHaveType = troops.length > 0;
  for (let i = 0; i < troops.length; i++) {
    if (troops[i].type === null || troops[i].type === undefined) {
      doTroopsHaveType = false;
      return doTroopsHaveType;
    }
  }
  return doTroopsHaveType;
};

const doesTroopTypeMatchRules = (troops) => {
  let troopsTypes = troopRules(null).type;
  let countMatches = 0;
  for (let i = 0; i < troops.length; i++) {
    for (let j = 0; j < troopsTypes.length; j++) {
      if (troops[i].type === troopsTypes[j]) {
        countMatches++;
      }
    }
  }
  return countMatches === troops.length;
};

const isTroopQuantitySpecified = (troops) => {
  let isTroopQuantitySpecified = true;
  for (let i = 0; i < troops.length; i++) {
    if (troops[i].quantity === null || troops[i].quantity === undefined) {
      isTroopQuantitySpecified = false;
      return isTroopQuantitySpecified;
    }
  }
  return isTroopQuantitySpecified;
};

const isTroopQuantityGreaterThanZero = (troops) => {
  let isTroopQuantityGreaterThanZero = true;
  for (let i = 0; i < troops.length; i++) {
    if (troops[i].quantity <= 0) {
      isTroopQuantityGreaterThanZero = false;
      return isTroopQuantityGreaterThanZero;
    }
  }
  return isTroopQuantityGreaterThanZero;
}

export default {
  storeBattle,
  showBattleReport,
  showAllBattles,
  getLatestReport,
  getAllActiveBattles
};
