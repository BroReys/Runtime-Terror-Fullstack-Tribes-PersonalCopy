"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var generateConfirmationToken = function generateConfirmationToken() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 24; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

var _default = generateConfirmationToken;
exports["default"] = _default;
//# sourceMappingURL=generate-confirmation-token.js.map