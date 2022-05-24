"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canAffordUnitUpgrade = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _troopsRules = require("../rules/troops-rules");

var _kingdomRepository = _interopRequireDefault(require("../repositories/kingdom-repository"));

var _unitLevelRepository = _interopRequireDefault(require("../repositories/unit-level-repository"));

var canAffordUnitUpgrade = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(kingdomId, type) {
    var kingdom, kingdomGold, kingdomUnitLevel, currentUpgradeLevel, val, troopUpgradeCost;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _kingdomRepository["default"].findKingdomById(kingdomId);

          case 2:
            kingdom = _context.sent;
            kingdomGold = kingdom.gold;
            _context.next = 6;
            return _unitLevelRepository["default"].findUnitLevelByTroopTypeAndByKingdomId(kingdomId, type);

          case 6:
            kingdomUnitLevel = _context.sent;
            currentUpgradeLevel = kingdomUnitLevel.upgradeLevel; // --->looping through troopsRules object tree, finding corresponding value<---

            _context.t0 = _regenerator["default"].keys((0, _troopsRules.troopRules)(currentUpgradeLevel));

          case 9:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 23;
              break;
            }

            val = _context.t1.value;

            if (!(val === type)) {
              _context.next = 21;
              break;
            }

            troopUpgradeCost = (0, _troopsRules.troopRules)(currentUpgradeLevel)[val].upgrade_cost;

            if (!(troopUpgradeCost <= kingdomGold)) {
              _context.next = 20;
              break;
            }

            kingdom.gold -= troopUpgradeCost;
            _context.next = 17;
            return kingdom.save();

          case 17:
            return _context.abrupt("return", true);

          case 20:
            return _context.abrupt("return", false);

          case 21:
            _context.next = 9;
            break;

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function canAffordUnitUpgrade(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.canAffordUnitUpgrade = canAffordUnitUpgrade;
//# sourceMappingURL=upgrade-troop-level-check.js.map