"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _rules = require("../rules/rules");

var _kingdomService = _interopRequireDefault(require("./kingdom-service"));

var _buildingService = _interopRequireDefault(require("./building-service"));

var _troopsService = _interopRequireDefault(require("./troops-services/troops-service"));

var _troopsUpdateService = _interopRequireDefault(require("./troops-services/troops-update-service"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var updateResourcesByKingdomId = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(kingdomId) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = updateResources;
            _context.next = 3;
            return _kingdomService["default"].getKingdomById(kingdomId);

          case 3:
            _context.t1 = _context.sent;
            _context.next = 6;
            return (0, _context.t0)(_context.t1);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateResourcesByKingdomId(_x) {
    return _ref.apply(this, arguments);
  };
}();

var updateResources = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(kingdom, currentTick) {
    var kingdomId, elapsedTicks, breakpoints, breakpointsUnique, _iterator, _step, _currentTick, newLoyalty, i, random, buildingStats, level, foodForTroops, troopsFoodConsumption, troopsInKingdom, troopsInBattle, foodForBuildings, buildingsToDestroyFood, goldForBuildings, buildingsToDestroyGold, foodPerTick, goldPerTick, maxGold, newGold, maxFood, newFood;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("======== UPDATING RESOURCES - " + kingdom.name);

            if (!currentTick) {
              currentTick = Math.floor(Date.now() / 1000);
            }

            kingdomId = kingdom.get('id');
            elapsedTicks = (currentTick - kingdom.lastTick) / (0, _rules.rules)().tick_length;
            elapsedTicks = Math.floor(elapsedTicks);
            _context2.t0 = [];
            _context2.t1 = _toConsumableArray2["default"];
            _context2.next = 9;
            return _buildingService["default"].getUpdateBreakpoints(kingdomId, currentTick);

          case 9:
            _context2.t2 = _context2.sent;
            _context2.t3 = (0, _context2.t1)(_context2.t2);
            _context2.t4 = _toConsumableArray2["default"];
            _context2.next = 14;
            return _troopsUpdateService["default"].getUpdateBreakpoints(kingdomId, currentTick);

          case 14:
            _context2.t5 = _context2.sent;
            _context2.t6 = (0, _context2.t4)(_context2.t5);
            _context2.t7 = [currentTick];
            breakpoints = _context2.t0.concat.call(_context2.t0, _context2.t3, _context2.t6, _context2.t7);
            breakpointsUnique = (0, _toConsumableArray2["default"])(new Set(breakpoints));
            breakpointsUnique.sort();
            console.log(breakpointsUnique);
            _iterator = _createForOfIteratorHelper(breakpointsUnique);
            _context2.prev = 22;

            _iterator.s();

          case 24:
            if ((_step = _iterator.n()).done) {
              _context2.next = 110;
              break;
            }

            _currentTick = _step.value;
            _context2.next = 28;
            return _buildingService["default"].updateBuildings(kingdomId, _currentTick);

          case 28:
            _context2.next = 30;
            return _troopsUpdateService["default"].updateTroops(kingdomId, _currentTick);

          case 30:
            //update loyalty 1/114 per tick (=10 per 24h) - we use randomness to produce whole integers
            if (kingdom.loyalty < 100) {
              newLoyalty = 0;

              for (i = 0; i < elapsedTicks; i++) {
                random = Math.floor(Math.random() * 114);

                if (random === 1) {
                  newLoyalty++;
                }
              }

              kingdom.loyalty = Math.min(kingdom.loyalty + newLoyalty, 100);
            }

            _context2.next = 33;
            return _buildingService["default"].countBuildingsResources(kingdomId);

          case 33:
            buildingStats = _context2.sent;
            _context2.next = 36;
            return _buildingService["default"].getKingdomLevelByTownhall(kingdomId);

          case 36:
            level = _context2.sent;
            console.log(buildingStats);
            console.log(level); // count food consumption of troops and kill some if we don't have enough food

            foodForTroops = kingdom.food + (buildingStats.foodProduction - buildingStats.foodConsumption) * elapsedTicks;
            _context2.next = 42;
            return _troopsService["default"].countFoodConsumption(kingdomId);

          case 42:
            troopsFoodConsumption = _context2.sent;
            _context2.next = 45;
            return _troopsService["default"].countTroopsInKingdom(kingdomId);

          case 45:
            troopsInKingdom = _context2.sent;
            console.log("=== Troops food consumption:" + troopsFoodConsumption);

          case 47:
            if (!(foodForTroops < troopsFoodConsumption * elapsedTicks && troopsInKingdom > 0)) {
              _context2.next = 56;
              break;
            }

            _context2.next = 50;
            return _troopsService["default"].killRandomTroop(kingdomId);

          case 50:
            troopsInKingdom--;
            _context2.next = 53;
            return _troopsService["default"].countFoodConsumption(kingdomId);

          case 53:
            troopsFoodConsumption = _context2.sent;
            _context2.next = 47;
            break;

          case 56:
            _context2.next = 58;
            return _troopsService["default"].countFoodConsumption(kingdomId);

          case 58:
            troopsFoodConsumption = _context2.sent;
            _context2.next = 61;
            return _troopsService["default"].countTroopsInBattle(kingdomId);

          case 61:
            troopsInBattle = _context2.sent;

          case 62:
            if (!(foodForTroops < troopsFoodConsumption * elapsedTicks && troopsInBattle > 0)) {
              _context2.next = 71;
              break;
            }

            _context2.next = 65;
            return _troopsService["default"].killRandomTroopInBattle(kingdomId);

          case 65:
            troopsInBattle--;
            _context2.next = 68;
            return _troopsService["default"].countFoodConsumption(kingdomId);

          case 68:
            troopsFoodConsumption = _context2.sent;
            _context2.next = 62;
            break;

          case 71:
            //destroy some buildings if we don't have enough FOOD for their consumption
            foodForBuildings = kingdom.food + (buildingStats.foodProduction - troopsFoodConsumption) * elapsedTicks;
            _context2.next = 74;
            return _buildingService["default"].countDestroyableBuildingsForFood(kingdomId);

          case 74:
            buildingsToDestroyFood = _context2.sent;

          case 75:
            if (!(foodForBuildings < buildingStats.foodConsumption * elapsedTicks && buildingsToDestroyFood > 0)) {
              _context2.next = 84;
              break;
            }

            _context2.next = 78;
            return _buildingService["default"].destroyRandomBuildingForFood(kingdomId);

          case 78:
            buildingsToDestroyFood--;
            _context2.next = 81;
            return _buildingService["default"].countBuildingsResources(kingdomId);

          case 81:
            buildingStats = _context2.sent;
            _context2.next = 75;
            break;

          case 84:
            //destroy some buildings if we don't have enough GOLD for their consumption
            goldForBuildings = kingdom.gold + buildingStats.goldProduction * elapsedTicks;
            _context2.next = 87;
            return _buildingService["default"].countDestroyableBuildingsForGold(kingdomId);

          case 87:
            buildingsToDestroyGold = _context2.sent;

          case 88:
            if (!(goldForBuildings < buildingStats.goldConsumption * elapsedTicks && buildingsToDestroyGold > 0)) {
              _context2.next = 97;
              break;
            }

            _context2.next = 91;
            return _buildingService["default"].destroyRandomBuildingForGold(kingdomId);

          case 91:
            buildingsToDestroyGold--;
            _context2.next = 94;
            return _buildingService["default"].countBuildingsResources(kingdomId);

          case 94:
            buildingStats = _context2.sent;
            _context2.next = 88;
            break;

          case 97:
            foodPerTick = buildingStats.foodProduction - buildingStats.foodConsumption - troopsFoodConsumption;
            goldPerTick = buildingStats.goldProduction - buildingStats.goldConsumption; //produce gold to maximum level

            maxGold = (0, _rules.rules)(level).kingdom.max_gold;

            if (kingdom.gold < maxGold) {
              newGold = goldPerTick * elapsedTicks;
              kingdom.gold = Math.min(maxGold, kingdom.gold + newGold);
            } else {
              kingdom.gold = maxGold;
            } //produce food to maximum level


            maxFood = (0, _rules.rules)(level).kingdom.max_food;

            if (kingdom.food < maxFood) {
              newFood = foodPerTick * elapsedTicks;
              kingdom.food = Math.min(maxFood, kingdom.food + newFood);
            } else {
              kingdom.food = maxFood;
            } //update last tick and food/gold production and save


            kingdom.lastTick += elapsedTicks * (0, _rules.rules)().tick_length;
            kingdom.foodProduction = buildingStats.foodProduction;
            kingdom.goldProduction = buildingStats.goldProduction;
            _context2.next = 108;
            return kingdom.save();

          case 108:
            _context2.next = 24;
            break;

          case 110:
            _context2.next = 115;
            break;

          case 112:
            _context2.prev = 112;
            _context2.t8 = _context2["catch"](22);

            _iterator.e(_context2.t8);

          case 115:
            _context2.prev = 115;

            _iterator.f();

            return _context2.finish(115);

          case 118:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[22, 112, 115, 118]]);
  }));

  return function updateResources(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  updateResources: updateResources,
  updateResourcesByKingdomId: updateResourcesByKingdomId
};
exports["default"] = _default;
//# sourceMappingURL=resources-service.js.map