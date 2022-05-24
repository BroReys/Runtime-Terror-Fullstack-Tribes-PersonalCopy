"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _kingdomService = _interopRequireDefault(require("../services/kingdom-service"));

var _userService = _interopRequireDefault(require("../services/user-service"));

var _rules = require("../rules/rules");

var winner_middleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var gameOver, winner, total_kingdoms, game_stats, current_ratio, first_player, registration_length;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            gameOver = false;
            _context.next = 3;
            return _kingdomService["default"].getKingdomsCount();

          case 3:
            total_kingdoms = _context.sent;
            _context.next = 6;
            return _kingdomService["default"].getWinnerStats();

          case 6:
            game_stats = _context.sent;
            current_ratio = game_stats.count / total_kingdoms;

            if (!(current_ratio > (0, _rules.rules)().winning_rules.ratio)) {
              _context.next = 18;
              break;
            }

            _context.next = 11;
            return _userService["default"].findById(game_stats.userId);

          case 11:
            winner = _context.sent;

            if (!(winner.username !== "AI-ruler")) {
              _context.next = 18;
              break;
            }

            _context.next = 15;
            return _kingdomService["default"].getFirstPlayer();

          case 15:
            first_player = _context.sent;
            registration_length = Math.floor(Date.now() / 1000) - first_player.user.registeredAt;

            if (registration_length > (0, _rules.rules)().winning_rules.registration_window) {
              gameOver = true;
            }

          case 18:
            //If game is over, send info to user, otherwise continue to endpoint
            if (gameOver) {
              res.send({
                status: "Game over! Winner is: " + winner.username
              });
            } else {
              next();
            }

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function winner_middleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = winner_middleware;
exports["default"] = _default;
//# sourceMappingURL=winner-middleware.js.map