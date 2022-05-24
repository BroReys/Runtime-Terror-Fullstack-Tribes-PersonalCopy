"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("dotenv/config");

var _userRepository = _interopRequireDefault(require("../repositories/user-repository"));

// if login passes then authenticate -> returns token
var authentication = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
    var privateKey;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(user.username === undefined || user.password === undefined)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", null);

          case 2:
            privateKey = process.env.ACCESS_TOKEN_SECRET;
            _context.next = 5;
            return _jsonwebtoken["default"].sign({
              id: user.id,
              username: user.username
            }, privateKey, {
              expiresIn: "2h"
            });

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function authentication(_x) {
    return _ref.apply(this, arguments);
  };
}(); //verifies the token


var authorization = function authorization(authToken) {
  if (authToken === null || authToken === undefined) {
    return 403;
  }

  var token = authToken.split(' ')[1];

  try {
    _jsonwebtoken["default"].verify(token, process.env.ACCESS_TOKEN_SECRET);

    return 200;
  } catch (_unused) {
    return 403;
  }
};

var getUserFromPayload = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(token) {
    var tokenPayloadInfo, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            tokenPayloadInfo = token.split(".");
            user = JSON.parse(atob(tokenPayloadInfo[1]));
            _context2.next = 5;
            return _userRepository["default"].findById(user.id);

          case 5:
            return _context2.abrupt("return", _context2.sent);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.error("Token parameter in method getUserFromPayload was udefined or null!");
            return _context2.abrupt("return", null);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function getUserFromPayload(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  authentication: authentication,
  authorization: authorization,
  getUserFromPayload: getUserFromPayload
};
exports["default"] = _default;
//# sourceMappingURL=authentication-middleware.js.map