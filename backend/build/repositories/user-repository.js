"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user"));

var _sequelize = require("sequelize");

var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(possibleUser) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].create(possibleUser);

          case 2:
            user = _context.sent;
            return _context.abrupt("return", user);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var findUserByEmailOrUsername = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(username, email) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [{
                username: username
              }, {
                email: email
              }])
            });

          case 2:
            user = _context2.sent;
            return _context2.abrupt("return", user);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findUserByEmailOrUsername(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var findUserByToken = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(token) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(token !== null)) {
              _context3.next = 7;
              break;
            }

            _context3.next = 3;
            return _user["default"].findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [{
                registrationToken: token
              }, {
                forgottenPasswordToken: token
              }])
            });

          case 3:
            user = _context3.sent;
            return _context3.abrupt("return", user);

          case 7:
            return _context3.abrupt("return", null);

          case 8:
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
            _context4.next = 2;
            return _user["default"].update(user, {
              where: {
                id: user.id
              }
            });

          case 2:
            _context4.next = 4;
            return user.save();

          case 4:
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

var findUserByUsername = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(username) {
    var user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _user["default"].findOne({
              where: {
                username: username
              }
            });

          case 2:
            user = _context5.sent;
            return _context5.abrupt("return", user);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function findUserByUsername(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

var findById = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _user["default"].findOne({
              where: {
                id: id
              }
            });

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function findById(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

var findUserByEmail = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(email) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _user["default"].findOne({
              where: {
                email: email
              }
            });

          case 2:
            return _context7.abrupt("return", _context7.sent);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function findUserByEmail(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = {
  createUser: createUser,
  findUserByEmailOrUsername: findUserByEmailOrUsername,
  findUserByToken: findUserByToken,
  updateUser: updateUser,
  findUserByUsername: findUserByUsername,
  findById: findById,
  findUserByEmail: findUserByEmail
};
exports["default"] = _default;
//# sourceMappingURL=user-repository.js.map