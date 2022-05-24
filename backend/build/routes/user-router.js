"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = _interopRequireDefault(require("../controllers/user-controller"));

var _kingdomController = _interopRequireDefault(require("../controllers/kingdom-controller"));

var User_router = (0, _express.Router)();
User_router.post('/registration', _userController["default"].create);
User_router.get('/registration/confirmation', _userController["default"].confirm);
User_router.post('/login', _userController["default"].login);
User_router.get('/identify', _userController["default"].identify);
User_router.post('/forgotten-password', _userController["default"].forgotPassword);
User_router.put('/forgotten-password/reset', _userController["default"].resetPassword);
User_router.post('/register/kingdom', _kingdomController["default"].create);
var _default = User_router;
exports["default"] = _default;
//# sourceMappingURL=user-router.js.map