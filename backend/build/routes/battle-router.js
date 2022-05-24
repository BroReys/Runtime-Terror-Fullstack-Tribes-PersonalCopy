"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _battleController = _interopRequireDefault(require("../controllers/battle-controller"));

var BattleRouter = (0, _express.Router)();
BattleRouter.post('/kingdoms/:kingdomId/battles', _battleController["default"].storeBattle);
BattleRouter.get('/kingdoms/:kingdomId/battles/:battleId', _battleController["default"].showBattleReport);
BattleRouter.get('/kingdoms/:kingdomId/battles', _battleController["default"].showAllBattles);
BattleRouter.post('/kingdoms/:kingdomId/reports', _battleController["default"].getLatestReport);
var _default = BattleRouter;
exports["default"] = _default;
//# sourceMappingURL=battle-router.js.map