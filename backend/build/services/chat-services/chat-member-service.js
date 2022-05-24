"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chatMemberRepository = _interopRequireDefault(require("../../repositories/chat-repositories/chat-member-repository"));

var _userService = _interopRequireDefault(require("../user-service"));

var createChatMember = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(chat, user) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _chatMemberRepository["default"].createChatMember(chat, user);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createChatMember(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var createMultipleMembers = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(chat, members) {
    var addedMembers, notAddedMembers, i, user, _user;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            addedMembers = [];
            notAddedMembers = [];

            if (!Array.isArray(members)) {
              _context2.next = 26;
              break;
            }

            i = 0;

          case 4:
            if (!(i < members.length)) {
              _context2.next = 24;
              break;
            }

            _context2.next = 7;
            return _userService["default"].findByUsername(members[i]);

          case 7:
            user = _context2.sent;
            _context2.t0 = user != null;

            if (!_context2.t0) {
              _context2.next = 14;
              break;
            }

            _context2.next = 12;
            return doMembersAlreadyExists(chat, user.username);

          case 12:
            _context2.t1 = _context2.sent;
            _context2.t0 = _context2.t1 === false;

          case 14:
            if (!_context2.t0) {
              _context2.next = 20;
              break;
            }

            _context2.next = 17;
            return _chatMemberRepository["default"].createChatMember(chat, user);

          case 17:
            addedMembers[i] = user.username;
            _context2.next = 21;
            break;

          case 20:
            notAddedMembers[i] = members[i];

          case 21:
            i++;
            _context2.next = 4;
            break;

          case 24:
            _context2.next = 42;
            break;

          case 26:
            _context2.next = 28;
            return _userService["default"].findByUsername(members);

          case 28:
            _user = _context2.sent;
            _context2.t2 = _user != null;

            if (!_context2.t2) {
              _context2.next = 35;
              break;
            }

            _context2.next = 33;
            return doMembersAlreadyExists(chat, members);

          case 33:
            _context2.t3 = _context2.sent;
            _context2.t2 = _context2.t3 === false;

          case 35:
            if (!_context2.t2) {
              _context2.next = 41;
              break;
            }

            _context2.next = 38;
            return createChatMember(chat, _user);

          case 38:
            addedMembers[0] = _user.username;
            _context2.next = 42;
            break;

          case 41:
            notAddedMembers[0] = members[0];

          case 42:
            return _context2.abrupt("return", {
              addedMembers: addedMembers.filter(function (element) {
                return element != null;
              }),
              notAddedMembers: notAddedMembers.filter(function (element) {
                return element != null;
              })
            });

          case 43:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createMultipleMembers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var doMembersAlreadyExists = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(chat, members) {
    var isAlreadyMember, i, user, chatMember, _user2, _chatMember;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!Array.isArray(members)) {
              _context3.next = 20;
              break;
            }

            i = 0;

          case 2:
            if (!(i < members.length)) {
              _context3.next = 18;
              break;
            }

            _context3.next = 5;
            return _userService["default"].findByUsername(members[i]);

          case 5:
            user = _context3.sent;

            if (!(user != null)) {
              _context3.next = 15;
              break;
            }

            _context3.next = 9;
            return _chatMemberRepository["default"].findByChatIdAndUserId(chat, user);

          case 9:
            chatMember = _context3.sent;

            if (!(chatMember == null || chatMember === undefined)) {
              _context3.next = 14;
              break;
            }

            return _context3.abrupt("return", false);

          case 14:
            isAlreadyMember = true;

          case 15:
            i++;
            _context3.next = 2;
            break;

          case 18:
            _context3.next = 32;
            break;

          case 20:
            _context3.next = 22;
            return _userService["default"].findByUsername(members);

          case 22:
            _user2 = _context3.sent;

            if (!(_user2 != null)) {
              _context3.next = 32;
              break;
            }

            _context3.next = 26;
            return _chatMemberRepository["default"].findByChatIdAndUserId(chat, _user2);

          case 26:
            _chatMember = _context3.sent;

            if (!(_chatMember == null || _chatMember == undefined)) {
              _context3.next = 31;
              break;
            }

            return _context3.abrupt("return", false);

          case 31:
            isAlreadyMember = true;

          case 32:
            return _context3.abrupt("return", isAlreadyMember);

          case 33:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function doMembersAlreadyExists(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  createChatMember: createChatMember,
  createMultipleMembers: createMultipleMembers,
  doMembersAlreadyExists: doMembersAlreadyExists
};
exports["default"] = _default;
//# sourceMappingURL=chat-member-service.js.map