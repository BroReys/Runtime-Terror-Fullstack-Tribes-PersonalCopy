"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chatRepository = _interopRequireDefault(require("../../repositories/chat-repositories/chat-repository"));

var _chatMemberService = _interopRequireDefault(require("./chat-member-service"));

var _messageService = _interopRequireDefault(require("./message-service"));

var _userService = _interopRequireDefault(require("../user-service"));

var _chatMemberRepository = _interopRequireDefault(require("../../repositories/chat-repositories/chat-member-repository"));

var createChat = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(subjectOfChat, ownerOfChat, members, textOfMessage) {
    var chat, membersResult;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _chatRepository["default"].createChat(subjectOfChat, ownerOfChat);

          case 2:
            chat = _context.sent;
            _context.next = 5;
            return _chatMemberService["default"].createChatMember(chat, ownerOfChat);

          case 5:
            _context.next = 7;
            return _chatMemberService["default"].createMultipleMembers(chat, members);

          case 7:
            membersResult = _context.sent;
            _context.next = 10;
            return _messageService["default"].createMessage(textOfMessage, chat, ownerOfChat);

          case 10:
            return _context.abrupt("return", membersResult);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createChat(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var findById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _chatRepository["default"].findById(id);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findById(_x5) {
    return _ref2.apply(this, arguments);
  };
}();

var getChatDTOs = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userId) {
    var user, chatsFromUser, chatDTOs, chatsFromDB, i, chatDto;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _userService["default"].findById(userId);

          case 2:
            user = _context3.sent;
            _context3.next = 5;
            return user.getChats();

          case 5:
            chatsFromUser = _context3.sent;
            // get chats where he's a chat member
            chatDTOs = [];
            chatsFromDB = [];
            i = 0;

          case 9:
            if (!(i < chatsFromUser.length)) {
              _context3.next = 30;
              break;
            }

            _context3.next = 12;
            return findById(chatsFromUser[i].id);

          case 12:
            chatsFromDB[i] = _context3.sent;
            _context3.t0 = chatsFromDB[i].id;
            _context3.next = 16;
            return getOwnerName(chatsFromDB[i]);

          case 16:
            _context3.t1 = _context3.sent;
            _context3.t2 = chatsFromDB[i].subject;
            _context3.t3 = chatsFromUser[i].chat_members.lastViewed;
            _context3.next = 21;
            return editMembers(chatsFromDB[i]);

          case 21:
            _context3.t4 = _context3.sent;
            _context3.next = 24;
            return editMessages(chatsFromDB[i]);

          case 24:
            _context3.t5 = _context3.sent;
            chatDto = {
              id: _context3.t0,
              chatOwner: _context3.t1,
              subject: _context3.t2,
              lastViewed: _context3.t3,
              members: _context3.t4,
              messages: _context3.t5
            };
            chatDTOs[i] = chatDto;

          case 27:
            i++;
            _context3.next = 9;
            break;

          case 30:
            return _context3.abrupt("return", chatDTOs.sort(function (a) {
              return parseFloat(Date.parse(a.lastViewed) - parseFloat(Date.parse(a.messages[0].createdAt)));
            }));

          case 31:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getChatDTOs(_x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getSpecificChatDTO = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(chatId, userId) {
    var chat, user, specificChat, chatDto;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return findById(chatId);

          case 2:
            chat = _context4.sent;
            _context4.next = 5;
            return _userService["default"].findById(userId);

          case 5:
            user = _context4.sent;
            _context4.next = 8;
            return _chatMemberRepository["default"].findByChatIdAndUserId(chat, user);

          case 8:
            specificChat = _context4.sent;

            if (!(specificChat !== null)) {
              _context4.next = 24;
              break;
            }

            _context4.t0 = chat.id;
            _context4.next = 13;
            return getOwnerName(chat);

          case 13:
            _context4.t1 = _context4.sent;
            _context4.t2 = chat.subject;
            _context4.t3 = specificChat.lastViewed;
            _context4.next = 18;
            return editMembers(chat);

          case 18:
            _context4.t4 = _context4.sent;
            _context4.next = 21;
            return editMessages(chat);

          case 21:
            _context4.t5 = _context4.sent;
            chatDto = {
              id: _context4.t0,
              chatOwner: _context4.t1,
              subject: _context4.t2,
              lastViewed: _context4.t3,
              members: _context4.t4,
              messages: _context4.t5
            };
            return _context4.abrupt("return", chatDto);

          case 24:
            return _context4.abrupt("return", null);

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getSpecificChatDTO(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var editMembers = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(chat) {
    var members, editedMembers, j, member;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return chat.getUsers();

          case 2:
            members = _context5.sent;
            editedMembers = [];
            j = 0;

          case 5:
            if (!(j < members.length)) {
              _context5.next = 16;
              break;
            }

            _context5.t0 = members[j].username;
            _context5.next = 9;
            return getOwnerName(chat);

          case 9:
            _context5.t1 = _context5.sent;

            if (!(_context5.t0 != _context5.t1)) {
              _context5.next = 13;
              break;
            }

            member = {
              id: members[j].id,
              username: members[j].username
            };
            editedMembers[j] = member;

          case 13:
            j++;
            _context5.next = 5;
            break;

          case 16:
            return _context5.abrupt("return", editedMembers.filter(function (element) {
              // filter out null = owner
              return element != null;
            }));

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function editMembers(_x9) {
    return _ref5.apply(this, arguments);
  };
}();

var editMessages = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(chat) {
    var messages, editedMessages, j, author, message;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return chat.getMessages();

          case 2:
            messages = _context6.sent;
            editedMessages = [];
            j = 0;

          case 5:
            if (!(j < messages.length)) {
              _context6.next = 14;
              break;
            }

            _context6.next = 8;
            return messages[j].getAuthor();

          case 8:
            author = _context6.sent;
            message = {
              id: messages[j].id,
              author: author.username,
              text: messages[j].text,
              createdAt: messages[j].createdAt
            };
            editedMessages[j] = message;

          case 11:
            j++;
            _context6.next = 5;
            break;

          case 14:
            return _context6.abrupt("return", editedMessages.sort(function (a, b) {
              return parseFloat( // return sorted messages by newest at the top
              Date.parse(b.createdAt) - parseFloat(Date.parse(a.createdAt)));
            }));

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function editMessages(_x10) {
    return _ref6.apply(this, arguments);
  };
}();

var getOwnerName = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(chat) {
    var owner, ownerUsername;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return chat.getOwner();

          case 2:
            owner = _context7.sent;
            ownerUsername = owner.username;
            return _context7.abrupt("return", ownerUsername);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getOwnerName(_x11) {
    return _ref7.apply(this, arguments);
  };
}(); // get owner username


var _default = {
  createChat: createChat,
  findById: findById,
  getChatDTOs: getChatDTOs,
  getSpecificChatDTO: getSpecificChatDTO
};
exports["default"] = _default;
//# sourceMappingURL=chat-service.js.map