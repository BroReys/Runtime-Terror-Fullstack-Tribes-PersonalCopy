"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _unitLevelController = _interopRequireDefault(require("../controllers/unit-level-controller"));

var Unit_level_router = (0, _express.Router)();
Unit_level_router.put('/kingdoms/:id/troops', _unitLevelController["default"].upgradeTroop);
var _default = Unit_level_router;
exports["default"] = _default;
//# sourceMappingURL=unit-level-router.js.map