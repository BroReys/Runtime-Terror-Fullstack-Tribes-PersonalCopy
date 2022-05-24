"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _messageService = _interopRequireDefault(require("../services/chat-services/message-service"));

var _errorMessage = _interopRequireDefault(require("../utilities/error-message"));

var _chatService = _interopRequireDefault(require("../services/chat-services/chat-service"));

var _chatMemberService = _interopRequireDefault(require("../services/chat-services/chat-member-service"));

var _userService = _interopRequireDefault(require("../services/user-service"));

var addMessage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var textOfMessage, chatId, chat, author;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            textOfMessage = req.body.text;
            chatId = req.params.id;
            _context.next = 4;
            return _chatService["default"].findById(chatId);

          case 4:
            chat = _context.sent;
            _context.next = 7;
            return _userService["default"].findById(req.user.id);

          case 7:
            author = _context.sent;

            if (!(author === null)) {
              _context.next = 12;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('User not found!'));
            _context.next = 34;
            break;

          case 12:
            if (!(chatId === null || chatId === undefined)) {
              _context.next = 16;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Chat ID is missing!'));
            _context.next = 34;
            break;

          case 16:
            if (!(chat === null)) {
              _context.next = 20;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('Chat not found!'));
            _context.next = 34;
            break;

          case 20:
            _context.next = 22;
            return _chatMemberService["default"].doMembersAlreadyExists(chat, author.username);

          case 22:
            _context.t0 = _context.sent;

            if (!(_context.t0 === false)) {
              _context.next = 27;
              break;
            }

            res.status(403).json((0, _errorMessage["default"])('Only member of the chat can add messages!'));
            _context.next = 34;
            break;

          case 27:
            if (!(textOfMessage === null || textOfMessage === undefined)) {
              _context.next = 31;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Text cannot be empty!'));
            _context.next = 34;
            break;

          case 31:
            _context.next = 33;
            return _messageService["default"].createMessage(textOfMessage, chat, author);

          case 33:
            res.sendStatus(200);

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addMessage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  addMessage: addMessage
};
exports["default"] = _default;
//# sourceMappingURL=message-controller.js.map