"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildingRules = void 0;

var buildingRules = function buildingRules(level) {
  return {
    type: ['townhall', 'mine', 'farm', 'wall', 'barracks', 'academy', 'marketplace', 'hideout', 'mercenaries_inn'],
    startedBuildings: ['townhall', 'mine', 'farm'],
    townhall: {
      position: 1,
      name: "townhall",
      constructionTime: 100 + Math.pow(10 * level, 2),
      maximumLevel: 20,
      foodConsumption: 1 * level,
      goldConsumption: 1 * level,
      defense: 0.01 * level,
      goldCost: 150 * level,
      foodCost: 100 * level
    },
    mine: {
      position: 2,
      name: "mine",
      generation: 5 + 5 * level,
      constructionTime: 100 + Math.pow(5 * level, 2),
      foodConsumption: 1,
      goldCost: 20 * level,
      foodCost: 50 * level
    },
    farm: {
      position: 3,
      name: "farm",
      generation: 5 + 5 * level,
      constructionTime: 100 + Math.pow(5 * level, 2),
      foodConsumption: 1,
      goldCost: 50 * level,
      foodCost: 20 * level
    },
    wall: {
      position: 4,
      name: "wall",
      constructionTime: 100 + Math.pow(5 * level, 2),
      foodConsumption: 1,
      goldConsumption: 1,
      defense: 0.03 * level,
      goldCost: 80 * level,
      foodCost: 20 * level
    },
    barracks: {
      position: 5,
      name: "barracks",
      constructionTime: 100 + Math.pow(6 * level, 2),
      foodConsumption: 1,
      goldConsumption: 1,
      goldCost: 100 * level,
      foodCost: 80 * level
    },
    academy: {
      position: 6,
      name: "academy",
      constructionTime: 100 + Math.pow(6 * level, 2),
      foodConsumption: 1,
      goldConsumption: 1,
      goldCost: 120 * level,
      foodCost: 100 * level
    },
    marketplace: {
      position: 7,
      name: "marketplace",
      constructionTime: 100 + Math.pow(6 * level, 2),
      foodConsumption: 1,
      goldConsumption: 1,
      goldCost: 100 * level,
      foodCost: 100 * level
    },
    hideout: {
      position: 8,
      name: "hideout",
      constructionTime: 100 + Math.pow(5 * level, 2),
      foodConsumption: 1,
      goldConsumption: 1,
      goldCost: 30 * level,
      foodCost: 20 * level,
      maxGold: 1000 * level,
      maxFood: 1000 * level
    },
    mercenaries_inn: {
      position: 9,
      name: "mercenaries_inn",
      constructionTime: 100 + Math.pow(8 * level, 2),
      foodConsumption: 1,
      goldConsumption: 1,
      goldCost: 120 * level,
      foodCost: 100 * level
    }
  };
};

exports.buildingRules = buildingRules;
//# sourceMappingURL=building-rules.js.map