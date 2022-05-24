"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var expiresIn = function expiresIn() {
  var result = Math.floor(Date.now() / 1000 + 60 * 60 * 24);
  return result;
};

var _default = expiresIn;
exports["default"] = _default;
//# sourceMappingURL=generate-day-expiration-number.js.map