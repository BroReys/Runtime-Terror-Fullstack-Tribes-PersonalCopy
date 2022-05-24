"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canAfford = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _kingdomRepository = _interopRequireDefault(require("../repositories/kingdom-repository"));

var _troopsRules = require("../rules/troops-rules");

var canAfford = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(kingdomId, type, quantity) {
    var kingdom, kingdomGold, val, troopsTotalGoldCost;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _kingdomRepository["default"].findKingdomById(kingdomId);

          case 2:
            kingdom = _context.sent;
            kingdomGold = kingdom.gold; // --->looping through troopsRules object tree, finding corresponding value<---

            _context.t0 = _regenerator["default"].keys((0, _troopsRules.troopRules)());

          case 5:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 19;
              break;
            }

            val = _context.t1.value;

            if (!(val === type)) {
              _context.next = 17;
              break;
            }

            troopsTotalGoldCost = (0, _troopsRules.troopRules)()[val].gold_cost * quantity;

            if (!(troopsTotalGoldCost <= kingdomGold)) {
              _context.next = 16;
              break;
            }

            kingdom.gold -= troopsTotalGoldCost;
            _context.next = 13;
            return kingdom.save();

          case 13:
            return _context.abrupt("return", true);

          case 16:
            return _context.abrupt("return", false);

          case 17:
            _context.next = 5;
            break;

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function canAfford(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.canAfford = canAfford;
//# sourceMappingURL=troop-creation-check.js.map