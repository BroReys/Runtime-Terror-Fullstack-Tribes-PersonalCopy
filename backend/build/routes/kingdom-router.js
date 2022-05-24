"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _kingdomController = _interopRequireDefault(require("../controllers/kingdom-controller"));

var Kingdom_router = (0, _express.Router)();
Kingdom_router.put('/kingdoms/:id', _kingdomController["default"].updateKingdomName);
Kingdom_router.get('/kingdoms/:id', _kingdomController["default"].getKingdomDetails);
Kingdom_router.get('/kingdoms', _kingdomController["default"].getAllKingdoms);
var _default = Kingdom_router;
exports["default"] = _default;
//# sourceMappingURL=kingdom-router.js.map