"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _leaderboardController = _interopRequireDefault(require("../controllers/leaderboard-controller"));

var Leaderboard_router = (0, _express.Router)();
Leaderboard_router.get('/leaderboards/kingdoms', _leaderboardController["default"].getKingdomPoints);
Leaderboard_router.get('/leaderboards/rulers', _leaderboardController["default"].getRulerPoints);
var _default = Leaderboard_router;
exports["default"] = _default;
//# sourceMappingURL=leaderboard-router.js.map