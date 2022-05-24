"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _settleController = _interopRequireDefault(require("../controllers/settle-controller"));

var SettleRouter = (0, _express.Router)();
SettleRouter.post('/kingdoms/:kingdomId/settle', _settleController["default"].startSettlersPilgrimage);
var _default = SettleRouter;
exports["default"] = _default;
//# sourceMappingURL=settlers-router.js.map