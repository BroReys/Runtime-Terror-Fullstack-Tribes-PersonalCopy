"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _attackerTroopsToBattleRepository = _interopRequireDefault(require("../repositories/battle-repositories/attacker-troops-to-battle-repository"));

var _battleRepository = _interopRequireDefault(require("../repositories/battle-repositories/battle-repository"));

var _attackerLostTroopsRepository = _interopRequireDefault(require("../repositories/battle-repositories/attacker-lost-troops-repository"));

var _troopsRules = require("../rules/troops-rules");

var _buildingRules = require("../rules/building-rules");

var _espionageReportRepository = _interopRequireDefault(require("../repositories/battle-repositories/espionage-report-repository"));

var _espionageTroopsRepository = _interopRequireDefault(require("../repositories/battle-repositories/espionage-troops-repository"));

var _espionageBuildingsRepository = _interopRequireDefault(require("../repositories/battle-repositories/espionage-buildings-repository"));

var _defenderLostTroopsRepository = _interopRequireDefault(require("../repositories/battle-repositories/defender-lost-troops-repository"));

var _bandits = _interopRequireDefault(require("../utilities/bandits"));

var initiateBattle = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(attacker, defender, attackingKingdom, defendingKingdom, troops) {
    var slowestSpeed, timeOfTravel, possibleBanditsReward, battle, savedBattle;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getValueFromTroops(attackingKingdom, troops, 'speed');

          case 2:
            slowestSpeed = _context.sent;
            console.log(slowestSpeed);
            timeOfTravel = calculateDistance(attackingKingdom, defendingKingdom) / slowestSpeed;
            possibleBanditsReward = null;

            if (!defendingKingdom.name.startsWith('Bandits')) {
              _context.next = 10;
              break;
            }

            _context.next = 9;
            return _bandits["default"].getBanditsReward(defendingKingdom.id);

          case 9:
            possibleBanditsReward = _context.sent;

          case 10:
            battle = {
              timeOfArrival: Math.floor(Date.now() / 1000 + timeOfTravel * 60 * 60),
              timeOfComeback: Math.floor(Date.now() / 1000 + 2 * (timeOfTravel * 60 * 60)),
              possibleBanditsReward: possibleBanditsReward
            };
            _context.next = 13;
            return _battleRepository["default"].create(battle);

          case 13:
            savedBattle = _context.sent;
            savedBattle.setAttacker(attacker);
            savedBattle.setDefender(defender);
            savedBattle.setDefendingKingdom(defendingKingdom);
            savedBattle.setAttackingKingdom(attackingKingdom);
            _context.next = 20;
            return sendTroopsToBattle(attackingKingdom, troops);

          case 20:
            _context.next = 22;
            return _attackerTroopsToBattleRepository["default"].create(troops, savedBattle);

          case 22:
            return _context.abrupt("return", {
              battleId: savedBattle.id,
              resolutionTime: savedBattle.timeOfArrival
            });

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initiateBattle(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var startBattle = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(battle) {
    var attackingKingdom, defendingKingdom, troopsToBattle, defendersTroops, timeOfTravel, defendingKingdomInfo, areThereWalkers, doesArmyIncludeCatapults;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return battle.getAttackingKingdom();

          case 2:
            attackingKingdom = _context2.sent;
            _context2.next = 5;
            return battle.getDefendingKingdom();

          case 5:
            defendingKingdom = _context2.sent;
            _context2.next = 8;
            return battle.getAttackerTroopsToBattle();

          case 8:
            troopsToBattle = _context2.sent;
            _context2.next = 11;
            return defendingKingdom.getTroops();

          case 11:
            defendersTroops = _context2.sent;
            timeOfTravel = (battle.timeOfArrival - battle.startedAt) / 60 / 60;
            _context2.next = 15;
            return getAttributesForEspionageReport(defendingKingdom, defendersTroops);

          case 15:
            defendingKingdomInfo = _context2.sent;
            areThereWalkers = doesArmyIncludeWalkers(troopsToBattle);
            doesArmyIncludeCatapults = doesArmyIncludesType(troopsToBattle, 'catapult'); // --------------------- ONLY ESPIONAGE -------------------------------

            if (!(troopsToBattle.length === 1 && doesArmyIncludesType(troopsToBattle, 'scout'))) {
              _context2.next = 23;
              break;
            }

            _context2.next = 21;
            return espionageAttack(battle, attackingKingdom, defendingKingdom, timeOfTravel, troopsToBattle, defendersTroops);

          case 21:
            _context2.next = 82;
            break;

          case 23:
            if (!(!areThereWalkers && doesArmyIncludesType(troopsToBattle, 'diplomat') && !doesArmyIncludeCatapults)) {
              _context2.next = 43;
              break;
            }

            if (!(defendingKingdomInfo.totalTroops === 0)) {
              _context2.next = 32;
              break;
            }

            _context2.next = 27;
            return takeOverAttack(battle, attackingKingdom, defendingKingdom);

          case 27:
            if (!doesArmyIncludesType(troopsToBattle, 'scout')) {
              _context2.next = 30;
              break;
            }

            _context2.next = 30;
            return espionageAttack(battle, attackingKingdom, defendingKingdom, timeOfTravel, troopsToBattle, defendersTroops);

          case 30:
            _context2.next = 41;
            break;

          case 32:
            _context2.next = 34;
            return killTroopsType(troopsToBattle, attackingKingdom, battle, 'diplomat');

          case 34:
            battle.isFinished = true;
            battle.result = 'loss';
            _context2.next = 38;
            return battle.save();

          case 38:
            if (!doesArmyIncludesType(troopsToBattle, 'scout')) {
              _context2.next = 41;
              break;
            }

            _context2.next = 41;
            return espionageAttack(battle, attackingKingdom, defendingKingdom, timeOfTravel, troopsToBattle, defendersTroops);

          case 41:
            _context2.next = 82;
            break;

          case 43:
            if (!(!areThereWalkers && doesArmyIncludesType(troopsToBattle, 'catapult'))) {
              _context2.next = 70;
              break;
            }

            if (!(defendingKingdomInfo.totalTroops === 0)) {
              _context2.next = 56;
              break;
            }

            if (!(defendingKingdomInfo.buildings.length > 0)) {
              _context2.next = 48;
              break;
            }

            _context2.next = 48;
            return demolitionAttack(battle, attackingKingdom, defendingKingdomInfo.buildings, troopsToBattle);

          case 48:
            if (!doesArmyIncludesType(troopsToBattle, 'diplomat')) {
              _context2.next = 51;
              break;
            }

            _context2.next = 51;
            return takeOverAttack(battle, attackingKingdom, defendingKingdom);

          case 51:
            if (!doesArmyIncludesType(troopsToBattle, 'scout')) {
              _context2.next = 54;
              break;
            }

            _context2.next = 54;
            return espionageAttack(battle, attackingKingdom, defendingKingdom, timeOfTravel, troopsToBattle, defendersTroops);

          case 54:
            _context2.next = 68;
            break;

          case 56:
            _context2.next = 58;
            return killTroopsType(troopsToBattle, attackingKingdom, battle, 'catapult');

          case 58:
            battle.isFinished = true;
            battle.result = 'loss';
            _context2.next = 62;
            return battle.save();

          case 62:
            if (!doesArmyIncludesType(troopsToBattle, 'diplomat')) {
              _context2.next = 65;
              break;
            }

            _context2.next = 65;
            return killTroopsType(troopsToBattle, attackingKingdom, battle, 'diplomat');

          case 65:
            if (!doesArmyIncludesType(troopsToBattle, 'scout')) {
              _context2.next = 68;
              break;
            }

            _context2.next = 68;
            return espionageAttack(battle, attackingKingdom, defendingKingdom, timeOfTravel, troopsToBattle, defendersTroops);

          case 68:
            _context2.next = 82;
            break;

          case 70:
            _context2.next = 72;
            return plunderAttack(battle, attackingKingdom, defendingKingdom, troopsToBattle, timeOfTravel, defendersTroops);

          case 72:
            if (!(battle.result === 'win')) {
              _context2.next = 82;
              break;
            }

            if (!(doesArmyIncludeCatapults && defendingKingdomInfo.buildings.length > 0)) {
              _context2.next = 76;
              break;
            }

            _context2.next = 76;
            return demolitionAttack(battle, attackingKingdom, defendingKingdomInfo.buildings, troopsToBattle);

          case 76:
            if (!doesArmyIncludesType(troopsToBattle, 'diplomat')) {
              _context2.next = 79;
              break;
            }

            _context2.next = 79;
            return takeOverAttack(battle, attackingKingdom, defendingKingdom);

          case 79:
            if (!doesArmyIncludesType(troopsToBattle, 'scout')) {
              _context2.next = 82;
              break;
            }

            _context2.next = 82;
            return espionageAttack(battle, attackingKingdom, defendingKingdom, timeOfTravel, troopsToBattle, defendersTroops);

          case 82:
            return _context2.abrupt("return", battle);

          case 83:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function startBattle(_x6) {
    return _ref2.apply(this, arguments);
  };
}();

var espionageAttack = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(battle, attackingKingdom, defendingKingdom, timeOfTravel, troopsInBattle, defendersTroops) {
    var attackerSpiesPower, defenderSpiesPower, comparePowers, espionageAttributes, espionageReport;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getSpiesPowerByPowerType(attackingKingdom, // get attacker power of only spies and count in the weakening
            troopsInBattle, timeOfTravel, 'attack');

          case 2:
            attackerSpiesPower = _context3.sent;
            _context3.next = 5;
            return getSpiesPowerByPowerType(defendingKingdom, // get defender power of only spies
            defendersTroops, timeOfTravel, 'defence');

          case 5:
            defenderSpiesPower = _context3.sent;
            comparePowers = battle.result === 'win' ? 1 : attackerSpiesPower - defenderSpiesPower;

            if (!(comparePowers < 0)) {
              _context3.next = 16;
              break;
            }

            _context3.next = 10;
            return killPercentageOfTroops(attackerSpiesPower, defenderSpiesPower, troopsInBattle, battle, attackingKingdom, 'attacker');

          case 10:
            battle.isFinished = true;
            battle.result = 'loss';
            _context3.next = 14;
            return battle.save();

          case 14:
            _context3.next = 41;
            break;

          case 16:
            if (!(comparePowers === 0)) {
              _context3.next = 23;
              break;
            }

            // when draw no one dies, no intel, nothing really happens
            battle.isFinished = true;
            battle.result = 'draw';
            _context3.next = 21;
            return battle.save();

          case 21:
            _context3.next = 41;
            break;

          case 23:
            if (!(comparePowers > 0)) {
              _context3.next = 41;
              break;
            }

            _context3.next = 26;
            return getAttributesForEspionageReport(defendingKingdom, defendersTroops);

          case 26:
            espionageAttributes = _context3.sent;
            _context3.next = 29;
            return _espionageReportRepository["default"].create(espionageAttributes.totalTroops, espionageAttributes.totalAttackPower, espionageAttributes.totalDefensePower, espionageAttributes.gold, espionageAttributes.food, espionageAttributes.loyalty, battle);

          case 29:
            espionageReport = _context3.sent;
            _context3.next = 32;
            return createTroopEspionageReport(defendersTroops, espionageReport);

          case 32:
            _context3.next = 34;
            return createBuildingsEspionageReport(espionageAttributes.buildings, espionageReport);

          case 34:
            if (!(battle.result !== 'win')) {
              _context3.next = 37;
              break;
            }

            _context3.next = 37;
            return randomizeDeaths(troopsInBattle, battle, 'attacker', attackingKingdom);

          case 37:
            battle.isFinished = true;
            battle.result = 'win';
            _context3.next = 41;
            return battle.save();

          case 41:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function espionageAttack(_x7, _x8, _x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();

var plunderAttack = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(battle, attackingKingdom, defendingKingdom, troopsInBattle, timeOfTravel, defenderTroops) {
    var originalAttackPower, originalDefensePower, randomizers, randomizedAttack, randomizedDefense, comparePowers, carryLimit, gold, food, ratio;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getValueFromTroops(attackingKingdom, troopsInBattle, 'attack');

          case 2:
            originalAttackPower = _context4.sent;
            _context4.next = 5;
            return getValueFromTroops(defendingKingdom, defenderTroops, 'defence');

          case 5:
            originalDefensePower = _context4.sent;
            randomizers = getRandomizersOfBattle(timeOfTravel);
            randomizedAttack = originalAttackPower * randomizers.fortunateEventAttacker * randomizers.weakeningAttackerArmy * randomizers.unfortunateEventAttacker;
            randomizedDefense = originalDefensePower * randomizers.unfortunateEventDefender * randomizers.fortunateEventDefender;
            comparePowers = randomizedAttack - randomizedDefense;

            if (!(comparePowers < 0)) {
              _context4.next = 21;
              break;
            }

            _context4.next = 13;
            return killPercentageOfTroops(randomizedAttack, randomizedDefense, troopsInBattle, battle, attackingKingdom, 'attacker');

          case 13:
            _context4.next = 15;
            return randomizeDeaths(defenderTroops, battle, 'defender', defendingKingdom);

          case 15:
            battle.isFinished = true;
            battle.result = 'loss';
            _context4.next = 19;
            return battle.save();

          case 19:
            _context4.next = 62;
            break;

          case 21:
            if (!(comparePowers === 0)) {
              _context4.next = 32;
              break;
            }

            _context4.next = 24;
            return randomizeDeaths(troopsInBattle, battle, 'attacker', attackingKingdom);

          case 24:
            _context4.next = 26;
            return randomizeDeaths(defenderTroops, battle, 'defender', defendingKingdom);

          case 26:
            battle.isFinished = true;
            battle.result = 'draw';
            _context4.next = 30;
            return battle.save();

          case 30:
            _context4.next = 62;
            break;

          case 32:
            if (!(comparePowers > 0)) {
              _context4.next = 62;
              break;
            }

            _context4.next = 35;
            return randomizeDeaths(troopsInBattle, battle, 'attacker', attackingKingdom);

          case 35:
            _context4.next = 37;
            return killPercentageOfTroops(randomizedAttack, randomizedDefense, defenderTroops, battle, defendingKingdom, 'defender');

          case 37:
            _context4.next = 39;
            return getValueFromTroops(attackingKingdom, troopsInBattle, 'carry_limit');

          case 39:
            carryLimit = _context4.sent;
            gold = defendingKingdom.gold;
            food = defendingKingdom.food;

            if (!(carryLimit >= gold + food)) {
              _context4.next = 51;
              break;
            }

            battle.stolenGold = gold;
            battle.stolenFood = food;
            defendingKingdom.gold = 0;
            defendingKingdom.food = 0;
            _context4.next = 49;
            return defendingKingdom.save();

          case 49:
            _context4.next = 58;
            break;

          case 51:
            ratio = food / (food + gold);
            battle.stolenFood = Math.round(carryLimit * ratio);
            battle.stolenGold = Math.round(carryLimit * (1 - ratio));
            defendingKingdom.gold = defendingKingdom.gold - battle.stolenGold;
            defendingKingdom.food = defendingKingdom.food - battle.stolenFood;
            _context4.next = 58;
            return defendingKingdom.save();

          case 58:
            battle.result = 'win';
            battle.isFinished = true;
            _context4.next = 62;
            return battle.save();

          case 62:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function plunderAttack(_x13, _x14, _x15, _x16, _x17, _x18) {
    return _ref4.apply(this, arguments);
  };
}();

var demolitionAttack = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(battle, attackingKingdom, buildings, troopsToBattle) {
    var i, j, pickRandomBuilding, destroyedBuilding, catapultsArray;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < troopsToBattle.length)) {
              _context5.next = 24;
              break;
            }

            if (!(troopsToBattle[i].type === 'catapult')) {
              _context5.next = 21;
              break;
            }

            j = 0;

          case 4:
            if (!(j < troopsToBattle[i].quantity)) {
              _context5.next = 17;
              break;
            }

            pickRandomBuilding = Math.floor(Math.random() * buildings.length);

            if (!(buildings[pickRandomBuilding].level > 0)) {
              _context5.next = 14;
              break;
            }

            buildings[pickRandomBuilding].level = buildings[pickRandomBuilding].level - 1;

            if (!(buildings[pickRandomBuilding].level === 0)) {
              _context5.next = 14;
              break;
            }

            destroyedBuilding = {
              type: buildings[pickRandomBuilding].type,
              quantity: 1,
              battleId: battle.id
            };
            _context5.next = 12;
            return _defenderLostTroopsRepository["default"].create(destroyedBuilding);

          case 12:
            _context5.next = 14;
            return buildings[pickRandomBuilding].destroy();

          case 14:
            j++;
            _context5.next = 4;
            break;

          case 17:
            catapultsArray = [];
            catapultsArray[0] = troopsToBattle[i];
            _context5.next = 21;
            return randomizeDeaths(catapultsArray, battle, 'attacker', attackingKingdom);

          case 21:
            i++;
            _context5.next = 1;
            break;

          case 24:
            battle.isFinished = true;
            battle.result = 'win';
            _context5.next = 28;
            return battle.save();

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function demolitionAttack(_x19, _x20, _x21, _x22) {
    return _ref5.apply(this, arguments);
  };
}();

var takeOverAttack = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(battle, attackingKingdom, defendingKingdom) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            defendingKingdom.loyalty = defendingKingdom.loyalty - 25;

            if (!(defendingKingdom.loyalty <= 0)) {
              _context6.next = 7;
              break;
            }

            _context6.t0 = defendingKingdom;
            _context6.next = 5;
            return attackingKingdom.getUser();

          case 5:
            _context6.t1 = _context6.sent;

            _context6.t0.setUser.call(_context6.t0, _context6.t1);

          case 7:
            _context6.next = 9;
            return defendingKingdom.save();

          case 9:
            battle.isFinished = true;
            battle.result = 'win';
            _context6.next = 13;
            return battle.save();

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function takeOverAttack(_x23, _x24, _x25) {
    return _ref6.apply(this, arguments);
  };
}();

var returnTroopsToKingdom = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(battle) {
    var attackingKingdom, troopsToBattle, troops, i, j;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return battle.getAttackingKingdom();

          case 2:
            attackingKingdom = _context7.sent;
            _context7.next = 5;
            return battle.getAttackerTroopsToBattle();

          case 5:
            troopsToBattle = _context7.sent;
            _context7.next = 8;
            return attackingKingdom.getTroops();

          case 8:
            troops = _context7.sent;
            i = 0;

          case 10:
            if (!(i < troops.length)) {
              _context7.next = 26;
              break;
            }

            j = 0;

          case 12:
            if (!(j < troopsToBattle.length)) {
              _context7.next = 23;
              break;
            }

            if (!(troops[i].type === troopsToBattle[j].type)) {
              _context7.next = 20;
              break;
            }

            troops[i].quantityInBattle = troops[i].quantityInBattle // remove from in battle
            - troopsToBattle[j].quantity;
            troops[i].quantity = troops[i].quantity + troopsToBattle[j].quantity; // add to troops

            _context7.next = 18;
            return troops[i].save();

          case 18:
            _context7.next = 20;
            return troopsToBattle[j].destroy();

          case 20:
            j++;
            _context7.next = 12;
            break;

          case 23:
            i++;
            _context7.next = 10;
            break;

          case 26:
            if (!(battle.possibleBanditsReward !== null && battle.result === 'win')) {
              _context7.next = 30;
              break;
            }

            attackingKingdom.gold = attackingKingdom.gold + battle.possibleBanditsReward;
            _context7.next = 30;
            return attackingKingdom.save();

          case 30:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function returnTroopsToKingdom(_x26) {
    return _ref7.apply(this, arguments);
  };
}();

var getBattleReport = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(battle, user) {
    var attacker, defender, attackingKingdom, defendingKingdom, attackerDeadTroops, defenderDeadTroopsAndBuildings, troopsInBattle, report, reportBuilding, reportTroops, troopsInBattleDTO, attackerDeadTroopsDTO, defenderDeadTroopsDTO, currentTime, timeDiff;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return battle.getAttacker();

          case 2:
            attacker = _context8.sent;
            _context8.next = 5;
            return battle.getDefender();

          case 5:
            defender = _context8.sent;
            _context8.next = 8;
            return battle.getAttackingKingdom();

          case 8:
            attackingKingdom = _context8.sent;
            _context8.next = 11;
            return battle.getDefendingKingdom();

          case 11:
            defendingKingdom = _context8.sent;
            _context8.next = 14;
            return battle.getAttackerLostTroops();

          case 14:
            attackerDeadTroops = _context8.sent;
            _context8.next = 17;
            return battle.getDefenderLostTroops();

          case 17:
            defenderDeadTroopsAndBuildings = _context8.sent;
            _context8.next = 20;
            return battle.getAttackerTroopsToBattle();

          case 20:
            troopsInBattle = _context8.sent;
            _context8.next = 23;
            return battle.getEspionageReport();

          case 23:
            report = _context8.sent;

            if (!(report !== null)) {
              _context8.next = 31;
              break;
            }

            _context8.next = 27;
            return report.getEspionageTroops();

          case 27:
            reportTroops = _context8.sent;
            _context8.next = 30;
            return report.getEspionageBuildings();

          case 30:
            reportBuilding = _context8.sent;

          case 31:
            troopsInBattleDTO = getTroopsDTO(troopsInBattle);
            attackerDeadTroopsDTO = getTroopsDTO(attackerDeadTroops);
            defenderDeadTroopsDTO = getTroopsDTO(defenderDeadTroopsAndBuildings);

            if (!(user.id === attacker.id)) {
              _context8.next = 44;
              break;
            }

            currentTime = Date.now() / 1000;
            timeDiff = currentTime - battle.timeOfComeback;

            if (!(battle.isFinished && timeDiff > 0)) {
              _context8.next = 41;
              break;
            }

            return _context8.abrupt("return", getAttackerFinishedDTO(battle, defendingKingdom, defender, troopsInBattleDTO, attackerDeadTroopsDTO, defenderDeadTroopsDTO, report, reportBuilding, reportTroops));

          case 41:
            return _context8.abrupt("return", getUnfinishedBattleDTO(battle, attackingKingdom, defendingKingdom, defender, attacker, troopsInBattleDTO, 'attacker'));

          case 42:
            _context8.next = 50;
            break;

          case 44:
            if (!(user.id === defender.id)) {
              _context8.next = 50;
              break;
            }

            if (!battle.isFinished) {
              _context8.next = 49;
              break;
            }

            return _context8.abrupt("return", getDefenderFinishedDTO(battle, attackingKingdom, attacker, attackerDeadTroopsDTO, defenderDeadTroopsDTO, report));

          case 49:
            return _context8.abrupt("return", getUnfinishedBattleDTO(battle, attackingKingdom, defendingKingdom, defender, attacker, troopsInBattleDTO, 'defender'));

          case 50:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getBattleReport(_x27, _x28) {
    return _ref8.apply(this, arguments);
  };
}();

var showAllBattlesAsAttackingAndDefendingKingdom = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(kingdomId) {
    var attackerBattles, defenderBattles, attackerDTOs, defenderDTOs, i, defender, defendingKingdom, battle, _i, attacker, attackingKingdom, _battle;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _battleRepository["default"].findAllAsAttackingKingdom(kingdomId);

          case 2:
            attackerBattles = _context9.sent;
            _context9.next = 5;
            return _battleRepository["default"].findAllAsDefendingKingdom(kingdomId);

          case 5:
            defenderBattles = _context9.sent;
            attackerDTOs = [];
            defenderDTOs = [];
            i = 0;

          case 9:
            if (!(i < attackerBattles.length)) {
              _context9.next = 21;
              break;
            }

            _context9.next = 12;
            return attackerBattles[i].getDefender();

          case 12:
            defender = _context9.sent;
            _context9.next = 15;
            return attackerBattles[i].getDefendingKingdom();

          case 15:
            defendingKingdom = _context9.sent;
            battle = {
              battleId: attackerBattles[i].id,
              timeOfArrival: attackerBattles[i].timeOfArrival,
              timeOfComeback: attackerBattles[i].timeOfComeback,
              isFinished: attackerBattles[i].isFinished,
              defender: defender.username,
              defendingKingdom: defendingKingdom.name
            };
            attackerDTOs[i] = battle;

          case 18:
            i++;
            _context9.next = 9;
            break;

          case 21:
            _i = 0;

          case 22:
            if (!(_i < defenderBattles.length)) {
              _context9.next = 34;
              break;
            }

            _context9.next = 25;
            return defenderBattles[_i].getAttacker();

          case 25:
            attacker = _context9.sent;
            _context9.next = 28;
            return defenderBattles[_i].getAttacker();

          case 28:
            attackingKingdom = _context9.sent;
            _battle = {
              battleId: defenderBattles[_i].id,
              timeOfArrival: defenderBattles[_i].timeOfArrival,
              isFinished: defenderBattles[_i].isFinished,
              defender: attacker.username,
              defendingKingdom: attackingKingdom.name
            };
            defenderDTOs[_i] = _battle;

          case 31:
            _i++;
            _context9.next = 22;
            break;

          case 34:
            return _context9.abrupt("return", {
              attacker: attackerDTOs,
              defender: defenderDTOs
            });

          case 35:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function showAllBattlesAsAttackingAndDefendingKingdom(_x29) {
    return _ref9.apply(this, arguments);
  };
}();

var getLatestReport = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(attackingKingdomId, defendingKingdomId) {
    var battle, report, buildingsReport, troopsReport;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _battleRepository["default"].findFinishedByAttackingAndDefendingKingdom(attackingKingdomId, defendingKingdomId);

          case 2:
            battle = _context10.sent;

            if (!battle) {
              _context10.next = 15;
              break;
            }

            _context10.next = 6;
            return battle.getEspionageReport();

          case 6:
            report = _context10.sent;

            if (!report) {
              _context10.next = 15;
              break;
            }

            _context10.next = 10;
            return report.getEspionageBuildings();

          case 10:
            buildingsReport = _context10.sent;
            _context10.next = 13;
            return report.getEspionageTroops();

          case 13:
            troopsReport = _context10.sent;
            return _context10.abrupt("return", {
              battleDate: battle.startedAt,
              report: getReportDTO(report, buildingsReport, troopsReport)
            });

          case 15:
            return _context10.abrupt("return", null);

          case 16:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function getLatestReport(_x30, _x31) {
    return _ref10.apply(this, arguments);
  };
}();

var findById = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(id) {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _battleRepository["default"].findById(id);

          case 2:
            return _context11.abrupt("return", _context11.sent);

          case 3:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function findById(_x32) {
    return _ref11.apply(this, arguments);
  };
}();

var findAllUnfinished = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _battleRepository["default"].findAllUnfinished();

          case 2:
            return _context12.abrupt("return", _context12.sent);

          case 3:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function findAllUnfinished() {
    return _ref12.apply(this, arguments);
  };
}();

var findAllFinished = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _battleRepository["default"].findAllFinished();

          case 2:
            return _context13.abrupt("return", _context13.sent);

          case 3:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function findAllFinished() {
    return _ref13.apply(this, arguments);
  };
}(); // ----------------- HELPER FUNCTIONS ---------------------


var getDefenderFinishedDTO = function getDefenderFinishedDTO(battle, attackingKingdom, attacker, attackerDeadTroops, defenderDeadTroops, report) {
  return {
    battleId: battle.id,
    resolutionTime: battle.timeOfArrival,
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

var getAttackerFinishedDTO = function getAttackerFinishedDTO(battle, defendingKingdom, defender, troopsToBattle, attackerDeadTroops, defenderDeadTroops, report, reportBuilding, reportTroops) {
  var battleDTOWithoutReport = {
    battleId: battle.id,
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
      lostTroops: defenderDeadTroops
    }
  };
  var battleDTOWithReport;

  if (report !== null) {
    battleDTOWithReport = {
      battleId: battle.id,
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
      report: getReportDTO(report, reportBuilding, reportTroops)
    };
  }

  return report === null ? battleDTOWithoutReport : battleDTOWithReport;
};

var getReportDTO = function getReportDTO(report, buildingsReport, troopsReport) {
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

var getReportDTOTroopBuildings = function getReportDTOTroopBuildings(report) {
  var troopReportDTOs = [];

  for (var i = 0; i < report.length; i++) {
    var troop = {
      type: report[i].type,
      level: report[i].level
    };
    troopReportDTOs[i] = troop;
  }

  return troopReportDTOs;
};

var getTroopsDTO = function getTroopsDTO(troops) {
  var troopsDTOs = [];

  for (var i = 0; i < troops.length; i++) {
    var troopDTO = {
      type: troops[i].type,
      quantity: troops[i].quantity
    };
    troopsDTOs[i] = troopDTO;
  }

  return troopsDTOs;
};

var getUnfinishedBattleDTO = function getUnfinishedBattleDTO(battle, attackingKingdom, defendingKingdom, defender, attacker, troopsToBattle, role) {
  return role === 'attacker' ? {
    battleId: battle.id,
    resolutionTime: battle.timeOfArrival,
    timeOfComeback: battle.timeOfComeback,
    targetKingdom: defendingKingdom.name,
    targetRuler: defender.username,
    troops: troopsToBattle
  } : {
    battleId: battle.id,
    resolutionTime: battle.timeOfArrival,
    attacker: attacker.username,
    attackingKingdom: attackingKingdom.name
  };
};

var createBuildingsEspionageReport = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(buildings, espionageReport) {
    var i, espionageBuilding, savedBuilding;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < buildings.length)) {
              _context14.next = 10;
              break;
            }

            espionageBuilding = {
              type: buildings[i].type,
              level: buildings[i].level
            };
            _context14.next = 5;
            return _espionageBuildingsRepository["default"].create(espionageBuilding);

          case 5:
            savedBuilding = _context14.sent;
            savedBuilding.setEspionageBuildings(espionageReport);

          case 7:
            i++;
            _context14.next = 1;
            break;

          case 10:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function createBuildingsEspionageReport(_x33, _x34) {
    return _ref14.apply(this, arguments);
  };
}();

var createTroopEspionageReport = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(defendersTroops, espionageReport) {
    var i, unitLevel, espionageTroop, savedTroop;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < defendersTroops.length)) {
              _context15.next = 13;
              break;
            }

            _context15.next = 4;
            return defendersTroops[i].getUnitLevel();

          case 4:
            unitLevel = _context15.sent;
            espionageTroop = {
              type: defendersTroops[i].type,
              level: unitLevel.upgradeLevel
            };
            _context15.next = 8;
            return _espionageTroopsRepository["default"].create(espionageTroop);

          case 8:
            savedTroop = _context15.sent;
            savedTroop.setEspionageTroops(espionageReport);

          case 10:
            i++;
            _context15.next = 1;
            break;

          case 13:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function createTroopEspionageReport(_x35, _x36) {
    return _ref15.apply(this, arguments);
  };
}();

var getAttributesForEspionageReport = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(defendingKingdom, defendersTroops) {
    var buildings, gold, food, totalTroops, totalAttackPower, totalDefensePower, loyalty;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return defendingKingdom.getBuildings();

          case 2:
            buildings = _context16.sent;
            gold = defendingKingdom.gold;
            food = defendingKingdom.food;
            totalTroops = defendersTroops.map(function (troop) {
              return troop.quantity;
            }).reduce(function (partialSum, a) {
              return partialSum + a;
            }, 0);
            _context16.t0 = getValueFromTroops;
            _context16.t1 = defendingKingdom;
            _context16.next = 10;
            return defendingKingdom.getTroops();

          case 10:
            _context16.t2 = _context16.sent;
            _context16.next = 13;
            return (0, _context16.t0)(_context16.t1, _context16.t2, 'attack');

          case 13:
            totalAttackPower = _context16.sent;
            _context16.t3 = getValueFromTroops;
            _context16.t4 = defendingKingdom;
            _context16.next = 18;
            return defendingKingdom.getTroops();

          case 18:
            _context16.t5 = _context16.sent;
            _context16.next = 21;
            return (0, _context16.t3)(_context16.t4, _context16.t5, 'defence');

          case 21:
            _context16.t6 = _context16.sent;
            _context16.next = 24;
            return getBuildingDefensePower(defendingKingdom);

          case 24:
            _context16.t7 = _context16.sent;
            totalDefensePower = _context16.t6 * _context16.t7;
            loyalty = defendingKingdom.loyalty;
            return _context16.abrupt("return", {
              buildings: buildings,
              gold: gold,
              food: food,
              totalTroops: totalTroops,
              totalAttackPower: totalAttackPower,
              totalDefensePower: totalDefensePower,
              loyalty: loyalty
            });

          case 28:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));

  return function getAttributesForEspionageReport(_x37, _x38) {
    return _ref16.apply(this, arguments);
  };
}();

var killPercentageOfTroops = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(attackPower, defensePower, troops, battle, kingdom, role) {
    var percentageOfComparison;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            percentageOfComparison = defensePower / attackPower;

            if (!(percentageOfComparison < 0.5)) {
              _context17.next = 6;
              break;
            }

            _context17.next = 4;
            return killTroops(0.73, troops, kingdom, battle, role);

          case 4:
            _context17.next = 23;
            break;

          case 6:
            if (!(percentageOfComparison < 0.6)) {
              _context17.next = 11;
              break;
            }

            _context17.next = 9;
            return killTroops(0.56, troops, kingdom, battle, role);

          case 9:
            _context17.next = 23;
            break;

          case 11:
            if (!(percentageOfComparison < 0.75)) {
              _context17.next = 16;
              break;
            }

            _context17.next = 14;
            return killTroops(0.34, troops, kingdom, battle, role);

          case 14:
            _context17.next = 23;
            break;

          case 16:
            if (!(percentageOfComparison < 0.9)) {
              _context17.next = 21;
              break;
            }

            _context17.next = 19;
            return killTroops(0.1, troops, kingdom, battle, role);

          case 19:
            _context17.next = 23;
            break;

          case 21:
            _context17.next = 23;
            return killTroops(0.03, troops, kingdom, battle, role);

          case 23:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));

  return function killPercentageOfTroops(_x39, _x40, _x41, _x42, _x43, _x44) {
    return _ref17.apply(this, arguments);
  };
}();

var killTroops = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(percentageOfDead, troops, kingdom, battle, role) {
    var i, deadTroop;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < troops.length)) {
              _context18.next = 20;
              break;
            }

            deadTroop = {
              type: troops[i].type,
              quantity: Math.round(troops[i].quantity * percentageOfDead),
              battleId: battle.id
            };

            if (!(deadTroop.quantity > 0)) {
              _context18.next = 17;
              break;
            }

            if (!(role === 'attacker')) {
              _context18.next = 10;
              break;
            }

            _context18.next = 7;
            return subtractTroopsFromTroopsInBattle(kingdom, deadTroop);

          case 7:
            _context18.next = 9;
            return _attackerLostTroopsRepository["default"].create(deadTroop);

          case 9:
            troops[i].quantity = troops[i].quantity - deadTroop.quantity;

          case 10:
            if (!(role === 'defender')) {
              _context18.next = 14;
              break;
            }

            _context18.next = 13;
            return _defenderLostTroopsRepository["default"].create(deadTroop);

          case 13:
            troops[i].quantity = troops[i].quantity - deadTroop.quantity;

          case 14:
            if (troops[i].quantity === 0) {
              troops[i].destroy();
            }

            _context18.next = 17;
            return troops[i].save();

          case 17:
            i++;
            _context18.next = 1;
            break;

          case 20:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));

  return function killTroops(_x45, _x46, _x47, _x48, _x49) {
    return _ref18.apply(this, arguments);
  };
}();

var randomizeDeaths = /*#__PURE__*/function () {
  var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(troops, battle, role, kingdom) {
    var randomizerOfDeaths;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            randomizerOfDeaths = Math.floor(Math.random() * 11);
            _context19.t0 = randomizerOfDeaths;
            _context19.next = _context19.t0 === 3 ? 4 : _context19.t0 === 7 ? 7 : _context19.t0 === 9 ? 10 : 13;
            break;

          case 4:
            _context19.next = 6;
            return killTroops(0.03, troops, kingdom, battle, role);

          case 6:
            return _context19.abrupt("break", 13);

          case 7:
            _context19.next = 9;
            return killTroops(0.07, troops, kingdom, battle, role);

          case 9:
            return _context19.abrupt("break", 13);

          case 10:
            _context19.next = 12;
            return killTroops(0.09, troops, kingdom, battle, role);

          case 12:
            return _context19.abrupt("break", 13);

          case 13:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }));

  return function randomizeDeaths(_x50, _x51, _x52, _x53) {
    return _ref19.apply(this, arguments);
  };
}();

var killTroopsType = /*#__PURE__*/function () {
  var _ref20 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(troopsInBattle, attackingKingdom, battle, type) {
    var i, arrayOfOneTroop;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < troopsInBattle.length)) {
              _context20.next = 10;
              break;
            }

            if (!(troopsInBattle[i].type === type)) {
              _context20.next = 7;
              break;
            }

            arrayOfOneTroop = [];
            arrayOfOneTroop[0] = troopsInBattle[i]; // the kill method needs array

            _context20.next = 7;
            return killTroops(1, arrayOfOneTroop, attackingKingdom, battle, 'attacker');

          case 7:
            i++;
            _context20.next = 1;
            break;

          case 10:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  }));

  return function killTroopsType(_x54, _x55, _x56, _x57) {
    return _ref20.apply(this, arguments);
  };
}();

var getValueFromTroops = /*#__PURE__*/function () {
  var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(kingdom, troops, typeOfValue) {
    var sumOfTroopProperties, count, allTroops, i, j, unitLevel, _i2, _Object$entries, _Object$entries$_i, key, value, filteredValues, speed, otherPropertiesValue;

    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            sumOfTroopProperties = [];
            count = 0;
            _context21.next = 4;
            return kingdom.getTroops();

          case 4:
            allTroops = _context21.sent;
            i = 0;

          case 6:
            if (!(i < troops.length)) {
              _context21.next = 20;
              break;
            }

            j = 0;

          case 8:
            if (!(j < allTroops.length)) {
              _context21.next = 17;
              break;
            }

            if (!(troops[i].type === allTroops[j].type)) {
              _context21.next = 14;
              break;
            }

            _context21.next = 12;
            return allTroops[j].getUnitLevel();

          case 12:
            unitLevel = _context21.sent;

            for (_i2 = 0, _Object$entries = Object.entries((0, _troopsRules.troopRules)(unitLevel.upgradeLevel)); _i2 < _Object$entries.length; _i2++) {
              _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i2], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];

              if (troops[i].type === value.name) {
                sumOfTroopProperties[count++] = typeOfValue === 'speed' ? value[typeOfValue] : value[typeOfValue] * troops[i].quantity;
              }
            }

          case 14:
            j++;
            _context21.next = 8;
            break;

          case 17:
            i++;
            _context21.next = 6;
            break;

          case 20:
            filteredValues = sumOfTroopProperties.filter(function (e) {
              return e !== undefined;
            });
            speed = troops.length === 0 ? 0 : filteredValues.sort()[0];
            otherPropertiesValue = troops.length === 0 ? 0 : filteredValues.reduce(function (partialSum, a) {
              return partialSum + a;
            }, 0);
            return _context21.abrupt("return", typeOfValue === 'speed' ? speed : otherPropertiesValue);

          case 24:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  }));

  return function getValueFromTroops(_x58, _x59, _x60) {
    return _ref21.apply(this, arguments);
  };
}();

var doesArmyIncludeWalkers = function doesArmyIncludeWalkers(troopsToBattle) {
  var doesArmyIncludeWalkers = false;

  if (doesArmyIncludesType(troopsToBattle, 'phalanx') || doesArmyIncludesType(troopsToBattle, 'cavalry') || doesArmyIncludesType(troopsToBattle, 'swordsman')) {
    doesArmyIncludeWalkers = true;
  }

  return doesArmyIncludeWalkers;
};

var doesArmyIncludesType = function doesArmyIncludesType(troopsToBattle, type) {
  var doesArmyIncludesType = false;

  for (var i = 0; i < troopsToBattle.length; i++) {
    if (troopsToBattle[i].type === type) {
      doesArmyIncludesType = true;
      return doesArmyIncludesType;
    }
  }

  return doesArmyIncludesType;
};

var getBuildingDefensePower = /*#__PURE__*/function () {
  var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(kingdom) {
    var buildingDefensePower, count, buildings, i, buildingLevel, _i3, _Object$entries2, _Object$entries2$_i, key, value, filtered;

    return _regenerator["default"].wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            buildingDefensePower = [];
            count = 0;
            _context22.next = 4;
            return kingdom.getBuildings();

          case 4:
            buildings = _context22.sent;

            for (i = 0; i < buildings.length; i++) {
              buildingLevel = buildings[i].level;

              for (_i3 = 0, _Object$entries2 = Object.entries((0, _buildingRules.buildingRules)(buildingLevel)); _i3 < _Object$entries2.length; _i3++) {
                _Object$entries2$_i = (0, _slicedToArray2["default"])(_Object$entries2[_i3], 2), key = _Object$entries2$_i[0], value = _Object$entries2$_i[1];

                if (buildings[i].type === value.name) {
                  buildingDefensePower[count++] = value.defense;
                }
              }
            }

            filtered = buildingDefensePower.filter(function (e) {
              return e !== undefined;
            });
            return _context22.abrupt("return", buildings.length === 0 ? 1 : filtered.reduce(function (partialSum, a) {
              return partialSum + a;
            }, 0) + 1);

          case 8:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  }));

  return function getBuildingDefensePower(_x61) {
    return _ref22.apply(this, arguments);
  };
}();

var getSpiesPowerByPowerType = /*#__PURE__*/function () {
  var _ref23 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(kingdom, troops, timeOfTravel, powerType) {
    var spiesPower, randomizers, allTroops, i, j, unitLevel, spiesAttack, spiesDefense;
    return _regenerator["default"].wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            randomizers = getRandomizersOfBattle(timeOfTravel);
            _context23.next = 3;
            return kingdom.getTroops();

          case 3:
            allTroops = _context23.sent;
            i = 0;

          case 5:
            if (!(i < troops.length)) {
              _context23.next = 19;
              break;
            }

            j = 0;

          case 7:
            if (!(j < allTroops.length)) {
              _context23.next = 16;
              break;
            }

            if (!(troops[i].type === 'scout' && allTroops[j].type === 'scout')) {
              _context23.next = 13;
              break;
            }

            _context23.next = 11;
            return allTroops[j].getUnitLevel();

          case 11:
            unitLevel = _context23.sent;
            spiesPower = (0, _troopsRules.troopRules)(unitLevel.upgradeLevel).scout[powerType] * troops[i].quantity;

          case 13:
            j++;
            _context23.next = 7;
            break;

          case 16:
            i++;
            _context23.next = 5;
            break;

          case 19:
            spiesAttack = troops.length === 0 ? 0 : spiesPower * randomizers.weakeningAttackerArmy * randomizers.fortunateEventAttacker * randomizers.unfortunateEventAttacker;
            spiesDefense = troops.length === 0 ? 0 : spiesPower * randomizers.unfortunateEventDefender * randomizers.fortunateEventDefender;
            return _context23.abrupt("return", powerType === 'attack' ? spiesAttack : spiesDefense);

          case 22:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23);
  }));

  return function getSpiesPowerByPowerType(_x62, _x63, _x64, _x65) {
    return _ref23.apply(this, arguments);
  };
}();

var sendTroopsToBattle = /*#__PURE__*/function () {
  var _ref24 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(attackingKingdom, troopsToBattle) {
    var troops, i, j;
    return _regenerator["default"].wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            _context24.next = 2;
            return attackingKingdom.getTroops();

          case 2:
            troops = _context24.sent;
            i = 0;

          case 4:
            if (!(i < troops.length)) {
              _context24.next = 18;
              break;
            }

            j = 0;

          case 6:
            if (!(j < troopsToBattle.length)) {
              _context24.next = 15;
              break;
            }

            if (!(troops[i].type === troopsToBattle[j].type)) {
              _context24.next = 12;
              break;
            }

            troops[i].quantityInBattle = troops[i].quantityInBattle + troopsToBattle[j].quantity;
            troops[i].quantity = troops[i].quantity - troopsToBattle[j].quantity;
            _context24.next = 12;
            return troops[i].save();

          case 12:
            j++;
            _context24.next = 6;
            break;

          case 15:
            i++;
            _context24.next = 4;
            break;

          case 18:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24);
  }));

  return function sendTroopsToBattle(_x66, _x67) {
    return _ref24.apply(this, arguments);
  };
}();

var subtractTroopsFromTroopsInBattle = /*#__PURE__*/function () {
  var _ref25 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(kingdom, deadTroop) {
    var troops, i;
    return _regenerator["default"].wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            _context25.next = 2;
            return kingdom.getTroops();

          case 2:
            troops = _context25.sent;
            i = 0;

          case 4:
            if (!(i < troops.length)) {
              _context25.next = 12;
              break;
            }

            if (!(troops[i].type === deadTroop.type)) {
              _context25.next = 9;
              break;
            }

            troops[i].quantityInBattle = troops[i].quantityInBattle - deadTroop.quantity;
            _context25.next = 9;
            return troops[i].save();

          case 9:
            i++;
            _context25.next = 4;
            break;

          case 12:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25);
  }));

  return function subtractTroopsFromTroopsInBattle(_x68, _x69) {
    return _ref25.apply(this, arguments);
  };
}();

var eventGenerator = function eventGenerator(type) {
  var random = Math.floor(Math.random() * 11);
  var choosePercent = Math.floor(Math.random() * 26);
  var fortunateEvent = random === 3 || random === 9 ? 1 + choosePercent / 100 : 1;
  var unfortunateEvent = random === 5 || random === 8 ? 1 - choosePercent / 100 : 1;
  return type === 'fortunate' ? fortunateEvent : unfortunateEvent;
};

var getRandomizersOfBattle = function getRandomizersOfBattle(timeOfTravel) {
  var weakeningAttackerArmy = timeOfTravel - 4 <= 0 ? 1 : 1 - (timeOfTravel - 4 * 0.03); // if travels more than 4 hours, each hour takes 3% of attack power down

  var fortunateEventAttacker = eventGenerator('fortunate');
  var fortunateEventDefender = eventGenerator('fortunate');
  var unfortunateEventAttacker = eventGenerator('unfortunate');
  var unfortunateEventDefender = eventGenerator('unfortunate');
  return {
    weakeningAttackerArmy: weakeningAttackerArmy,
    fortunateEventDefender: fortunateEventDefender,
    fortunateEventAttacker: fortunateEventAttacker,
    unfortunateEventDefender: unfortunateEventDefender,
    unfortunateEventAttacker: unfortunateEventAttacker
  };
};

var calculateDistance = function calculateDistance(attackingKingdom, defendingKingdom) {
  var x1 = attackingKingdom.coordinateX;
  var y1 = attackingKingdom.coordinateY;
  var x2 = defendingKingdom.coordinateX;
  var y2 = defendingKingdom.coordinateY;
  return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
};

var _default = {
  initiateBattle: initiateBattle,
  findById: findById,
  returnTroopsToKingdom: returnTroopsToKingdom,
  startBattle: startBattle,
  getBattleReport: getBattleReport,
  findAllUnfinished: findAllUnfinished,
  findAllFinished: findAllFinished,
  showAllBattlesAsAttackingAndDefendingKingdom: showAllBattlesAsAttackingAndDefendingKingdom,
  getLatestReport: getLatestReport
};
exports["default"] = _default;
//# sourceMappingURL=battle-service.js.map