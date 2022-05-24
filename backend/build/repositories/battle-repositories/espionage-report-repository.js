"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _espionageReport = _interopRequireDefault(require("../../models/espionage/espionage-report"));

var create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(totalTroops, totalAttackPower, totalDefensePower, gold, food, loyalty, battle) {
    var espionageReport, savedReport;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            espionageReport = {
              totalTroops: totalTroops,
              totalAttackPower: totalAttackPower,
              totalDefensePower: totalDefensePower,
              gold: gold,
              food: food,
              loyalty: loyalty,
              battleId: battle.id
            };
            _context.next = 3;
            return _espionageReport["default"].create(espionageReport);

          case 3:
            savedReport = _context.sent;
            return _context.abrupt("return", savedReport);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function create(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  create: create
};
exports["default"] = _default;
//# sourceMappingURL=espionage-report-repository.js.map