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

var _userService = _interopRequireDefault(require("../services/user-service"));

var storeChat = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var members, subject, textOfMessage, owner, membersResult;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            members = req.body.members;
            subject = req.body.subject;
            textOfMessage = req.body.text;
            _context.next = 5;
            return _userService["default"].findById(req.user.id);

          case 5:
            owner = _context.sent;

            if (!(owner === null)) {
              _context.next = 10;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('User not found!'));
            _context.next = 26;
            break;

          case 10:
            if (!(members === null || members === undefined)) {
              _context.next = 14;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('At least one member must be added to the chat!'));
            _context.next = 26;
            break;

          case 14:
            if (!(subject === null || subject === undefined)) {
              _context.next = 18;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Subject cannot be empty!'));
            _context.next = 26;
            break;

          case 18:
            if (!(textOfMessage === null || textOfMessage === undefined)) {
              _context.next = 22;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Text cannot be empty!'));
            _context.next = 26;
            break;

          case 22:
            _context.next = 24;
            return _chatService["default"].createChat(subject, owner, members, textOfMessage);

          case 24:
            membersResult = _context.sent;
            res.json(membersResult);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function storeChat(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var showChats = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _userService["default"].findById(req.user.id);

          case 2:
            user = _context2.sent;

            if (!(user === null)) {
              _context2.next = 7;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('User not found!'));
            _context2.next = 12;
            break;

          case 7:
            _context2.t0 = res;
            _context2.next = 10;
            return _chatService["default"].findById(user.id);

          case 10:
            _context2.t1 = _context2.sent;

            _context2.t0.json.call(_context2.t0, _context2.t1);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function showChats(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var showChat = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user, chat, chatDTO;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _userService["default"].findById(req.user.id);

          case 2:
            user = _context3.sent;
            _context3.next = 5;
            return _chatService["default"].findById(req.query.id);

          case 5:
            chat = _context3.sent;

            if (!(user === null)) {
              _context3.next = 10;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('User not found!'));
            _context3.next = 18;
            break;

          case 10:
            if (chat) {
              _context3.next = 14;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('Chat not found!'));
            _context3.next = 18;
            break;

          case 14:
            _context3.next = 16;
            return _chatService["default"].getSpecificChatDTO(chat.id, user.id);

          case 16:
            chatDTO = _context3.sent;

            if (chatDTO) {
              res.json(chatDTO);
            } else {
              res.status(403).json((0, _errorMessage["default"])('Chat not found!'));
            }

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function showChat(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  storeChat: storeChat,
  showChats: showChats,
  showChat: showChat
};
exports["default"] = _default;
//# sourceMappingURL=chat-controller.js.map