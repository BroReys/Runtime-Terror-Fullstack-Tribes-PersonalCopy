"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var createChatMember = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(chat, user) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
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

var findByChatIdAndUserId = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(chat, user) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(user == "test")) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", {
              id: 1,
              username: "test",
              email: "mock@email.com",
              password: "$2b$05$Y/9Vfy5K0Ssxpo.rKtUFRuUPxgWzC31lQDGXtyzMd/jI.KITq1/Fu",
              active: true
            });

          case 4:
            return _context2.abrupt("return", null);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findByChatIdAndUserId(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  createChatMember: createChatMember,
  findByChatIdAndUserId: findByChatIdAndUserId
};
exports["default"] = _default;
//# sourceMappingURL=chat-member-repository.js.map