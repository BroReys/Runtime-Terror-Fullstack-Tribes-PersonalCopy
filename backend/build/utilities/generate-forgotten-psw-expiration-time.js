"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var expiresInForgottenPswToken = function expiresInForgottenPswToken() {
  return Math.floor(Date.now() / 1000) + 60 * 60;
};

var _default = expiresInForgottenPswToken;
exports["default"] = _default;
//# sourceMappingURL=generate-forgotten-psw-expiration-time.js.map