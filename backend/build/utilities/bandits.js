"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _aiRules = require("../rules/ai-rules");

var _kingdomRepository = _interopRequireDefault(require("../repositories/kingdom-repository"));

var _romanize = _interopRequireDefault(require("./romanize"));

var _map = _interopRequireDefault(require("../models/map"));

var _rules = require("../rules/rules");

var _troopsRules = require("../rules/troops-rules");

var _troopsService = _interopRequireDefault(require("../services/troops-services/troops-service"));

var _unitLevelRepository = _interopRequireDefault(require("../repositories/unit-level-repository"));

var _kingdom = _interopRequireDefault(require("../models/kingdom"));

var _userService = _interopRequireDefault(require("../services/user-service"));

var _troopsRepository = _interopRequireDefault(require("../repositories/troops-repositories/troops-repository"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var createBandits = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(days) {
    var numberOfBandits, map, troopTypes, i, coordinates, kingdom, savedKingdom;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            numberOfBandits = getRandomBetweenTwoIntegers(1, 5);
            _context.next = 3;
            return _map["default"].get();

          case 3:
            map = _context.sent;
            troopTypes = (0, _troopsRules.troopRules)(1).type;
            i = 0;

          case 6:
            if (!(i < numberOfBandits)) {
              _context.next = 26;
              break;
            }

            coordinates = getRandomCoordinatesThatAreNotInMap(map);
            map.push(coordinates);
            kingdom = {
              name: "Bandits camp " + (0, _romanize["default"])(i + 1),
              coordinateX: coordinates.coordinateX,
              coordinateY: coordinates.coordinateY
            };
            _context.next = 12;
            return _kingdom["default"].create(kingdom);

          case 12:
            savedKingdom = _context.sent;
            _context.t0 = savedKingdom;
            _context.next = 16;
            return _userService["default"].findById(1);

          case 16:
            _context.t1 = _context.sent;
            _context.next = 19;
            return _context.t0.setUser.call(_context.t0, _context.t1);

          case 19:
            _context.next = 21;
            return savedKingdom.save();

          case 21:
            _context.next = 23;
            return createRandomTroops(troopTypes, days, savedKingdom.id);

          case 23:
            i++;
            _context.next = 6;
            break;

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createBandits(_x) {
    return _ref.apply(this, arguments);
  };
}();

var destroyBandits = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(banditsKingdomId) {
    var bandits, troops, i, unitLevel;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _kingdomRepository["default"].findKingdomById(banditsKingdomId);

          case 2:
            bandits = _context2.sent;
            _context2.next = 5;
            return bandits.getTroops();

          case 5:
            troops = _context2.sent;
            i = 0;

          case 7:
            if (!(i < troops.length)) {
              _context2.next = 18;
              break;
            }

            _context2.next = 10;
            return troops[i].getUnitLevel();

          case 10:
            unitLevel = _context2.sent;
            _context2.next = 13;
            return troops[i].destroy();

          case 13:
            _context2.next = 15;
            return unitLevel.destroy();

          case 15:
            i++;
            _context2.next = 7;
            break;

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function destroyBandits(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getBanditsReward = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(banditsKingdomId) {
    var troops, totalGoldCost, _iterator, _step, troop, troopType, quantity, val;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _troopsRepository["default"].findAllKingdomTroops(banditsKingdomId);

          case 2:
            troops = _context3.sent;
            totalGoldCost = 0;
            _iterator = _createForOfIteratorHelper(troops);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                troop = _step.value;
                troopType = troop.get({
                  plain: true
                }).type;
                quantity = troop.get({
                  plain: true
                }).quantity;

                for (val in (0, _troopsRules.troopRules)()) {
                  if (val === troopType) {
                    totalGoldCost += (0, _troopsRules.troopRules)()[val].gold_cost * quantity;
                  }
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return _context3.abrupt("return", totalGoldCost * getRandomBetweenTwoIntegers(0.5, 5));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getBanditsReward(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var createRandomTroops = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(troopTypes, days, kingdomId) {
    var i, unitLevel;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < troopTypes.length)) {
              _context4.next = 17;
              break;
            }

            if (!(troopTypes[i] !== "diplomat" && troopTypes[i] !== "catapult" && troopTypes[i] !== "settlers")) {
              _context4.next = 14;
              break;
            }

            console.log(troopTypes[i]);
            _context4.next = 6;
            return _unitLevelRepository["default"].generateUnitLevel({
              type: troopTypes[i],
              kingdomId: kingdomId,
              upgradeLevel: days
            });

          case 6:
            _context4.next = 8;
            return _troopsService["default"].joinTroopArmy(troopTypes[i], (0, _aiRules.aiRules)(days).number_of_troops, kingdomId);

          case 8:
            _context4.next = 10;
            return _unitLevelRepository["default"].findUnitLevelByTroopTypeAndByKingdomId(kingdomId, troopTypes[i]);

          case 10:
            unitLevel = _context4.sent;
            unitLevel.upgradeLevel = days;
            _context4.next = 14;
            return unitLevel.save();

          case 14:
            i++;
            _context4.next = 1;
            break;

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function createRandomTroops(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var getRandomBetweenTwoIntegers = function getRandomBetweenTwoIntegers(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomCoordinatesThatAreNotInMap = function getRandomCoordinatesThatAreNotInMap(map) {
  var coordinateX = getRandomBetweenTwoIntegers(0, (0, _rules.rules)(0).max_position - 1);
  var coordinateY = getRandomBetweenTwoIntegers(0, (0, _rules.rules)(0).max_position - 1);
  var found = map.filter(function (kingdom) {
    return kingdom.coordinateX === coordinateX && kingdom.coordinateY === coordinateY;
  });

  if (found.length > 0) {
    return getRandomCoordinatesThatAreNotInMap(map);
  }

  return {
    coordinateX: coordinateX,
    coordinateY: coordinateY
  };
};

var _default = {
  createBandits: createBandits,
  destroyBandits: destroyBandits,
  getBanditsReward: getBanditsReward
};
exports["default"] = _default;
//# sourceMappingURL=bandits.js.map