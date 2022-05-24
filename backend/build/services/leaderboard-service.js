"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _leaderboardRepository = _interopRequireDefault(require("../repositories/leaderboard-repository"));

var _kingdomRepository = _interopRequireDefault(require("../repositories/kingdom-repository"));

var _userRepository = _interopRequireDefault(require("../repositories/user-repository"));

var _troopsRules = require("../rules/troops-rules");

var getLeaderboardsByKingdoms = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var buildingsLevelSum, buildingPoints, troopPoints, maxBP, maxTP, leaderboard, index, kingdom, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _leaderboardRepository["default"].getKingdomsBuildingPoints();

          case 2:
            buildingsLevelSum = _context.sent;

            if (!(buildingsLevelSum.length > 0)) {
              _context.next = 30;
              break;
            }

            maxBP = buildingsLevelSum[0].total;
            maxTP = 0;
            leaderboard = [];
            index = 0;

          case 8:
            if (!(index < buildingsLevelSum.length)) {
              _context.next = 24;
              break;
            }

            _context.next = 11;
            return _kingdomRepository["default"].findKingdomById(buildingsLevelSum[index].kingdomId);

          case 11:
            kingdom = _context.sent;
            _context.next = 14;
            return _userRepository["default"].findById(kingdom.userId);

          case 14:
            user = _context.sent;
            buildingPoints = Math.floor(buildingsLevelSum[index].total / maxBP * 50);
            _context.next = 18;
            return getKingdomTroopPoints(kingdom);

          case 18:
            troopPoints = _context.sent;

            if (maxTP < troopPoints) {
              maxTP = troopPoints;
            }

            leaderboard[index] = {
              ruler: user.username,
              kingdom: kingdom.name,
              points: 0,
              buildingPoints: buildingPoints,
              troopPoints: troopPoints
            };

          case 21:
            index++;
            _context.next = 8;
            break;

          case 24:
            _context.next = 26;
            return finalizeTheLeaderboard(leaderboard, maxTP);

          case 26:
            leaderboard = _context.sent;
            return _context.abrupt("return", {
              status: 200,
              leaderboard: leaderboard
            });

          case 30:
            return _context.abrupt("return", {
              status: 400,
              error: 'No leaderboards available!'
            });

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getLeaderboardsByKingdoms() {
    return _ref.apply(this, arguments);
  };
}();

var getLeaderboardsByRulers = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var buildingsLevelSum, buildingPoints, maxBP, maxTP, leaderboard, index, user, userKingdoms, troopPoints, _index;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _leaderboardRepository["default"].getRulerBuildingPoints();

          case 2:
            buildingsLevelSum = _context2.sent;

            if (!(buildingsLevelSum.length > 0)) {
              _context2.next = 37;
              break;
            }

            maxBP = buildingsLevelSum[0].total;
            maxTP = 0;
            leaderboard = [];
            index = 0;

          case 8:
            if (!(index < buildingsLevelSum.length)) {
              _context2.next = 31;
              break;
            }

            _context2.next = 11;
            return _userRepository["default"].findById(buildingsLevelSum[index].userId);

          case 11:
            user = _context2.sent;
            _context2.next = 14;
            return user.getKingdoms();

          case 14:
            userKingdoms = _context2.sent;
            troopPoints = 0;
            buildingPoints = Math.floor(buildingsLevelSum[index].total / maxBP * 50);
            _index = 0;

          case 18:
            if (!(_index < userKingdoms.length)) {
              _context2.next = 26;
              break;
            }

            _context2.t0 = troopPoints;
            _context2.next = 22;
            return getKingdomTroopPoints(userKingdoms[_index]);

          case 22:
            troopPoints = _context2.t0 += _context2.sent;

          case 23:
            _index++;
            _context2.next = 18;
            break;

          case 26:
            if (maxTP < troopPoints) {
              maxTP = troopPoints;
            }

            leaderboard[index] = {
              ruler: user.username,
              points: 0,
              buildingPoints: buildingPoints,
              troopPoints: troopPoints
            };

          case 28:
            index++;
            _context2.next = 8;
            break;

          case 31:
            _context2.next = 33;
            return finalizeTheLeaderboard(leaderboard, maxTP);

          case 33:
            leaderboard = _context2.sent;
            return _context2.abrupt("return", {
              status: 200,
              leaderboard: leaderboard
            });

          case 37:
            return _context2.abrupt("return", {
              status: 400,
              error: 'No leaderboards available!'
            });

          case 38:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getLeaderboardsByRulers() {
    return _ref2.apply(this, arguments);
  };
}();

var getKingdomTroopPoints = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(kingdom) {
    var kingdomTroops, troopPoints, index, unitLevel;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return kingdom.getTroops();

          case 2:
            kingdomTroops = _context3.sent;
            troopPoints = 0;
            index = 0;

          case 5:
            if (!(index < kingdomTroops.length)) {
              _context3.next = 13;
              break;
            }

            _context3.next = 8;
            return kingdomTroops[index].getUnitLevel();

          case 8:
            unitLevel = _context3.sent;
            troopPoints += ((0, _troopsRules.troopRules)(unitLevel.upgradeLevel)[kingdomTroops[index].type].attack + (0, _troopsRules.troopRules)(unitLevel.upgradeLevel)[kingdomTroops[index].type].defence) * kingdomTroops[index].quantity;

          case 10:
            index++;
            _context3.next = 5;
            break;

          case 13:
            return _context3.abrupt("return", troopPoints);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getKingdomTroopPoints(_x) {
    return _ref3.apply(this, arguments);
  };
}();

var finalizeTheLeaderboard = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(leaderboard, maxTP) {
    var j;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            for (j = 0; j < leaderboard.length; j++) {
              leaderboard[j].points = Math.floor(leaderboard[j].buildingPoints + (leaderboard[j].troopPoints / maxTP * 50 || 0));
              delete leaderboard[j].buildingPoints;
              delete leaderboard[j].troopPoints;
            }

            return _context4.abrupt("return", leaderboard.sort(function (a, b) {
              return b.points - a.points;
            }));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function finalizeTheLeaderboard(_x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}();

var _default = {
  getLeaderboardsByKingdoms: getLeaderboardsByKingdoms,
  getLeaderboardsByRulers: getLeaderboardsByRulers
};
exports["default"] = _default;
//# sourceMappingURL=leaderboard-service.js.map