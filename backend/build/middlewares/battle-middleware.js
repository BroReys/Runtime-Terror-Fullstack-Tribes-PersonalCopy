"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _battleService = _interopRequireDefault(require("../services/battle-service"));

var _resourcesService = _interopRequireDefault(require("../services/resources-service"));

var battleMiddleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var finishedBattles, unfinishedBattles;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _battleService["default"].findAllFinished();

          case 2:
            finishedBattles = _context.sent;
            _context.next = 5;
            return _battleService["default"].findAllUnfinished();

          case 5:
            unfinishedBattles = _context.sent;
            _context.next = 8;
            return startBattle(unfinishedBattles);

          case 8:
            _context.next = 10;
            return returnTroopsToKingdom(finishedBattles);

          case 10:
            next();

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function battleMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var startBattle = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(battles) {
    var i, currentTime, timeDiff, attackingKingdom, defendingKingdom;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!battles) {
              _context2.next = 37;
              break;
            }

            i = 0;

          case 2:
            if (!(i < battles.length)) {
              _context2.next = 37;
              break;
            }

            currentTime = Math.floor(Date.now() / 1000);
            timeDiff = Math.floor(battles[i].timeOfArrival - currentTime);

            if (!(timeDiff > 0)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("continue", 34);

          case 7:
            _context2.next = 9;
            return battles[i].getAttackingKingdom();

          case 9:
            attackingKingdom = _context2.sent;
            _context2.next = 12;
            return battles[i].getDefendingKingdom();

          case 12:
            defendingKingdom = _context2.sent;
            _context2.prev = 13;
            _context2.next = 16;
            return _resourcesService["default"].updateResourcesByKingdomId(attackingKingdom.id);

          case 16:
            _context2.next = 18;
            return _resourcesService["default"].updateResourcesByKingdomId(defendingKingdom.id);

          case 18:
            _context2.next = 20;
            return _battleService["default"].startBattle(battles[i]);

          case 20:
            _context2.next = 34;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](13);
            battles[i].isFinished = true;
            _context2.prev = 25;
            _context2.next = 28;
            return _battleService["default"].returnTroopsToKingdom(battles[i]);

          case 28:
            _context2.next = 32;
            break;

          case 30:
            _context2.prev = 30;
            _context2.t1 = _context2["catch"](25);

          case 32:
            _context2.next = 34;
            return battles[i].save();

          case 34:
            i++;
            _context2.next = 2;
            break;

          case 37:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[13, 22], [25, 30]]);
  }));

  return function startBattle(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

var returnTroopsToKingdom = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(battles) {
    var i, currentTime, timeDiff;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!battles) {
              _context3.next = 16;
              break;
            }

            i = 0;

          case 2:
            if (!(i < battles.length)) {
              _context3.next = 16;
              break;
            }

            _context3.next = 5;
            return areTroopsStillInBattle(battles[i]);

          case 5:
            if (_context3.sent) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("continue", 13);

          case 7:
            currentTime = Math.floor(Date.now() / 1000);
            timeDiff = Math.floor(battles[i].timeOfComeback - currentTime);

            if (!(timeDiff > 0)) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("continue", 13);

          case 11:
            _context3.next = 13;
            return _battleService["default"].returnTroopsToKingdom(battles[i]);

          case 13:
            i++;
            _context3.next = 2;
            break;

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function returnTroopsToKingdom(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

var areTroopsStillInBattle = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(battle) {
    var areTroopsStillInBattle, troopsInBattle, j;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            areTroopsStillInBattle = false;
            _context4.prev = 1;
            _context4.next = 4;
            return battle.getAttackerTroopsToBattle();

          case 4:
            troopsInBattle = _context4.sent;

            if (!(troopsInBattle.length > 0)) {
              _context4.next = 14;
              break;
            }

            j = 0;

          case 7:
            if (!(j < troopsInBattle.length)) {
              _context4.next = 14;
              break;
            }

            if (!(troopsInBattle[j].quantity > 0)) {
              _context4.next = 11;
              break;
            }

            areTroopsStillInBattle = true;
            return _context4.abrupt("return", areTroopsStillInBattle);

          case 11:
            j++;
            _context4.next = 7;
            break;

          case 14:
            _context4.next = 19;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](1);
            areTroopsStillInBattle = false;

          case 19:
            return _context4.abrupt("return", areTroopsStillInBattle);

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 16]]);
  }));

  return function areTroopsStillInBattle(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

var _default = battleMiddleware;
exports["default"] = _default;
//# sourceMappingURL=battle-middleware.js.map