"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chat = _interopRequireDefault(require("../../models/chat-models/chat"));

var createChat = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(subjectOfChat, ownerOfChat) {
    var chat, savedChat;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            chat = {
              subject: subjectOfChat,
              owner_id: ownerOfChat.id
            };
            _context.next = 3;
            return _chat["default"].create(chat);

          case 3:
            savedChat = _context.sent;
            return _context.abrupt("return", savedChat);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createChat(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var findById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var chat;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _chat["default"].findOne({
              where: {
                id: id
              }
            });

          case 2:
            chat = _context2.sent;
            return _context2.abrupt("return", chat);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findById(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  createChat: createChat,
  findById: findById
};
exports["default"] = _default;
//# sourceMappingURL=chat-repository.js.map