"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _kingdomRepository = _interopRequireDefault(require("../repositories/kingdom-repository"));

var _userService = _interopRequireDefault(require("../services/user-service"));

var _battleService = _interopRequireDefault(require("../services/battle-service"));

var _errorMessage = _interopRequireDefault(require("../utilities/error-message"));

var _troopsRules = require("../rules/troops-rules");

var storeBattle = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var attacker, attackingKingdomId, attackingKingdom, defendingKingdomId, defendingKingdom, ruler, defender, troops, battle;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _userService["default"].findById(req.user.id);

          case 2:
            attacker = _context.sent;
            attackingKingdomId = req.params.kingdomId;
            _context.next = 6;
            return _kingdomRepository["default"].findKingdomById(attackingKingdomId);

          case 6:
            attackingKingdom = _context.sent;
            defendingKingdomId = req.body.target ? req.body.target.kingdomId : null;
            _context.next = 10;
            return _kingdomRepository["default"].findKingdomById(defendingKingdomId);

          case 10:
            defendingKingdom = _context.sent;
            ruler = req.body.target ? req.body.target.ruler : null;
            _context.next = 14;
            return _userService["default"].findByUsername(ruler);

          case 14:
            defender = _context.sent;
            troops = req.body.troops;

            if (!(attacker === null)) {
              _context.next = 20;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('User not found!'));
            _context.next = 78;
            break;

          case 20:
            if (!(attackingKingdom === null)) {
              _context.next = 24;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('Kingdom not found!'));
            _context.next = 78;
            break;

          case 24:
            if (!(attacker.id !== attackingKingdom.userId)) {
              _context.next = 28;
              break;
            }

            res.status(403).json((0, _errorMessage["default"])('Attacker must be ruler of the kingdom!'));
            _context.next = 78;
            break;

          case 28:
            if (!(defendingKingdomId === null || defendingKingdomId === undefined)) {
              _context.next = 32;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Target ID must be defined!'));
            _context.next = 78;
            break;

          case 32:
            if (!(defendingKingdom === null)) {
              _context.next = 36;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('Target not found!'));
            _context.next = 78;
            break;

          case 36:
            if (!(attackingKingdomId == defendingKingdomId)) {
              _context.next = 40;
              break;
            }

            res.status(403).json((0, _errorMessage["default"])('Attacking own kingdom is forbidden!'));
            _context.next = 78;
            break;

          case 40:
            if (!(ruler === null || ruler == undefined)) {
              _context.next = 44;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Ruler must be defined!'));
            _context.next = 78;
            break;

          case 44:
            if (!(defender === null)) {
              _context.next = 48;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('Ruler not found!'));
            _context.next = 78;
            break;

          case 48:
            if (!(troops === null || troops === undefined)) {
              _context.next = 52;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Troops must be defined!'));
            _context.next = 78;
            break;

          case 52:
            if (doTroopsHaveType(troops)) {
              _context.next = 56;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Troops type must be defined!'));
            _context.next = 78;
            break;

          case 56:
            if (doesTroopTypeMatchRules(troops)) {
              _context.next = 60;
              break;
            }

            res.status(403).json((0, _errorMessage["default"])('Type of troops must match one of the allowed types!'));
            _context.next = 78;
            break;

          case 60:
            if (isTroopQuantitySpecified(troops)) {
              _context.next = 64;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Quantity of troops must be specified!'));
            _context.next = 78;
            break;

          case 64:
            if (isTroopQuantityGreaterThanZero(troops)) {
              _context.next = 68;
              break;
            }

            res.status(403).json((0, _errorMessage["default"])('Quantity of troops must be greater than zero!'));
            _context.next = 78;
            break;

          case 68:
            _context.next = 70;
            return doesAttackerHaveEnoughTroops(attackingKingdom, troops);

          case 70:
            if (_context.sent) {
              _context.next = 74;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Not enough troops in kingdom!'));
            _context.next = 78;
            break;

          case 74:
            _context.next = 76;
            return _battleService["default"].initiateBattle(attacker, defender, attackingKingdom, defendingKingdom, troops);

          case 76:
            battle = _context.sent;
            res.json(battle);

          case 78:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function storeBattle(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var showBattleReport = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user, kingdomId, kingdom, battleId, battle;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _userService["default"].findById(req.user.id);

          case 2:
            user = _context2.sent;
            kingdomId = req.params.kingdomId;
            _context2.next = 6;
            return _kingdomRepository["default"].findKingdomById(kingdomId);

          case 6:
            kingdom = _context2.sent;
            battleId = req.params.battleId;
            _context2.next = 10;
            return _battleService["default"].findById(battleId);

          case 10:
            battle = _context2.sent;

            if (!(user === null)) {
              _context2.next = 15;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('User not found!'));
            _context2.next = 42;
            break;

          case 15:
            if (!(kingdom === null)) {
              _context2.next = 19;
              break;
            }

            res.status(403).json((0, _errorMessage["default"])('Kingdom not found!'));
            _context2.next = 42;
            break;

          case 19:
            if (!(user.id !== kingdom.userId)) {
              _context2.next = 23;
              break;
            }

            res.status(403).json((0, _errorMessage["default"])('User must be ruler of the kingdom!'));
            _context2.next = 42;
            break;

          case 23:
            if (!(battleId === undefined || battleId === null)) {
              _context2.next = 27;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Battle ID must be specified!'));
            _context2.next = 42;
            break;

          case 27:
            if (!(battle === null)) {
              _context2.next = 31;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('Battle not found!'));
            _context2.next = 42;
            break;

          case 31:
            _context2.next = 33;
            return isUserPatOfBattle(battle, user);

          case 33:
            if (_context2.sent) {
              _context2.next = 37;
              break;
            }

            res.status(403).json((0, _errorMessage["default"])('User not part of the battle!'));
            _context2.next = 42;
            break;

          case 37:
            _context2.t0 = res;
            _context2.next = 40;
            return _battleService["default"].getBattleReport(battle, user);

          case 40:
            _context2.t1 = _context2.sent;

            _context2.t0.json.call(_context2.t0, _context2.t1);

          case 42:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function showBattleReport(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var showAllBattles = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user, kingdomId, kingdom;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _userService["default"].findById(req.user.id);

          case 2:
            user = _context3.sent;
            kingdomId = req.params.kingdomId;
            _context3.next = 6;
            return _kingdomRepository["default"].findKingdomById(kingdomId);

          case 6:
            kingdom = _context3.sent;

            if (!(user === null)) {
              _context3.next = 11;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('User not found!'));
            _context3.next = 20;
            break;

          case 11:
            if (!(kingdom === null)) {
              _context3.next = 15;
              break;
            }

            res.status(403).json((0, _errorMessage["default"])('Kingdom not found'));
            _context3.next = 20;
            break;

          case 15:
            _context3.t0 = res;
            _context3.next = 18;
            return _battleService["default"].showAllBattlesAsAttackingAndDefendingKingdom(kingdomId);

          case 18:
            _context3.t1 = _context3.sent;

            _context3.t0.json.call(_context3.t0, _context3.t1);

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function showAllBattles(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getLatestReport = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var attackingKingdomId, defendingKingdomId, attackingKingdom, defendingKingdom, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            attackingKingdomId = req.params.kingdomId;
            defendingKingdomId = req.body.defendingKingdom;
            _context4.next = 4;
            return _kingdomRepository["default"].findKingdomById(attackingKingdomId);

          case 4:
            attackingKingdom = _context4.sent;
            _context4.next = 7;
            return _kingdomRepository["default"].findKingdomById(defendingKingdomId);

          case 7:
            defendingKingdom = _context4.sent;
            _context4.next = 10;
            return _userService["default"].findById(req.user.id);

          case 10:
            user = _context4.sent;

            if (!(user === null)) {
              _context4.next = 15;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('User not found!'));
            _context4.next = 36;
            break;

          case 15:
            if (attackingKingdomId) {
              _context4.next = 19;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Attacking kingdom must be defined!'));
            _context4.next = 36;
            break;

          case 19:
            if (attackingKingdom) {
              _context4.next = 23;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('Kingdom not found!'));
            _context4.next = 36;
            break;

          case 23:
            if (defendingKingdomId) {
              _context4.next = 27;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Defending kingdom must be defined!'));
            _context4.next = 36;
            break;

          case 27:
            if (defendingKingdom) {
              _context4.next = 31;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('Kingdom not found!'));
            _context4.next = 36;
            break;

          case 31:
            _context4.t0 = res;
            _context4.next = 34;
            return _battleService["default"].getLatestReport(attackingKingdomId, defendingKingdomId);

          case 34:
            _context4.t1 = _context4.sent;

            _context4.t0.json.call(_context4.t0, _context4.t1);

          case 36:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getLatestReport(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); // -------  HELPER FUNCTIONS ----------


var isUserPatOfBattle = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(battle, user) {
    var attacker, defender;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return battle.getAttacker();

          case 2:
            attacker = _context5.sent;
            _context5.next = 5;
            return battle.getDefender();

          case 5:
            defender = _context5.sent;
            return _context5.abrupt("return", attacker.id !== user.id || defender.id !== user.id);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function isUserPatOfBattle(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var doesAttackerHaveEnoughTroops = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(attackingKingdom, troopsToBattle) {
    var troops, doesAttackerHaveEnoughTroops, i, j;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return attackingKingdom.getTroops();

          case 2:
            troops = _context6.sent;
            doesAttackerHaveEnoughTroops = true;
            i = 0;

          case 5:
            if (!(i < troopsToBattle.length)) {
              _context6.next = 18;
              break;
            }

            j = 0;

          case 7:
            if (!(j < troops.length)) {
              _context6.next = 15;
              break;
            }

            if (!(troopsToBattle[i].type === troops[j].type)) {
              _context6.next = 12;
              break;
            }

            if (!(troopsToBattle[i].quantity > troops[j].quantity)) {
              _context6.next = 12;
              break;
            }

            doesAttackerHaveEnoughTroops = false;
            return _context6.abrupt("return", doesAttackerHaveEnoughTroops);

          case 12:
            j++;
            _context6.next = 7;
            break;

          case 15:
            i++;
            _context6.next = 5;
            break;

          case 18:
            return _context6.abrupt("return", doesAttackerHaveEnoughTroops);

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function doesAttackerHaveEnoughTroops(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var doTroopsHaveType = function doTroopsHaveType(troops) {
  var doTroopsHaveType = true;

  for (var i = 0; i < troops.length; i++) {
    if (troops[i].type === null || troops[i].type === undefined) {
      doTroopsHaveType = false;
      return doTroopsHaveType;
    }
  }

  return doTroopsHaveType;
};

var doesTroopTypeMatchRules = function doesTroopTypeMatchRules(troops) {
  var troopsTypes = (0, _troopsRules.troopRules)(null).type;
  var countMatches = 0;

  for (var i = 0; i < troops.length; i++) {
    for (var j = 0; j < troopsTypes.length; j++) {
      if (troops[i].type === troopsTypes[j]) {
        countMatches++;
      }
    }
  }

  return countMatches === troops.length;
};

var isTroopQuantitySpecified = function isTroopQuantitySpecified(troops) {
  var isTroopQuantitySpecified = true;

  for (var i = 0; i < troops.length; i++) {
    if (troops[i].quantity === null || troops[i].quantity === undefined) {
      isTroopQuantitySpecified = false;
      return isTroopQuantitySpecified;
    }
  }

  return isTroopQuantitySpecified;
};

var isTroopQuantityGreaterThanZero = function isTroopQuantityGreaterThanZero(troops) {
  var isTroopQuantityGreaterThanZero = true;

  for (var i = 0; i < troops.length; i++) {
    if (troops[i].quantity <= 0) {
      isTroopQuantityGreaterThanZero = false;
      return isTroopQuantityGreaterThanZero;
    }
  }

  return isTroopQuantityGreaterThanZero;
};

var _default = {
  storeBattle: storeBattle,
  showBattleReport: showBattleReport,
  showAllBattles: showAllBattles,
  getLatestReport: getLatestReport
};
exports["default"] = _default;
//# sourceMappingURL=battle-controller.js.map