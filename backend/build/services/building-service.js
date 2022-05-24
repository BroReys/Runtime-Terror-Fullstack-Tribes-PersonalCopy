"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _buildingRepository = _interopRequireDefault(require("../repositories/building-repository"));

var _errorMessage = _interopRequireDefault(require("../utilities/error-message"));

var _kingdomRepository = _interopRequireDefault(require("../repositories/kingdom-repository"));

var _buildingRules = require("../rules/building-rules");

var _rules = require("../rules/rules");

var _unitLevelRepository = _interopRequireDefault(require("../repositories/unit-level-repository"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getBuildings = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(kingdomId, userId) {
    var currentKingdom, authenticationError, idError, parseId, buildings;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _kingdomRepository["default"].findKingdomById(kingdomId);

          case 2:
            currentKingdom = _context.sent;
            authenticationError = null;
            idError = checkKingdomIdError(kingdomId);
            parseId = parseInt(kingdomId);
            buildings = null;

            if (!idError) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", {
              idError: idError,
              buildings: buildings
            });

          case 9:
            if (!(!currentKingdom || currentKingdom.userId !== userId)) {
              _context.next = 12;
              break;
            }

            authenticationError = (0, _errorMessage["default"])("This kingdom does not belong to authenticated player");
            return _context.abrupt("return", {
              authenticationError: authenticationError,
              buildings: buildings
            });

          case 12:
            _context.next = 14;
            return _buildingRepository["default"].findAllByKingdomIdAndStatusTrue(parseId);

          case 14:
            buildings = _context.sent;

            if (!(buildings.length === 0)) {
              _context.next = 18;
              break;
            }

            buildings = {
              "status": "Kingdom has 0 active buildings"
            };
            return _context.abrupt("return", buildings);

          case 18:
            return _context.abrupt("return", buildings);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getBuildings(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getKingdomBuildings = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(kingdomId) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _buildingRepository["default"].findAllBuiltAndActiveByKingdomId(kingdomId));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getKingdomBuildings(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var addBuildingToKingdom = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(kingdomId, type, userId) {
    var authenticationError, idError, inputError, parseId, buildingToCreate, kingdom, buildingStats, buildingWithTargetPosition, currentGold, currentFood, resourceError;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            authenticationError = null;
            idError = checkKingdomIdError(kingdomId);
            inputError = null;
            parseId = parseInt(kingdomId);
            buildingToCreate = null;
            _context3.next = 7;
            return _kingdomRepository["default"].findKingdomById(parseId);

          case 7:
            kingdom = _context3.sent;

            if (!idError) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", {
              idError: idError,
              buildingToCreate: buildingToCreate
            });

          case 10:
            if (!(type === undefined || type === null)) {
              _context3.next = 13;
              break;
            }

            inputError = (0, _errorMessage["default"])("Type is required!");
            return _context3.abrupt("return", {
              inputError: inputError,
              buildingToCreate: buildingToCreate
            });

          case 13:
            if (kingdom) {
              _context3.next = 16;
              break;
            }

            inputError = (0, _errorMessage["default"])("No kingdom with provided ID!");
            return _context3.abrupt("return", {
              inputError: inputError,
              buildingToCreate: buildingToCreate
            });

          case 16:
            if (!(!kingdom || kingdom.userId !== userId)) {
              _context3.next = 19;
              break;
            }

            authenticationError = (0, _errorMessage["default"])("This kingdom does not belong to authenticated player");
            return _context3.abrupt("return", {
              authenticationError: authenticationError,
              buildingToCreate: buildingToCreate
            });

          case 19:
            // searching for correct building names
            buildingStats = getBuildingStatsByName(1, type);

            if (buildingStats) {
              _context3.next = 23;
              break;
            }

            inputError = (0, _errorMessage["default"])("Incorrect type!");
            return _context3.abrupt("return", {
              inputError: inputError,
              buildingToCreate: buildingToCreate
            });

          case 23:
            _context3.next = 25;
            return _buildingRepository["default"].findAllByKingdomIdWhereType(parseId, type);

          case 25:
            buildingWithTargetPosition = _context3.sent;

            if (!(buildingWithTargetPosition.length !== 0)) {
              _context3.next = 29;
              break;
            }

            inputError = (0, _errorMessage["default"])("That type of building already exists!");
            return _context3.abrupt("return", {
              inputError: inputError,
              buildingToCreate: buildingToCreate
            });

          case 29:
            currentGold = kingdom.gold;
            currentFood = kingdom.food;
            resourceError = null;

            if (!(buildingStats.foodCost > currentFood || buildingStats.goldCost > currentGold)) {
              _context3.next = 35;
              break;
            }

            resourceError = (0, _errorMessage["default"])("Not enough resources!");
            return _context3.abrupt("return", {
              resourceError: resourceError,
              buildingToCreate: buildingToCreate
            });

          case 35:
            buildingToCreate = {
              type: buildingStats.name,
              position: buildingStats.position,
              status: false,
              level: 1,
              startTime: Math.floor(Date.now() / 1000),
              endTime: Math.floor(Date.now() / 1000) + buildingStats.constructionTime,
              destroyTime: null,
              kingdomId: kingdom.id
            };
            kingdom.food = currentFood - buildingStats.foodCost;
            kingdom.gold = currentGold - buildingStats.goldCost;
            _context3.next = 40;
            return _kingdomRepository["default"].save(kingdom);

          case 40:
            _context3.next = 42;
            return _buildingRepository["default"].createBuilding(buildingToCreate);

          case 42:
            return _context3.abrupt("return", buildingToCreate);

          case 43:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function addBuildingToKingdom(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var upgradeOrTeardownBuilding = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(kingdomId, buildingId, action, instant, userId) {
    var kingdomIdError, buildingIdError, typeOfAction, inputError, resourceError, currentBuilding, currentKingdom, kingdomTownhall, authenticationError;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            kingdomIdError = checkKingdomIdError(kingdomId);
            buildingIdError = checkBuildingIdError(buildingId);
            typeOfAction = action;
            inputError = null;
            resourceError = null;
            _context4.next = 7;
            return _buildingRepository["default"].findBuildingByPk(buildingId);

          case 7:
            currentBuilding = _context4.sent;
            _context4.next = 10;
            return _kingdomRepository["default"].findKingdomById(kingdomId);

          case 10:
            currentKingdom = _context4.sent;
            _context4.next = 13;
            return _buildingRepository["default"].findTownhallByKingdomId(kingdomId);

          case 13:
            kingdomTownhall = _context4.sent;
            authenticationError = null;

            if (!kingdomIdError) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt("return", {
              kingdomIdError: kingdomIdError,
              currentBuilding: currentBuilding
            });

          case 17:
            if (!buildingIdError) {
              _context4.next = 19;
              break;
            }

            return _context4.abrupt("return", {
              buildingIdError: buildingIdError,
              currentBuilding: currentBuilding
            });

          case 19:
            if (!(!currentKingdom || currentKingdom.userId !== userId)) {
              _context4.next = 22;
              break;
            }

            authenticationError = (0, _errorMessage["default"])("This kingdom does not belong to authenticated player");
            return _context4.abrupt("return", {
              authenticationError: authenticationError,
              buildings: buildings
            });

          case 22:
            if (typeOfAction) {
              _context4.next = 25;
              break;
            }

            inputError = {
              error: "Missing action!"
            };
            return _context4.abrupt("return", {
              inputError: inputError,
              currentBuilding: currentBuilding
            });

          case 25:
            if (!(typeOfAction !== "upgrade" && typeOfAction !== "tear-down")) {
              _context4.next = 28;
              break;
            }

            inputError = {
              error: "Wrong action!"
            };
            return _context4.abrupt("return", {
              inputError: inputError,
              currentBuilding: currentBuilding
            });

          case 28:
            if (!(!currentBuilding || !currentKingdom)) {
              _context4.next = 31;
              break;
            }

            inputError = (0, _errorMessage["default"])("Invalid ID!");
            return _context4.abrupt("return", {
              inputError: inputError,
              currentBuilding: currentBuilding
            });

          case 31:
            if (!(currentBuilding.kingdomId !== currentKingdom.id)) {
              _context4.next = 34;
              break;
            }

            inputError = (0, _errorMessage["default"])("This building doesn't belong to this kingdom!");
            return _context4.abrupt("return", {
              inputError: inputError,
              currentBuilding: currentBuilding
            });

          case 34:
            if (!(currentBuilding.status === false)) {
              _context4.next = 37;
              break;
            }

            inputError = (0, _errorMessage["default"])("You can't upgrade this building right now!");
            return _context4.abrupt("return", {
              inputError: inputError,
              currentBuilding: currentBuilding
            });

          case 37:
            if (!(typeOfAction === "upgrade")) {
              _context4.next = 47;
              break;
            }

            if (!(currentBuilding.level >= (0, _rules.rules)(1).max_townhall_level || currentBuilding.level >= kingdomTownhall.level && currentBuilding.position !== 1)) {
              _context4.next = 41;
              break;
            }

            inputError = (0, _errorMessage["default"])("You can't upgrade building above townhall level!");
            return _context4.abrupt("return", {
              inputError: inputError,
              currentBuilding: currentBuilding
            });

          case 41:
            _context4.next = 43;
            return upgradeBuilding(currentBuilding, currentKingdom);

          case 43:
            currentBuilding = _context4.sent;

            if (currentBuilding) {
              _context4.next = 47;
              break;
            }

            resourceError = (0, _errorMessage["default"])("You don't have enough resources to upgrade!");
            return _context4.abrupt("return", {
              resourceError: resourceError,
              currentBuilding: currentBuilding
            });

          case 47:
            if (!(typeOfAction === "tear-down" && instant === true)) {
              _context4.next = 55;
              break;
            }

            currentBuilding = teardownWithInstantTrue(currentBuilding, currentKingdom);

            if (currentBuilding) {
              _context4.next = 54;
              break;
            }

            resourceError = (0, _errorMessage["default"])("You don't have enough resources to upgrade!");
            return _context4.abrupt("return", {
              resourceError: resourceError,
              currentBuilding: currentBuilding
            });

          case 54:
            return _context4.abrupt("return", {
              status: "Instant teardown successful!"
            });

          case 55:
            if (!(typeOfAction === "tear-down" && instant === false)) {
              _context4.next = 61;
              break;
            }

            if (!(currentBuilding.level === 1)) {
              _context4.next = 59;
              break;
            }

            inputError = (0, _errorMessage["default"])("You can't teardown building on level 1! Please use instant teardown!");
            return _context4.abrupt("return", {
              inputError: inputError,
              currentBuilding: currentBuilding
            });

          case 59:
            currentBuilding = teardownWithInstantFalse(currentBuilding);
            return _context4.abrupt("return", currentBuilding);

          case 61:
            return _context4.abrupt("return", currentBuilding);

          case 62:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function upgradeOrTeardownBuilding(_x7, _x8, _x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

var upgradeBuilding = function upgradeBuilding(building, kingdom) {
  var currentBuildingLevel = building.level;
  var currentKingdomFood = kingdom.food;
  var currentKingdomGold = kingdom.gold;
  var upgradeBuildingLevel = currentBuildingLevel + 1;
  var buildingStats = getBuildingStatsByName(upgradeBuildingLevel, building.type);

  if (currentKingdomGold < buildingStats.goldCost && currentKingdomFood < buildingStats.foodCost) {
    return null;
  }

  kingdom.set({
    food: currentKingdomFood - buildingStats.foodCost,
    gold: currentKingdomGold - buildingStats.goldCost
  });

  _kingdomRepository["default"].save(kingdom);

  building.set({
    status: false,
    level: currentBuildingLevel + 1,
    startTime: Math.floor(Date.now() / 1000),
    endTime: Math.floor(Date.now() / 1000) + buildingStats.constructionTime
  });
  building = _buildingRepository["default"].saveBuilding(building);
  return building;
};

var teardownWithInstantFalse = function teardownWithInstantFalse(building) {
  var currentBuildingLevel = building.level;
  var buildingStats = getBuildingStatsByName(currentBuildingLevel, building.type);
  var buildingTime = buildingStats.constructionTime / 10;
  building.set({
    status: false,
    level: currentBuildingLevel - 1,
    startTime: Math.floor(Date.now() / 1000),
    endTime: Math.floor(Date.now() / 1000) + buildingTime
  });
  building = _buildingRepository["default"].saveBuilding(building);
  return building;
};

var teardownWithInstantTrue = function teardownWithInstantTrue(building, kingdom) {
  var currentBuildingLevel = building.level;
  var currentKingdomFood = kingdom.food;
  var currentKingdomGold = kingdom.gold;
  var teardownBuildingLevel = currentBuildingLevel - 1;
  var buildingStats = getBuildingStatsByName(teardownBuildingLevel, building.type);

  if (currentKingdomGold < buildingStats.goldCost && currentKingdomFood < buildingStats.foodCost) {
    return null;
  }

  kingdom.set({
    food: currentKingdomFood - buildingStats.foodCost,
    gold: currentKingdomGold - buildingStats.goldCost
  });

  _kingdomRepository["default"].save(kingdom);

  _buildingRepository["default"].destroyBuilding(building);

  return {
    status: "ok"
  };
};

var getBuildingStatsByName = function getBuildingStatsByName(level, type) {
  var buildingArray = Object.entries((0, _buildingRules.buildingRules)(level));
  var buildingStats;

  for (var i = 0; i < buildingArray.length; i++) {
    if (type === buildingArray[i][1].name) {
      buildingStats = buildingArray[i][1];
    }
  }

  return buildingStats;
};

var checkKingdomIdError = function checkKingdomIdError(kingdomId) {
  var idError = null;
  var parseId = parseInt(kingdomId);

  if (Number.isNaN(parseId)) {
    idError = (0, _errorMessage["default"])("Kingdom ID is not a number!");
    return idError;
  }

  if (kingdomId === null || kingdomId === undefined) {
    idError = (0, _errorMessage["default"])("Wrong kingdom ID!");
    return idError;
  }
};

var checkBuildingIdError = function checkBuildingIdError(buildingId) {
  var idError = null;
  var parseId = parseInt(buildingId);

  if (Number.isNaN(parseId)) {
    idError = (0, _errorMessage["default"])("Building ID is not a number!");
    return idError;
  }

  if (buildingId === null || buildingId === undefined) {
    idError = (0, _errorMessage["default"])("Wrong building ID!");
    return idError;
  }
};

var updateBuildings = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(kingdomId, currentTime) {
    var buildings, _iterator, _step, currentBuilding;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _buildingRepository["default"].findAllByKingdomIdAndStatusFalse(kingdomId);

          case 2:
            buildings = _context5.sent;

            if (!currentTime) {
              currentTime = Math.floor(Date.now() / 1000);
            }

            _iterator = _createForOfIteratorHelper(buildings);
            _context5.prev = 5;

            _iterator.s();

          case 7:
            if ((_step = _iterator.n()).done) {
              _context5.next = 15;
              break;
            }

            currentBuilding = _step.value;

            if (!(currentBuilding.endTime < currentTime)) {
              _context5.next = 13;
              break;
            }

            currentBuilding.status = true;
            _context5.next = 13;
            return _buildingRepository["default"].saveBuilding(currentBuilding);

          case 13:
            _context5.next = 7;
            break;

          case 15:
            _context5.next = 20;
            break;

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5["catch"](5);

            _iterator.e(_context5.t0);

          case 20:
            _context5.prev = 20;

            _iterator.f();

            return _context5.finish(20);

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[5, 17, 20, 23]]);
  }));

  return function updateBuildings(_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

var countBuildingsResources = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(kingdomId) {
    var foodConsumption, goldConsumption, foodProduction, goldProduction, buildings, _iterator2, _step2, building;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            foodConsumption = 0;
            goldConsumption = 0;
            foodProduction = 0;
            goldProduction = 0;
            _context6.next = 6;
            return getKingdomBuildings(kingdomId);

          case 6:
            buildings = _context6.sent;

            if (buildings) {
              //count food/gold consumption and generation for each active and built building in a kingdom
              _iterator2 = _createForOfIteratorHelper(buildings);

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  building = _step2.value;

                  if (building.type === 'farm') {
                    foodProduction += (0, _buildingRules.buildingRules)(building.level).farm.generation || 0;
                  } else if (building.type === 'mine') {
                    goldProduction += (0, _buildingRules.buildingRules)(building.level).mine.generation || 0;
                  }

                  foodConsumption += (0, _buildingRules.buildingRules)(building.level)[building.type].foodConsumption || 0;
                  goldConsumption += (0, _buildingRules.buildingRules)(building.level)[building.type].goldConsumption || 0;
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }

            return _context6.abrupt("return", {
              foodConsumption: foodConsumption,
              goldConsumption: goldConsumption,
              foodProduction: foodProduction,
              goldProduction: goldProduction
            });

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function countBuildingsResources(_x14) {
    return _ref6.apply(this, arguments);
  };
}();

var getKingdomLevelByTownhall = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(kingdomId) {
    var townhall;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _buildingRepository["default"].findTownhallByKingdomId(kingdomId);

          case 2:
            townhall = _context7.sent;

            if (!townhall) {
              _context7.next = 7;
              break;
            }

            return _context7.abrupt("return", townhall.level);

          case 7:
            return _context7.abrupt("return", 0);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getKingdomLevelByTownhall(_x15) {
    return _ref7.apply(this, arguments);
  };
}();

var countDestroyableBuildingsForFood = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(kingdomId) {
    var buildings, townhall;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _buildingRepository["default"].countDestroyableBuildingsExcept(kingdomId, "farm");

          case 2:
            buildings = _context8.sent;
            _context8.next = 5;
            return getKingdomLevelByTownhall(kingdomId);

          case 5:
            townhall = _context8.sent;
            return _context8.abrupt("return", townhall + buildings);

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function countDestroyableBuildingsForFood(_x16) {
    return _ref8.apply(this, arguments);
  };
}();

var countDestroyableBuildingsForGold = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(kingdomId) {
    var buildings, townhall;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _buildingRepository["default"].countDestroyableBuildingsExcept(kingdomId, "mine");

          case 2:
            buildings = _context9.sent;
            _context9.next = 5;
            return getKingdomLevelByTownhall(kingdomId);

          case 5:
            townhall = _context9.sent;
            return _context9.abrupt("return", townhall + buildings);

          case 7:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function countDestroyableBuildingsForGold(_x17) {
    return _ref9.apply(this, arguments);
  };
}();

var destroyRandomBuildingExcept = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(kingdomId, buildingType) {
    var building, townhall;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _buildingRepository["default"].getRandomBuildingExcept(kingdomId, buildingType);

          case 2:
            building = _context10.sent;

            if (!building) {
              _context10.next = 8;
              break;
            }

            _context10.next = 6;
            return _buildingRepository["default"].destroyBuilding(building);

          case 6:
            _context10.next = 14;
            break;

          case 8:
            _context10.next = 10;
            return _buildingRepository["default"].findTownhallByKingdomId(kingdomId);

          case 10:
            townhall = _context10.sent;
            townhall.level -= 1;
            _context10.next = 14;
            return _buildingRepository["default"].saveBuilding(townhall);

          case 14:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function destroyRandomBuildingExcept(_x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();

var destroyRandomBuildingForFood = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(kingdomId) {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            return _context11.abrupt("return", destroyRandomBuildingExcept(kingdomId, "farm"));

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function destroyRandomBuildingForFood(_x20) {
    return _ref11.apply(this, arguments);
  };
}();

var destroyRandomBuildingForGold = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(kingdomId) {
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            return _context12.abrupt("return", destroyRandomBuildingExcept(kingdomId, "mine"));

          case 1:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function destroyRandomBuildingForGold(_x21) {
    return _ref12.apply(this, arguments);
  };
}();

var getUpdateBreakpoints = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(kingdomId, currentTick) {
    var breakpoints, buildings, _iterator3, _step3, building;

    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            breakpoints = [];
            _context13.next = 3;
            return _buildingRepository["default"].findAllInProgressUntil(kingdomId, currentTick);

          case 3:
            buildings = _context13.sent;
            _iterator3 = _createForOfIteratorHelper(buildings);

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                building = _step3.value;
                breakpoints.push(building.endTime);
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            return _context13.abrupt("return", breakpoints);

          case 7:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function getUpdateBreakpoints(_x22, _x23) {
    return _ref13.apply(this, arguments);
  };
}(); //---> used during Kingdom creation, to generate lvl 1 starter buildings  <---


var generateStarterBuildings = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(kingdomId) {
    var starterBuildingTypes, i, buildingStats, buildingToCreate;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            starterBuildingTypes = (0, _buildingRules.buildingRules)().startedBuildings;
            i = 0;

          case 2:
            if (!(i < starterBuildingTypes.length)) {
              _context14.next = 10;
              break;
            }

            buildingStats = getBuildingStatsByName(1, starterBuildingTypes[i]);
            buildingToCreate = {
              type: buildingStats.name,
              position: buildingStats.position,
              status: true,
              level: 1,
              startTime: Math.floor(Date.now() / 1000),
              endTime: Math.floor(Date.now() / 1000),
              destroyTime: null,
              kingdomId: kingdomId
            };
            _context14.next = 7;
            return _buildingRepository["default"].createBuilding(buildingToCreate);

          case 7:
            i++;
            _context14.next = 2;
            break;

          case 10:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function generateStarterBuildings(_x24) {
    return _ref14.apply(this, arguments);
  };
}();

var _default = {
  getBuildings: getBuildings,
  getKingdomBuildings: getKingdomBuildings,
  addBuildingToKingdom: addBuildingToKingdom,
  getBuildingStatsByName: getBuildingStatsByName,
  upgradeOrTeardownBuilding: upgradeOrTeardownBuilding,
  updateBuildings: updateBuildings,
  countBuildingsResources: countBuildingsResources,
  getKingdomLevelByTownhall: getKingdomLevelByTownhall,
  destroyRandomBuildingForFood: destroyRandomBuildingForFood,
  destroyRandomBuildingForGold: destroyRandomBuildingForGold,
  countDestroyableBuildingsForFood: countDestroyableBuildingsForFood,
  countDestroyableBuildingsForGold: countDestroyableBuildingsForGold,
  checkKingdomIdError: checkKingdomIdError,
  checkBuildingIdError: checkBuildingIdError,
  getUpdateBreakpoints: getUpdateBreakpoints,
  generateStarterBuildings: generateStarterBuildings
};
exports["default"] = _default;
//# sourceMappingURL=building-service.js.map