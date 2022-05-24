"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chatService = _interopRequireDefault(require("../services/chat-services/chat-service"));

var _errorMessage = _interopRequireDefault(require("../utilities/error-message"));

var _chatMemberService = _interopRequireDefault(require("../services/chat-services/chat-member-service"));

var _userService = _interopRequireDefault(require("../services/user-service"));

var addChatMembers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var members, chatId, chat, owner, membersResult;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            members = req.body.members;
            chatId = req.params.id;
            _context.next = 4;
            return _chatService["default"].findById(chatId);

          case 4:
            chat = _context.sent;
            _context.next = 7;
            return _userService["default"].findById(req.user.id);

          case 7:
            owner = _context.sent;

            if (!(owner === null)) {
              _context.next = 12;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('User not found!'));
            _context.next = 32;
            break;

          case 12:
            if (!(chatId === null || chatId === undefined)) {
              _context.next = 16;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Chat ID is missing!'));
            _context.next = 32;
            break;

          case 16:
            if (!(chat === null)) {
              _context.next = 20;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('Chat not found!'));
            _context.next = 32;
            break;

          case 20:
            if (!(owner.id != chat.owner_id)) {
              _context.next = 24;
              break;
            }

            res.status(401).json((0, _errorMessage["default"])('Only owner of the chat can add members to the chat!'));
            _context.next = 32;
            break;

          case 24:
            if (!(members === null || members === undefined)) {
              _context.next = 28;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('At least one member must be added to the chat!'));
            _context.next = 32;
            break;

          case 28:
            _context.next = 30;
            return _chatMemberService["default"].createMultipleMembers(chat, members);

          case 30:
            membersResult = _context.sent;
            res.json(membersResult);

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addChatMembers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  addChatMembers: addChatMembers
};
exports["default"] = _default;
//# sourceMappingURL=chat-members-controller.js.map