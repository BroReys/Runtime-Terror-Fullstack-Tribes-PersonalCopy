"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userService = _interopRequireDefault(require("../services/user-service"));

var _bandits = _interopRequireDefault(require("../utilities/bandits"));

var _kingdomService = _interopRequireDefault(require("../services/kingdom-service"));

var _aiRules = require("../rules/ai-rules");

var banditsMiddleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(res, req, next) {
    var aiRuler, kingdoms, banditsKingdoms, date, killTime, i, reloadedKingdoms, firstPlayer, timeDiff;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _userService["default"].findByUsername('AI-ruler');

          case 2:
            aiRuler = _context.sent;
            _context.next = 5;
            return aiRuler.getKingdoms();

          case 5:
            kingdoms = _context.sent;
            kingdoms = kingdoms.filter(function (kingdom) {
              return kingdom.deletedAt === null;
            });
            banditsKingdoms = kingdoms.filter(function (kingdom) {
              return kingdom.name.startsWith('Bandits');
            });
            date = new Date(new Date().setHours(23, 59, 0, 0));
            killTime = Math.floor(date / 1000);

            if (!banditsKingdoms) {
              _context.next = 24;
              break;
            }

            i = 0;

          case 12:
            if (!(i < banditsKingdoms.length)) {
              _context.next = 24;
              break;
            }

            if (!(Date.now() / 1000 >= killTime)) {
              _context.next = 21;
              break;
            }

            banditsKingdoms[i].deletedAt = Date.now() / 1000;
            banditsKingdoms[i].coordinateX = null;
            banditsKingdoms[i].coordinateY = null;
            _context.next = 19;
            return banditsKingdoms[i].save();

          case 19:
            _context.next = 21;
            return _bandits["default"].destroyBandits(banditsKingdoms[i].id);

          case 21:
            i++;
            _context.next = 12;
            break;

          case 24:
            _context.next = 26;
            return aiRuler.getKingdoms();

          case 26:
            reloadedKingdoms = _context.sent;
            reloadedKingdoms = reloadedKingdoms.filter(function (kingdom) {
              return kingdom.deletedAt === null;
            });
            reloadedKingdoms = reloadedKingdoms.filter(function (kingdom) {
              return kingdom.name.startsWith('Bandits');
            });

            if (!(reloadedKingdoms.length === 0)) {
              _context.next = 37;
              break;
            }

            _context.next = 32;
            return _kingdomService["default"].getFirstPlayer();

          case 32:
            firstPlayer = _context.sent;
            timeDiff = Math.floor((Math.floor(Date.now() / 1000) - firstPlayer.registeredAt) / 86400);
            timeDiff = timeDiff > (0, _aiRules.aiRules)().maxDays ? (0, _aiRules.aiRules)().maxDays : timeDiff;
            _context.next = 37;
            return _bandits["default"].createBandits(timeDiff);

          case 37:
            next();

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function banditsMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = banditsMiddleware;
exports["default"] = _default;
//# sourceMappingURL=bandits-middleware.js.map