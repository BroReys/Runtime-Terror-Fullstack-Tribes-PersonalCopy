"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _attackerTroopsToBattle = _interopRequireDefault(require("../../models/battle/attacker-troops-to-battle"));

var create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(troops, battle) {
    var i, attackerTroop;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < troops.length)) {
              _context.next = 8;
              break;
            }

            attackerTroop = {
              type: troops[i].type,
              quantity: troops[i].quantity,
              battleId: battle.id
            };
            _context.next = 5;
            return _attackerTroopsToBattle["default"].create(attackerTroop);

          case 5:
            i++;
            _context.next = 1;
            break;

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  create: create
};
exports["default"] = _default;
//# sourceMappingURL=attacker-troops-to-battle-repository.js.map