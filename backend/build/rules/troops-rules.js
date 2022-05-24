"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.troopRules = void 0;

var troopRules = function troopRules(upgradeLevel) {
  return {
    type: ['phalanx', 'swordsman', 'scout', 'cavalry', 'catapult', 'diplomat', 'settlers'],
    tick_length: 60,
    phalanx: {
      name: 'phalanx',
      foodConsumption: 1,
      attack: 5 * upgradeLevel,
      defence: 10 * upgradeLevel,
      speed: 3 * upgradeLevel,
      carry_limit: 1,
      // TODO -> could be a building which increases the carry_limit, or keep it simply with upgradeLevel
      training_time: 1,
      // in minutes
      gold_cost: 3,
      upgrade_cost: 50 * upgradeLevel
    },
    swordsman: {
      name: 'swordsman',
      foodConsumption: 1,
      attack: 10 * upgradeLevel,
      defence: 5 * upgradeLevel,
      speed: 3 * upgradeLevel,
      carry_limit: 1,
      training_time: 1,
      gold_cost: 3,
      upgrade_cost: 50 * upgradeLevel
    },
    scout: {
      name: 'scout',
      foodConsumption: 1,
      attack: 5 * upgradeLevel,
      defence: 3 * upgradeLevel,
      speed: 7 * upgradeLevel,
      carry_limit: 3,
      training_time: 2,
      gold_cost: 5,
      upgrade_cost: 80 * upgradeLevel
    },
    cavalry: {
      name: 'cavalry',
      foodConsumption: 1,
      attack: 15 * upgradeLevel,
      defence: 10 * upgradeLevel,
      speed: 10 * upgradeLevel,
      carry_limit: 4,
      training_time: 5,
      gold_cost: 7,
      upgrade_cost: 100 * upgradeLevel
    },
    catapult: {
      name: 'catapult',
      foodConsumption: 1,
      attack: 50 * upgradeLevel,
      defence: 40 * upgradeLevel,
      speed: 1 * upgradeLevel,
      carry_limit: 10,
      training_time: 10,
      gold_cost: 20,
      upgrade_cost: 120 * upgradeLevel
    },
    diplomat: {
      name: 'diplomat',
      foodConsumption: 1,
      attack: 1 * upgradeLevel,
      defence: 1 * upgradeLevel,
      speed: 5 * upgradeLevel,
      carry_limit: 1,
      training_time: 20,
      gold_cost: 30,
      upgrade_cost: 150 * upgradeLevel
    },
    settlers: {
      name: 'settlers',
      foodConsumption: 1,
      attack: 0,
      defence: 0,
      speed: 1,
      carry_limit: 0,
      training_time: 18,
      gold_cost: 25,
      upgradeLevel: 100 * upgradeLevel
    }
  };
};

exports.troopRules = troopRules;
//# sourceMappingURL=troops-rules.js.map