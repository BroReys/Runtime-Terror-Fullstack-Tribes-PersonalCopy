"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _troopsInBarracksService = _interopRequireDefault(require("../services/troops-services/troops-in-barracks-service"));

var _troopsService = _interopRequireDefault(require("../services/troops-services/troops-service"));

var _troopsRepository = _interopRequireDefault(require("../repositories/troops-repositories/troops-repository"));

var create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var type, quantity, kingdomId, user, status, kingdomTroopsInBarracks;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = req.body.type;
            quantity = req.body.quantity;
            kingdomId = req.params.id;
            user = req.user;
            _context.next = 6;
            return _troopsInBarracksService["default"].trainTroop(type, quantity, kingdomId, user);

          case 6:
            status = _context.sent;
            _context.t0 = status;
            _context.next = _context.t0 === "missing_field" ? 10 : _context.t0 === "kingdom_not_exists" ? 12 : _context.t0 === "wrong_kingdom_id" ? 14 : _context.t0 === "no_gold" ? 16 : _context.t0 === "wrong_type" ? 18 : _context.t0 === "settler_only_one" ? 20 : _context.t0 === "already_built_settler" ? 22 : _context.t0 === "ok" ? 24 : 29;
            break;

          case 10:
            res.status(400).json({
              error: "One of the required fields missing!"
            });
            return _context.abrupt("break", 29);

          case 12:
            res.status(400).json({
              error: "Kingdom does not exists!"
            });
            return _context.abrupt("break", 29);

          case 14:
            res.status(403).json({
              error: "You are not authorized, wrong kingdom ID"
            });
            return _context.abrupt("break", 29);

          case 16:
            res.status(400).json({
              error: "Not enough gold for this amount of troops!"
            });
            return _context.abrupt("break", 29);

          case 18:
            res.status(400).json({
              error: "Wrong type of troop!"
            });
            return _context.abrupt("break", 29);

          case 20:
            res.status(400).json({
              error: "You can have only one group of settlers in game!"
            });
            return _context.abrupt("break", 29);

          case 22:
            res.status(400).json({
              error: "Settlers are already built!"
            });
            return _context.abrupt("break", 29);

          case 24:
            _context.next = 26;
            return _troopsInBarracksService["default"].findKingdomTroopsInBarracks(kingdomId);

          case 26:
            kingdomTroopsInBarracks = _context.sent;
            res.status(200).json(kingdomTroopsInBarracks);
            return _context.abrupt("break", 29);

          case 29:
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

var showTroopArmies = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var kingdomId, token, status, recruitedKingdomTroops;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            kingdomId = req.params.id;
            token = req.user;
            _context2.next = 4;
            return _troopsService["default"].listAllRecruitedKingdomTroops(kingdomId, token);

          case 4:
            status = _context2.sent;
            _context2.t0 = status;
            _context2.next = _context2.t0 === "no_authorized" ? 8 : _context2.t0 === "kingdom_not_exists" ? 10 : _context2.t0 === "ok" ? 12 : 17;
            break;

          case 8:
            res.status(403).json({
              error: "You are not authorized!"
            });
            return _context2.abrupt("break", 17);

          case 10:
            res.status(400).json({
              error: "Wrong kingdom ID"
            });
            return _context2.abrupt("break", 17);

          case 12:
            _context2.next = 14;
            return _troopsRepository["default"].findRecruitedKingdomTroops(kingdomId);

          case 14:
            recruitedKingdomTroops = _context2.sent;
            res.status(200).json(recruitedKingdomTroops);
            return _context2.abrupt("break", 17);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function showTroopArmies(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  create: create,
  showTroopArmies: showTroopArmies
};
exports["default"] = _default;
//# sourceMappingURL=troops-controller.js.map