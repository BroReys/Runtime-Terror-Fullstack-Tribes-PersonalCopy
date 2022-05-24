"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _leaderboardService = _interopRequireDefault(require("../services/leaderboard-service"));

var _errorMessage = _interopRequireDefault(require("../utilities/error-message"));

var getKingdomPoints = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _yield$LeaderboardSer, status, error, leaderboard;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _leaderboardService["default"].getLeaderboardsByKingdoms();

          case 2:
            _yield$LeaderboardSer = _context.sent;
            status = _yield$LeaderboardSer.status;
            error = _yield$LeaderboardSer.error;
            leaderboard = _yield$LeaderboardSer.leaderboard;

            if (!error) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(status).json((0, _errorMessage["default"])(error)));

          case 10:
            return _context.abrupt("return", res.status(status).json(leaderboard));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getKingdomPoints(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getRulerPoints = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _yield$LeaderboardSer2, status, error, leaderboard;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _leaderboardService["default"].getLeaderboardsByRulers();

          case 2:
            _yield$LeaderboardSer2 = _context2.sent;
            status = _yield$LeaderboardSer2.status;
            error = _yield$LeaderboardSer2.error;
            leaderboard = _yield$LeaderboardSer2.leaderboard;

            if (!error) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(status).json((0, _errorMessage["default"])(error)));

          case 10:
            return _context2.abrupt("return", res.status(status).json(leaderboard));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getRulerPoints(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  getKingdomPoints: getKingdomPoints,
  getRulerPoints: getRulerPoints
};
exports["default"] = _default;
//# sourceMappingURL=leaderboard-controller.js.map