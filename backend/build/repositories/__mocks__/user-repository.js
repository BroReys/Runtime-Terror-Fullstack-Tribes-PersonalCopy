"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var findUserByEmailOrUsername = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(username, email) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(username === 'existingUser' || email === "existingEmail")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", Promise.resolve({
              id: '1',
              username: 'createUserTest',
              email: 'createUserTest@some.exmaple',
              password: '$2b$05$usD89zffT5sdcpFl41LQZO4Ij8TaawVhTGprLQVkFqMYBNtAOYtAgFb6',
              active: false
            }));

          case 4:
            return _context.abrupt("return", Promise.resolve(null));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findUserByEmailOrUsername(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var createUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(possibleUser) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", Promise.resolve({
              id: '1',
              username: 'createUserTest',
              email: 'createUserTest@some.exmaple',
              password: '$2b$05$usD89zffT5sdcpFl41LQZO4Ij8TaawVhTGprLQVkFqMYBNtAOYtAgFb6',
              active: false
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createUser(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var findUserByToken = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(token) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (token) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", Promise.resolve(null));

          case 4:
            return _context3.abrupt("return", Promise.resolve({
              id: '1',
              username: 'createUserTest',
              email: 'createUserTest@some.exmaple',
              password: '$2b$05$usD89zffT5sdcpFl41LQZO4Ij8TaawVhTGprLQVkFqMYBNtAOYtAgFb6',
              active: false,
              registrationToken: "JAhuWXXUBFaloub6SDmVrnYrqwd",
              registrationTokenExpiresAt: Date.now() + 864000000
            }));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findUserByToken(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var updateUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(user) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateUser(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

var findUserByUsername = function findUserByUsername(user) {
  if (user === "MockTester") {
    return {
      id: 1,
      username: "MockTester",
      email: "mock@email.com",
      password: "$2b$05$Y/9Vfy5K0Ssxpo.rKtUFRuUPxgWzC31lQDGXtyzMd/jI.KITq1/Fu",
      active: true
    };
  } else if (user === "MockTesterNotActive") {
    return {
      username: "MockTesterNotActive",
      email: "mock@email.com",
      password: "$2b$05$1E2UND34Fp5dhSpWYsk3POqLuCNF5CTiqnSliProIZ5ztcIMeWld6",
      active: false
    };
  } else if (user === "MockNoPassword") {
    return {
      id: 1,
      username: "MockTesterNoPassword",
      email: "mock@email.com",
      password: "$2b$05$RAx0fKtYe0eOxRO9eO3ZbOSTjn4mqW5Xg/9W7locePSg3PFlKa/HX",
      active: true
    };
  } else if (user === "MockTesterNoKingdom") {
    return {
      id: 2,
      username: "MockTesterNoKingdom",
      email: "mock@email.com",
      password: "$2b$05$1E2UND34Fp5dhSpWYsk3POqLuCNF5CTiqnSliProIZ5ztcIMeWld6",
      active: true
    };
  } else if (user === "MockTesterInvalid") {
    return null;
  } else if (user === "chatUser1") {
    return {
      id: '1',
      username: "chatUser1",
      email: "mock@email.com",
      password: "$2b$05$Y/9Vfy5K0Ssxpo.rKtUFRuUPxgWzC31lQDGXtyzMd/jI.KITq1/Fu",
      active: true
    };
  } else if (user === 'chatUser2') {
    return {
      id: '2',
      username: "chatUser2",
      email: "mock@email.com",
      password: "$2b$05$Y/9Vfy5K0Ssxpo.rKtUFRuUPxgWzC31lQDGXtyzMd/jI.KITq1/Fu",
      active: true
    };
  } else {
    return null;
  }
};

var _default = {
  findUserByEmailOrUsername: findUserByEmailOrUsername,
  createUser: createUser,
  findUserByToken: findUserByToken,
  updateUser: updateUser,
  findUserByUsername: findUserByUsername
};
exports["default"] = _default;
//# sourceMappingURL=user-repository.js.map