"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _message = _interopRequireDefault(require("../../models/chat-models/message"));

var createMessage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(textOfMessage, chat, author) {
    var message;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            message = {
              text: textOfMessage,
              chatId: chat.id,
              author_id: author.id
            };
            _context.next = 3;
            return _message["default"].create(message);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createMessage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  createMessage: createMessage
};
exports["default"] = _default;
//# sourceMappingURL=message-repository.js.map