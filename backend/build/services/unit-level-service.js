"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _unitLevelRepository = _interopRequireDefault(require("../repositories/unit-level-repository"));

var _troopsRules = require("../rules/troops-rules");

var _kingdomRepository = _interopRequireDefault(require("../repositories/kingdom-repository"));

var _upgradeTroopLevelCheck = require("../utilities/upgrade-troop-level-check");

var _buildingRepository = _interopRequireDefault(require("../repositories/building-repository"));

//---> used during Kingdom registration, to generate lvl 1 upgradeLevels <---
var generateBasicUnitLevels = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(kingdomId) {
    var troopTypes, i, unitLevel;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            troopTypes = (0, _troopsRules.troopRules)().type;
            i = 0;

          case 2:
            if (!(i < troopTypes.length)) {
              _context.next = 9;
              break;
            }

            unitLevel = {
              type: troopTypes[i],
              upgradeLevel: 1,
              kingdomId: kingdomId
            };
            _context.next = 6;
            return _unitLevelRepository["default"].generateUnitLevel(unitLevel);

          case 6:
            i++;
            _context.next = 2;
            break;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateBasicUnitLevels(_x) {
    return _ref.apply(this, arguments);
  };
}(); // ---> to upgrade unitLevel, goes through several checks


var upgradeUnitLevel = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(type, kingdomId, user) {
    var authenticatedUserKingdom, kingdomsAcademy, unitLevel;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _kingdomRepository["default"].findKingdomById(kingdomId);

          case 2:
            authenticatedUserKingdom = _context2.sent;
            _context2.next = 5;
            return _buildingRepository["default"].findAcademyByKingdomId(kingdomId);

          case 5:
            kingdomsAcademy = _context2.sent;

            if (type) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", "wrong_type");

          case 10:
            if (authenticatedUserKingdom) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", "kingdom_not_exists");

          case 14:
            if (!(user.id !== authenticatedUserKingdom.userId)) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return", "wrong_kingdom_id");

          case 18:
            if ((0, _troopsRules.troopRules)().type.includes(type)) {
              _context2.next = 22;
              break;
            }

            return _context2.abrupt("return", "wrong_troop_type");

          case 22:
            _context2.next = 24;
            return (0, _upgradeTroopLevelCheck.canAffordUnitUpgrade)(kingdomId, type);

          case 24:
            if (_context2.sent) {
              _context2.next = 28;
              break;
            }

            return _context2.abrupt("return", "no_gold");

          case 28:
            if (kingdomsAcademy) {
              _context2.next = 32;
              break;
            }

            return _context2.abrupt("return", "no_academy");

          case 32:
            if (kingdomsAcademy.status) {
              _context2.next = 36;
              break;
            }

            return _context2.abrupt("return", "academy_destroyed");

          case 36:
            _context2.next = 38;
            return _unitLevelRepository["default"].findUnitLevelByTroopTypeAndByKingdomId(kingdomId, type);

          case 38:
            unitLevel = _context2.sent;

            if (!(unitLevel.upgradeLevel >= 20)) {
              _context2.next = 41;
              break;
            }

            return _context2.abrupt("return", "max_level");

          case 41:
            unitLevel.upgradeLevel += 1;
            _context2.next = 44;
            return unitLevel.save();

          case 44:
            return _context2.abrupt("return", "ok");

          case 45:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function upgradeUnitLevel(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var findUnitLevelByTroopTypeAndKingdomId = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(kingdomId, type) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", _unitLevelRepository["default"].findUnitLevelByTroopTypeAndByKingdomId(kingdomId, type));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findUnitLevelByTroopTypeAndKingdomId(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  generateBasicUnitLevels: generateBasicUnitLevels,
  findUnitLevelByTroopTypeAndKingdomId: findUnitLevelByTroopTypeAndKingdomId,
  upgradeUnitLevel: upgradeUnitLevel
};
exports["default"] = _default;
//# sourceMappingURL=unit-level-service.js.map