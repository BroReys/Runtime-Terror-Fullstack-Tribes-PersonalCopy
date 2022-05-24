"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var hash = function hash(password) {
  var pass = _bcrypt["default"].hashSync(password, 5);

  return pass;
};

var _default = hash;
exports["default"] = _default;
//# sourceMappingURL=hash-password.js.map