import AttackerTroopsRepository
  from "../repositories/battle-repositories/attacker-troops-to-battle-repository";
import BattleRepository
  from "../repositories/battle-repositories/battle-repository";
import AttackerLostTroopsRepository
  from "../repositories/battle-repositories/attacker-lost-troops-repository";
import {troopRules} from "../rules/troops-rules";
import {buildingRules} from "../rules/building-rules";
import espionageReportRepository
  from "../repositories/battle-repositories/espionage-report-repository";
import EspionageTroopsRepository
  from "../repositories/battle-repositories/espionage-troops-repository";
import EspionageBuildingsRepository
  from "../repositories/battle-repositories/espionage-buildings-repository";
import defenderLostTroopsRepository
  from "../repositories/battle-repositories/defender-lost-troops-repository";
import bandits from "../utilities/bandits";

const initiateBattle = async (attacker, defender, attackingKingdom,
    defendingKingdom, troops) => {

  let slowestSpeed = await getValueFromTroops(attackingKingdom, troops,
      'speed');
  let timeOfTravel = calculateDistance(attackingKingdom, defendingKingdom)
      / slowestSpeed;
  let possibleBanditsReward = null;
  if (defendingKingdom.name.startsWith('Bandits')) {
    possibleBanditsReward = await bandits.getBanditsReward(defendingKingdom.id);
  }

  let battle = {
    timeOfArrival: Math.floor(Date.now() / 1000 + timeOfTravel * 60 * 60),
    timeOfComeback: Math.floor(
        Date.now() / 1000 + 2 * (timeOfTravel * 60 * 60)),
    possibleBanditsReward: possibleBanditsReward
  };

  let savedBattle = await BattleRepository.create(battle);
  savedBattle.setAttacker(attacker);
  savedBattle.setDefender(defender);
  savedBattle.setDefendingKingdom(defendingKingdom);
  savedBattle.setAttackingKingdom(attackingKingdom);
  await sendTroopsToBattle(attackingKingdom, troops);
  await AttackerTroopsRepository.create(troops, savedBattle);

  return {
    battleId: savedBattle.id,
    resolutionTime: savedBattle.timeOfArrival
  };
};

const startBattle = async (battle) => {

  let attackingKingdom = await battle.getAttackingKingdom();
  let defendingKingdom = await battle.getDefendingKingdom();
  let troopsToBattle = await battle.getAttackerTroopsToBattle();
  let defendersTroops = await defendingKingdom.getTroops();
  let timeOfTravel = (battle.timeOfArrival - battle.startedAt) / 60 / 60;
  let defendingKingdomInfo = await getAttributesForEspionageReport(
      defendingKingdom, defendersTroops);
  let areThereWalkers = doesArmyIncludeWalkers(troopsToBattle);
  let doesArmyIncludeCatapults = doesArmyIncludesType(troopsToBattle,
      'catapult');

  // --------------------- ONLY ESPIONAGE -------------------------------
  if (troopsToBattle.length === 1 && doesArmyIncludesType(troopsToBattle,
      'scout')) {
    await espionageAttack(battle, attackingKingdom, defendingKingdom,
        timeOfTravel, troopsToBattle, defendersTroops);

    // ------------- NO FIGHTERS, NO CATAPULTS, ONLY DIPLOMAT ---------------
  } else if (!areThereWalkers && doesArmyIncludesType(troopsToBattle,
      'diplomat') && !doesArmyIncludeCatapults) {

    if (defendingKingdomInfo.totalTroops === 0) {
      await takeOverAttack(battle, attackingKingdom, defendingKingdom);

      if (doesArmyIncludesType(troopsToBattle, 'scout')) {
        await espionageAttack(battle, attackingKingdom, defendingKingdom,
            timeOfTravel, troopsToBattle, defendersTroops);
      }

    } else {
      await killTroopsType(troopsToBattle, attackingKingdom, battle,
          'diplomat');
      battle.isFinished = true;
      battle.result = 'loss';
      await battle.save();

      if (doesArmyIncludesType(troopsToBattle, 'scout')) {
        await espionageAttack(battle, attackingKingdom, defendingKingdom,
            timeOfTravel, troopsToBattle, defendersTroops);
      }
    }
    // ------------- NO FIGHTER, CATAPULTS INCLUDED -----------------------
  } else if (!areThereWalkers &&
      doesArmyIncludesType(troopsToBattle, 'catapult')) {

    if (defendingKingdomInfo.totalTroops === 0) {
      // ------------ RUN DESTROY ATTACK IF THERE'S BUILDINGS ---------
      if (defendingKingdomInfo.buildings.length > 0) {
        await demolitionAttack(battle, attackingKingdom,
            defendingKingdomInfo.buildings, troopsToBattle);
        battle.isFinished = true;
        battle.result = 'win';
        await battle.save();
      } else {
        battle.isFinished = true;
        battle.result = 'draw';
        await battle.save();      }
      // ------------ RUN DIPLOMATIC MISSION -----------------
      if (doesArmyIncludesType(troopsToBattle, 'diplomat')) {
        await takeOverAttack(battle, attackingKingdom, defendingKingdom);
      }
      // -------------- RUN ESPIONAGE ------------------------
      if (doesArmyIncludesType(troopsToBattle, 'scout')) {
        await espionageAttack(battle, attackingKingdom, defendingKingdom,
            timeOfTravel, troopsToBattle, defendersTroops);
      }

    } else {
      // ---------------- KILL CATAPULTS ----------------
      await killTroopsType(troopsToBattle, attackingKingdom, battle,
          'catapult');
      battle.isFinished = true;
      battle.result = 'loss';
      await battle.save();
      // ------------------ KILL DIPLOMAT --------------------
      if (doesArmyIncludesType(troopsToBattle, 'diplomat')) {
        await killTroopsType(troopsToBattle, attackingKingdom, battle,
            'diplomat');
      }
      // ----------------- RUN ESPIONAGE ------------------
      if (doesArmyIncludesType(troopsToBattle, 'scout')) {
        await espionageAttack(battle, attackingKingdom, defendingKingdom,
            timeOfTravel, troopsToBattle, defendersTroops);
      }
    }
    // ---------------- TOTAL BATTLE ----------------
  } else {

    // ------------------ PLUNDER -----------------
    await plunderAttack(battle, attackingKingdom, defendingKingdom,
        troopsToBattle, timeOfTravel, defendersTroops);

    if (battle.result === 'win') {
      // ------------------- RUN DESTROY ATTACK -------------
      if (doesArmyIncludeCatapults && defendingKingdomInfo.buildings.length
          > 0) {
        await demolitionAttack(battle, attackingKingdom,
            defendingKingdomInfo.buildings, troopsToBattle);
      }
      // ----------------- RUN DIPLOMATIC MISSION ----------
      if (doesArmyIncludesType(troopsToBattle, 'diplomat')) {
        await takeOverAttack(battle, attackingKingdom, defendingKingdom);
      }
      // ----------------- RUN SPIES -----------------------
      if (doesArmyIncludesType(troopsToBattle, 'scout')) {
        await espionageAttack(battle, attackingKingdom, defendingKingdom,
            timeOfTravel, troopsToBattle, defendersTroops);
      }
    }
  }
  battle.beenRead = false;
  await battle.save();
  return battle;
};

const espionageAttack = async (battle, attackingKingdom, defendingKingdom,
    timeOfTravel, troopsInBattle, defendersTroops) => {

  let attackerSpiesPower = await getSpiesPowerByPowerType(attackingKingdom, // get attacker power of only spies and count in the weakening
      troopsInBattle, timeOfTravel, 'attack');
  let defenderSpiesPower = await getSpiesPowerByPowerType(defendingKingdom, // get defender power of only spies
      defendersTroops, timeOfTravel, 'defence');

  let comparePowers = battle.result === 'win' ? 1 : attackerSpiesPower
      - defenderSpiesPower;

  if (comparePowers < 0) { // attacker lost; the losses of spies will be counted in comparison to percentage difference between the powers
    await killPercentageOfTroops(attackerSpiesPower, defenderSpiesPower,
        troopsInBattle, battle, attackingKingdom, 'attacker');

    battle.isFinished = true;
    battle.result = 'loss';
    await battle.save();

  } else if (comparePowers === 0) { // when draw no one dies, no intel, nothing really happens

    battle.isFinished = true;
    battle.result = 'draw';
    await battle.save();

  } else if (comparePowers > 0) {

    let espionageAttributes = await getAttributesForEspionageReport(
        defendingKingdom, defendersTroops);

    let espionageReport = await espionageReportRepository.create(
        espionageAttributes.totalTroops,
        espionageAttributes.totalAttackPower,
        espionageAttributes.totalDefensePower,
        espionageAttributes.gold,
        espionageAttributes.food,
        espionageAttributes.loyalty,
        battle);

    await createTroopEspionageReport(defendersTroops, espionageReport);

    await createBuildingsEspionageReport(espionageAttributes.buildings,
        espionageReport);

    if (battle.result !== 'win') {
      await randomizeDeaths(troopsInBattle, battle, 'attacker',
          attackingKingdom);
    }

    battle.isFinished = true;
    battle.result = 'win';
    await battle.save();
  }
};

const plunderAttack = async (battle, attackingKingdom,
    defendingKingdom, troopsInBattle, timeOfTravel, defenderTroops) => {

  let originalAttackPower = await getValueFromTroops(attackingKingdom,
      troopsInBattle, 'attack');
  let originalDefensePower = await getValueFromTroops(defendingKingdom,
      defenderTroops, 'defence');
  let randomizers = getRandomizersOfBattle(timeOfTravel)

  let randomizedAttack = originalAttackPower
      * randomizers.fortunateEventAttacker
      * randomizers.weakeningAttackerArmy
      * randomizers.unfortunateEventAttacker;

  let randomizedDefense = originalDefensePower
      * randomizers.unfortunateEventDefender
      * randomizers.fortunateEventDefender;

  let comparePowers = randomizedAttack - randomizedDefense;

  if (comparePowers < 0) { // attacker lost; the losses of spies will be counted in comparison to percentage difference between the powers

    await killPercentageOfTroops(randomizedAttack, randomizedDefense,
        troopsInBattle, battle, attackingKingdom, 'attacker');
    await randomizeDeaths(defenderTroops, battle, 'defender', defendingKingdom);

    battle.isFinished = true;
    battle.result = 'loss';
    await battle.save();

  } else if (comparePowers === 0) { // when draw no one dies, no intel, nothing really happens

    await randomizeDeaths(troopsInBattle, battle, 'attacker', attackingKingdom);
    await randomizeDeaths(defenderTroops, battle, 'defender', defendingKingdom);

    battle.isFinished = true;
    battle.result = 'draw';
    await battle.save();

  } else if (comparePowers > 0) {

    await randomizeDeaths(troopsInBattle, battle, 'attacker', attackingKingdom);
    await killPercentageOfTroops(randomizedAttack, randomizedDefense,
        defenderTroops, battle, defendingKingdom, 'defender');

    let carryLimit = await getValueFromTroops(attackingKingdom, troopsInBattle,
        'carry_limit');
    let gold = defendingKingdom.gold;
    let food = defendingKingdom.food;

    if (carryLimit >= (gold + food)) {

      battle.stolenGold = gold;
      battle.stolenFood = food;
      defendingKingdom.gold = 0;
      defendingKingdom.food = 0;
      await defendingKingdom.save();

    } else {
      let ratio = food / (food + gold);
      battle.stolenFood = Math.round(carryLimit * ratio);
      battle.stolenGold = Math.round(carryLimit * (1 - ratio));
      defendingKingdom.gold = defendingKingdom.gold - battle.stolenGold;
      defendingKingdom.food = defendingKingdom.food - battle.stolenFood;
      await defendingKingdom.save();
    }

    battle.result = 'win';
    battle.isFinished = true;
    await battle.save();
  }
};

const demolitionAttack = async (battle, attackingKingdom,
    buildings, troopsToBattle) => {

  for (let i = 0; i < troopsToBattle.length; i++) {
    if (troopsToBattle[i].type === 'catapult') {
      for (let j = 0; j < troopsToBattle[i].quantity; j++) {

        let pickRandomBuilding = Math.floor(Math.random() * buildings.length);

        if (buildings[pickRandomBuilding].level > 0) {
          buildings[pickRandomBuilding].level = buildings[pickRandomBuilding].level
              - 1;

          if (buildings[pickRandomBuilding].level === 0) {
            let destroyedBuilding = {
              type: buildings[pickRandomBuilding].type,
              quantity: 1,
              battleId: battle.id
            }
            await defenderLostTroopsRepository.create(destroyedBuilding);
            await buildings[pickRandomBuilding].destroy();
          }
        }
      }

      let catapultsArray = [];
      catapultsArray[0] = troopsToBattle[i];
      await randomizeDeaths(catapultsArray, battle, 'attacker',
          attackingKingdom);
    }
  }
  battle.isFinished = true;
  battle.result = 'win';
  await battle.save();
};

const takeOverAttack = async (battle, attackingKingdom, defendingKingdom) => {
  defendingKingdom.loyalty = defendingKingdom.loyalty - 25;

  if (defendingKingdom.loyalty <= 0) {
    defendingKingdom.setUser(await attackingKingdom.getUser());
    defendingKingdom.acquiredAt = Date.now() / 1000;
  }

  await defendingKingdom.save();

  battle.isFinished = true;
  battle.result = 'win';
  await battle.save();
};

const returnTroopsToKingdom = async (battle) => {
  let attackingKingdom = await battle.getAttackingKingdom();
  let troopsToBattle = await battle.getAttackerTroopsToBattle();
  let troops = await attackingKingdom.getTroops();

  for (let i = 0; i < troops.length; i++) {
    for (let j = 0; j < troopsToBattle.length; j++) {
      if (troops[i].type === troopsToBattle[j].type) {
        troops[i].quantityInBattle = troops[i].quantityInBattle // remove from in battle
            - troopsToBattle[j].quantity;
        troops[i].quantity = troops[i].quantity + troopsToBattle[j].quantity; // add to troops
        await troops[i].save();
        await troopsToBattle[j].destroy(); // destroy in troops to battle - we care only about dead troops in report
      }
    }
  }

  if (battle.possibleBanditsReward !== null && battle.result === 'win') {
    attackingKingdom.gold = attackingKingdom.gold
        + battle.possibleBanditsReward;
    await attackingKingdom.save();
  }
};

const getBattleReport = async (battle, user) => {

  let attacker = await battle.getAttacker();
  let defender = await battle.getDefender();
  let attackingKingdom = await battle.getAttackingKingdom();
  let defendingKingdom = await battle.getDefendingKingdom();

  let attackerDeadTroops = await battle.getAttackerLostTroops();
  let defenderDeadTroopsAndBuildings = await battle.getDefenderLostTroops();
  let troopsInBattle = await battle.getAttackerTroopsToBattle();

  let report = await battle.getEspionageReport();
  let reportBuilding;
  let reportTroops;

  if (report !== null) {
    reportTroops = await report.getEspionageTroops();
    reportBuilding = await report.getEspionageBuildings();
  }

  let troopsInBattleDTO = getTroopsDTO(troopsInBattle);
  let attackerDeadTroopsDTO = getTroopsDTO(attackerDeadTroops);
  let defenderDeadTroopsDTO = getTroopsDTO(defenderDeadTroopsAndBuildings);

  if (user.id === attacker.id) {
    let currentTime = Date.now() / 1000;
    let timeDiff = currentTime - battle.timeOfComeback;

    if (battle.isFinished && timeDiff > 0) {
      battle.beenRead = true;
      await battle.save();
      return getAttackerFinishedDTO(battle, defendingKingdom, defender,
          troopsInBattleDTO, attackerDeadTroopsDTO, defenderDeadTroopsDTO,
          report, reportBuilding, reportTroops);

    } else {
      battle.beenRead = true;
      await battle.save();
      return getUnfinishedBattleDTO(battle, attackingKingdom, defendingKingdom,
          defender, attacker, troopsInBattleDTO, 'attacker');
    }

  } else if (user.id === defender.id) {

    if (battle.isFinished) {
      battle.beenRead = true;
      await battle.save();
      return getDefenderFinishedDTO(battle, attackingKingdom, attacker,
          attackerDeadTroopsDTO, defenderDeadTroopsDTO, report);

    } else {
      battle.beenRead = true;
      await battle.save();
      return getUnfinishedBattleDTO(battle, attackingKingdom, defendingKingdom,
          defender, attacker, troopsInBattleDTO, 'defender');
    }
  }
};

const showAllBattlesAsAttackingAndDefendingKingdom = async (kingdomId) => {
  let attackerBattles = await BattleRepository.findAllAsAttackingKingdom(
      kingdomId);
  let defenderBattles = await BattleRepository.findAllAsDefendingKingdom(
      kingdomId);
  let attackerDTOs = [];
  let defenderDTOs = [];

  for (let i = 0; i < attackerBattles.length; i++) {
    let defender = await attackerBattles[i].getDefender();
    let defendingKingdom = await attackerBattles[i].getDefendingKingdom();

    let battle = {
      battleId: attackerBattles[i].id,
      beenRead: attackerBattles[i].beenRead,
      result: attackerBattles[i].result,
      timeOfArrival: attackerBattles[i].timeOfArrival,
      timeOfComeback: attackerBattles[i].timeOfComeback,
      isFinished: attackerBattles[i].isFinished,
      defender: defender.username,
      defendingKingdom: defendingKingdom.name
    };
    attackerDTOs[i] = battle;
  }

  for (let i = 0; i < defenderBattles.length; i++) {
    let attacker = await defenderBattles[i].getAttacker();
    let attackingKingdom = await defenderBattles[i].getAttackingKingdom();
    let battle = {
      battleId: defenderBattles[i].id,
      beenRead: defenderBattles[i].beenRead,
      result: defenderBattles[i].result,
      timeOfArrival: defenderBattles[i].timeOfArrival,
      isFinished: defenderBattles[i].isFinished,
      attacker: attacker.username,
      attackingKingdom: attackingKingdom.name
    };
    defenderDTOs[i] = battle;
  }
  return {
    attacker: attackerDTOs,
    defender: defenderDTOs,
  };
};

const getLatestReport = async (attackingKingdomId, defendingKingdomId) => {
  let battle = await BattleRepository.findFinishedByAttackingAndDefendingKingdom(
      attackingKingdomId, defendingKingdomId);
  let report;
  let buildingsReport;
  let troopsReport;
  if (battle) {
    report = await battle.getEspionageReport();
    if (report) {
      buildingsReport = await report.getEspionageBuildings();
      troopsReport = await report.getEspionageTroops();
      return {
        battleDate: battle.startedAt,
        report: getReportDTO(report, buildingsReport, troopsReport)
      };
    }
  }
  return null;
};

const getAllUnfinishedIncomingOutgoing = async (kingdomId) => {

  let defenderBattles = await BattleRepository.findAllUnfinishedIncoming(
      kingdomId);
  let attackerBattles = await BattleRepository.findAllUnfinishedOutgoing(
      kingdomId);

  let attackerDTOs = [];
  let defenderDTOs = [];

  for (let i = 0; i < attackerBattles.length; i++) {
    let defender = await attackerBattles[i].getDefender();
    let defendingKingdom = await attackerBattles[i].getDefendingKingdom();
    let battle = {
      battleId: attackerBattles[i].id,
      timeOfArrival: attackerBattles[i].timeOfArrival,
      timeOfComeback: attackerBattles[i].timeOfComeback,
      defender: defender.username,
      defendingKingdom: defendingKingdom.name
    };
    attackerDTOs[i] = battle;
  }

  for (let i = 0; i < defenderBattles.length; i++) {

    let attacker = await defenderBattles[i].getAttacker();
    let attackingKingdom = await defenderBattles[i].getAttacker();
    let battle = {
      battleId: defenderBattles[i].id,
      timeOfArrival: defenderBattles[i].timeOfArrival,
      attacker: attacker.username,
      defendingKingdom: attackingKingdom.name
    };
    defenderDTOs[i] = battle;
  }
  return {
    outgoing: attackerDTOs,
    incoming: defenderDTOs,
  };
}

const findById = async (id) => {
  return await BattleRepository.findById(id);
};

const findAllUnfinished = async () => {
  return await BattleRepository.findAllUnfinished();
};

const findAllFinished = async () => {
  return await BattleRepository.findAllFinished();
};

// ----------------- HELPER FUNCTIONS ---------------------

const getDefenderFinishedDTO = (battle, attackingKingdom, attacker,
    attackerDeadTroops, defenderDeadTroops, report) => {
  return {
    battleId: battle.id,
    type: 1,
    resolutionTime: battle.timeOfArrival,
    beenRead: battle.beenRead,
    result: battle.result === 'win' ? 'loss' : 'win',
    attacker: {
      attacker: attacker.username,
      attackingKingdom: attackingKingdom.name,
      lostTroops: attackerDeadTroops
    },
    defender: {
      stolenResources: {
        gold: battle.stolenGold,
        food: battle.stolenFood
      },
      lostTroops: defenderDeadTroops,
      intelLeak: report === null ? 'none' : 'full'
    }
  };
};

const getAttackerFinishedDTO = (battle, defendingKingdom, defender,
    troopsToBattle, attackerDeadTroops, defenderDeadTroops, report,
    reportBuilding, reportTroops) => {

  let battleDTOWithoutReport = {
    battleId: battle.id,
    type: 2,
    beenRead: battle.beenRead,
    resolutionTime: battle.timeOfArrival,
    result: battle.result,
    attacker: {
      stolenResources: {
        gold: battle.stolenGold,
        food: battle.stolenFood
      },
      lostTroops: attackerDeadTroops
    },
    defender: {
      defender: defender.username,
      defendingKingdom: defendingKingdom.name,
      lostTroops: defenderDeadTroops
    }
  };

  let battleDTOWithReport;
  if (report !== null) {
    battleDTOWithReport = {
      battleId: battle.id,
      type: 5,
      beenRead: battle.beenRead,
      resolutionTime: battle.timeOfArrival,
      result: battle.result,
      attacker: {
        stolenResources: {
          gold: battle.stolenGold,
          food: battle.stolenFood
        },
        lostTroops: attackerDeadTroops
      },
      defender: {
        defender: defender.username,
        defendingKingdom: defendingKingdom.name,
        lostTroops: defenderDeadTroops
      },
      report: getReportDTO(report, reportBuilding, reportTroops),
    };
  }
  return report === null ? battleDTOWithoutReport : battleDTOWithReport;
};

const getReportDTO = (report, buildingsReport, troopsReport) => {
  return {
    reportId: report.id,
    totalTroops: report.totalTroops,
    totalAttackPower: report.totalAttackPower,
    totalDefensePower: report.totalDefensePower,
    gold: report.gold,
    food: report.food,
    loyalty: report.loyalty,
    troops: getReportDTOTroopBuildings(troopsReport),
    buildings: getReportDTOTroopBuildings(buildingsReport)
  };
};

const getReportDTOTroopBuildings = (report) => {
  let troopReportDTOs = [];
  for (let i = 0; i < report.length; i++) {
    let troop = {
      type: report[i].type,
      level: report[i].level
    };
    troopReportDTOs[i] = troop;
  }
  return troopReportDTOs;
};

const getTroopsDTO = (troops) => {
  let troopsDTOs = [];
  for (let i = 0; i < troops.length; i++) {
    let troopDTO = {
      type: troops[i].type,
      quantity: troops[i].quantity,
    }
    troopsDTOs[i] = troopDTO;
  }
  return troopsDTOs;
};

const getUnfinishedBattleDTO = (battle, attackingKingdom, defendingKingdom,
    defender, attacker, troopsToBattle, role) => {

  return role === 'attacker' ? {
    battleId: battle.id,
    type: 4,
    beenRead: battle.beenRead,
    resolutionTime: battle.timeOfArrival,
    timeOfComeback: battle.timeOfComeback,
    targetKingdom: defendingKingdom.name,
    targetRuler: defender.username,
    troops: troopsToBattle
  } : {
    battleId: battle.id,
    type: 3,
    beenRead: battle.beenRead,
    resolutionTime: battle.timeOfArrival,
    attacker: attacker.username,
    attackingKingdom: attackingKingdom.name,
  }
};

const createBuildingsEspionageReport = async (buildings, espionageReport) => {
  for (let i = 0; i < buildings.length; i++) {
    let espionageBuilding = {
      type: buildings[i].type,
      level: buildings[i].level
    }
    let savedBuilding = await EspionageBuildingsRepository.create(
        espionageBuilding);
    savedBuilding.setEspionageBuildings(espionageReport);
  }
};

const createTroopEspionageReport = async (defendersTroops,
    espionageReport) => {
  for (let i = 0; i < defendersTroops.length; i++) {
    let unitLevel = await defendersTroops[i].getUnitLevel()
    let espionageTroop = {
      type: defendersTroops[i].type,
      level: unitLevel.upgradeLevel
    }
    let savedTroop = await EspionageTroopsRepository.create(espionageTroop);
    savedTroop.setEspionageTroops(espionageReport);
  }
};

const getAttributesForEspionageReport = async (defendingKingdom,
    defendersTroops) => {
  let buildings = await defendingKingdom.getBuildings();
  let gold = defendingKingdom.gold;
  let food = defendingKingdom.food;
  let totalTroops = defendersTroops.map(troop => troop.quantity).reduce(
      (partialSum, a) => partialSum + a, 0);
  let totalAttackPower = await getValueFromTroops(defendingKingdom,
      await defendingKingdom.getTroops(), 'attack');
  let totalDefensePower = await getValueFromTroops(defendingKingdom,
          await defendingKingdom.getTroops(), 'defence')
      * await getBuildingDefensePower(
          defendingKingdom);
  let loyalty = defendingKingdom.loyalty;

  return {
    buildings,
    gold,
    food,
    totalTroops,
    totalAttackPower,
    totalDefensePower,
    loyalty
  };
};

const killPercentageOfTroops = async (attackPower, defensePower,
    troops, battle, kingdom, role) => {

  let percentageOfComparison = defensePower / attackPower;
  if (percentageOfComparison < 0.5) {
    await killTroops(0.73, troops, kingdom, battle, role);

  } else if (percentageOfComparison < 0.6) {
    await killTroops(0.56, troops, kingdom, battle, role);

  } else if (percentageOfComparison < 0.75) {
    await killTroops(0.34, troops, kingdom, battle, role);

  } else if (percentageOfComparison < 0.9) {
    await killTroops(0.1, troops, kingdom, battle, role);

  } else {
    await killTroops(0.03, troops, kingdom, battle, role);
  }
};

const killTroops = async (percentageOfDead, troops, kingdom, battle,
    role) => {
  for (let i = 0; i < troops.length; i++) {
    let deadTroop = {
      type: troops[i].type,
      quantity: Math.round(troops[i].quantity * percentageOfDead),
      battleId: battle.id
    };
    if (deadTroop.quantity > 0) {

      if (role === 'attacker') {
        await subtractTroopsFromTroopsInBattle(kingdom, deadTroop);
        await AttackerLostTroopsRepository.create(deadTroop);
        troops[i].quantity = troops[i].quantity
            - deadTroop.quantity;
      }

      if (role === 'defender') {
        await defenderLostTroopsRepository.create(deadTroop);
        troops[i].quantity = troops[i].quantity
            - deadTroop.quantity;
      }

      if (troops[i].quantity === 0) {
        troops[i].destroy();
      }
      await troops[i].save();
    }
  }
};

const randomizeDeaths = async (troops, battle, role, kingdom) => {
  let randomizerOfDeaths = Math.floor(Math.random() * 11);

  switch (randomizerOfDeaths) {
    case 3:
      await killTroops(0.03, troops, kingdom, battle, role);
      break;
    case 7:
      await killTroops(0.07, troops, kingdom, battle, role);
      break;
    case 9:
      await killTroops(0.09, troops, kingdom, battle, role);
      break;
  }
};

const killTroopsType = async (troopsInBattle, attackingKingdom,
    battle, type) => {
  for (let i = 0; i < troopsInBattle.length; i++) {
    if (troopsInBattle[i].type === type) {
      let arrayOfOneTroop = [];
      arrayOfOneTroop[0] = troopsInBattle[i]; // the kill method needs array
      await killTroops(1, arrayOfOneTroop, attackingKingdom,
          battle, 'attacker');
    }
  }
};

const getValueFromTroops = async (kingdom, troops, typeOfValue) => {
  let sumOfTroopProperties = [];
  let count = 0;
  let allTroops = await kingdom.getTroops();
  for (let i = 0; i < troops.length; i++) {
    for (let j = 0; j < allTroops.length; j++) {
      if (troops[i].type === allTroops[j].type) {
        let unitLevel = await allTroops[j].getUnitLevel();

        for (const [key, value] of
            Object.entries(troopRules(unitLevel.upgradeLevel))) {
          if (troops[i].type === value.name) {
            sumOfTroopProperties[count++] = typeOfValue === 'speed'
                ? value[typeOfValue] : value[typeOfValue]
                * troops[i].quantity;
          }
        }
      }
    }
  }
  let filteredValues = sumOfTroopProperties.filter(e => e !== undefined);
  let speed = troops.length === 0 ? 0 : filteredValues.sort()[0];
  let otherPropertiesValue = troops.length === 0 ? 0
      : filteredValues.reduce((partialSum, a) => partialSum + a, 0);
  return typeOfValue === 'speed' ? speed : otherPropertiesValue;
};

const doesArmyIncludeWalkers = (troopsToBattle) => {
  let doesArmyIncludeWalkers = false;
  if (doesArmyIncludesType(troopsToBattle, 'phalanx') ||
      doesArmyIncludesType(troopsToBattle, 'cavalry') ||
      doesArmyIncludesType(troopsToBattle, 'swordsman')) {
    doesArmyIncludeWalkers = true;
  }
  return doesArmyIncludeWalkers;
};

const doesArmyIncludesType = (troopsToBattle, type) => {
  let doesArmyIncludesType = false;
  for (let i = 0; i < troopsToBattle.length; i++) {
    if (troopsToBattle[i].type === type) {
      doesArmyIncludesType = true;
      return doesArmyIncludesType;
    }
  }
  return doesArmyIncludesType;
};

const getBuildingDefensePower = async (kingdom) => {
  let buildingDefensePower = [];
  let count = 0;
  let buildings = await kingdom.getBuildings();

  for (let i = 0; i < buildings.length; i++) {
    let buildingLevel = buildings[i].level
    for (const [key, value] of
        Object.entries(buildingRules(buildingLevel))) {
      if (buildings[i].type === value.name) {
        buildingDefensePower[count++] = value.defense;
      }
    }
  }
  let filtered = buildingDefensePower.filter(e => e !== undefined);
  return buildings.length === 0 ? 1 : filtered.reduce(
      (partialSum, a) => partialSum + a, 0) + 1;
};

const getSpiesPowerByPowerType = async (kingdom, troops, timeOfTravel,
    powerType) => {
  let spiesPower;
  let randomizers = getRandomizersOfBattle(timeOfTravel);
  let allTroops = await kingdom.getTroops();

  for (let i = 0; i < troops.length; i++) {
    for (let j = 0; j < allTroops.length; j++) {
      if (troops[i].type === 'scout' && allTroops[j].type === 'scout') {
        let unitLevel = await allTroops[j].getUnitLevel();
        spiesPower = troopRules(unitLevel.upgradeLevel).scout[powerType]
            * troops[i].quantity;
      }
    }
  }
  let spiesAttack = troops.length === 0 ? 0 : spiesPower
      * randomizers.weakeningAttackerArmy
      * randomizers.fortunateEventAttacker
      * randomizers.unfortunateEventAttacker;

  let spiesDefense = troops.length === 0 ? 0 : spiesPower
      * randomizers.unfortunateEventDefender
      * randomizers.fortunateEventDefender;

  return powerType === 'attack' ? spiesAttack : spiesDefense;
};

const sendTroopsToBattle = async (attackingKingdom, troopsToBattle) => {
  let troops = await attackingKingdom.getTroops();
  for (let i = 0; i < troops.length; i++) {
    for (let j = 0; j < troopsToBattle.length; j++) {
      if (troops[i].type === troopsToBattle[j].type) {
        troops[i].quantityInBattle = troops[i].quantityInBattle
            + troopsToBattle[j].quantity;
        troops[i].quantity = troops[i].quantity - troopsToBattle[j].quantity;
        await troops[i].save();
      }
    }
  }
};

const subtractTroopsFromTroopsInBattle = async (kingdom, deadTroop) => {
  let troops = await kingdom.getTroops();
  for (let i = 0; i < troops.length; i++) {
    if (troops[i].type === deadTroop.type) {
      troops[i].quantityInBattle = troops[i].quantityInBattle
          - deadTroop.quantity;
      await troops[i].save();
    }
  }
};

const eventGenerator = (type) => {
  let random = Math.floor(Math.random() * 11);
  let choosePercent = Math.floor(Math.random() * 26);
  let fortunateEvent = random === 3 || random === 9 ? 1 + choosePercent / 100
      : 1;
  let unfortunateEvent = random === 5 || random === 8 ? 1 - choosePercent
      / 100
      : 1;
  return type === 'fortunate' ? fortunateEvent : unfortunateEvent;
};

const getRandomizersOfBattle = (timeOfTravel) => {
  let weakeningAttackerArmy = timeOfTravel - 4 <= 0 ? 1 : 1 - (timeOfTravel
      - 4
      * 0.03); // if travels more than 4 hours, each hour takes 3% of attack power down
  let fortunateEventAttacker = eventGenerator('fortunate');
  let fortunateEventDefender = eventGenerator('fortunate');
  let unfortunateEventAttacker = eventGenerator('unfortunate');
  let unfortunateEventDefender = eventGenerator('unfortunate');

  return {
    weakeningAttackerArmy,
    fortunateEventDefender,
    fortunateEventAttacker,
    unfortunateEventDefender,
    unfortunateEventAttacker
  };
};

const calculateDistance = (attackingKingdom, defendingKingdom) => {
  let x1 = attackingKingdom.coordinateX;
  let y1 = attackingKingdom.coordinateY;
  let x2 = defendingKingdom.coordinateX;
  let y2 = defendingKingdom.coordinateY;
  return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
};

export default {
  initiateBattle,
  findById,
  returnTroopsToKingdom,
  startBattle,
  getBattleReport,
  findAllUnfinished,
  findAllFinished,
  showAllBattlesAsAttackingAndDefendingKingdom,
  getLatestReport,
  getAllUnfinishedIncomingOutgoing
};
