"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _unitLevelService = _interopRequireDefault(require("../services/unit-level-service"));

var upgradeTroop = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var type, kingdomId, user, status;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = req.body.type;
            kingdomId = req.params.id;
            user = req.user;
            _context.next = 5;
            return _unitLevelService["default"].upgradeUnitLevel(type, kingdomId, user);

          case 5:
            status = _context.sent;
            _context.t0 = status;
            _context.next = _context.t0 === "wrong_type" ? 9 : _context.t0 === "kingdom_not_exists" ? 11 : _context.t0 === "wrong_kingdom_id" ? 13 : _context.t0 === "wrong_troop_type" ? 15 : _context.t0 === "no_gold" ? 17 : _context.t0 === "no_academy" ? 19 : _context.t0 === "academy_destroyed" ? 21 : _context.t0 === "max_level" ? 23 : _context.t0 === "ok" ? 25 : 27;
            break;

          case 9:
            res.status(400).json({
              error: "One of the required fields missing!"
            });
            return _context.abrupt("break", 27);

          case 11:
            res.status(400).json({
              error: "Kingdom does not exists!"
            });
            return _context.abrupt("break", 27);

          case 13:
            res.status(403).json({
              error: "You are not authorized, wrong kingdom ID"
            });
            return _context.abrupt("break", 27);

          case 15:
            res.status(400).json({
              error: "Wrong troop type inserted!"
            });
            return _context.abrupt("break", 27);

          case 17:
            res.status(400).json({
              error: "You have not enough gold!"
            });
            return _context.abrupt("break", 27);

          case 19:
            res.status(400).json({
              error: "You have no academy built!"
            });
            return _context.abrupt("break", 27);

          case 21:
            res.status(400).json({
              error: "Your academy was destroyed. You can't upgrade troops!"
            });
            return _context.abrupt("break", 27);

          case 23:
            res.status(400).json({
              error: "Already reached max level!"
            });
            return _context.abrupt("break", 27);

          case 25:
            res.status(200).json({
              success: "Troops are upgraded!"
            });
            return _context.abrupt("break", 27);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function upgradeTroop(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  upgradeTroop: upgradeTroop
};
exports["default"] = _default;
//# sourceMappingURL=unit-level-controller.js.map