"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userService = _interopRequireDefault(require("../services/user-service"));

var _authenticationMiddleware = _interopRequireDefault(require("../middlewares/authentication-middleware"));

var _kingdomService = _interopRequireDefault(require("../services/kingdom-service"));

var create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user, statusOfRegistration;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = req.body;
            _context.next = 3;
            return _userService["default"].createUser(user);

          case 3:
            statusOfRegistration = _context.sent;
            _context.t0 = statusOfRegistration;
            _context.next = _context.t0 === 409 ? 7 : _context.t0 === 422 ? 9 : _context.t0 === 400 ? 11 : _context.t0 === 201 ? 13 : 14;
            break;

          case 7:
            res.status(409).json({
              error: "Username or email already exists!"
            });
            return _context.abrupt("break", 14);

          case 9:
            res.status(422).json({
              error: "Password does not match requirements"
            });
            return _context.abrupt("break", 14);

          case 11:
            res.status(400).json({
              error: "One of the required fields is missing"
            });
            return _context.abrupt("break", 14);

          case 13:
            res.json({
              message: "successfully added user"
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var confirm = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var token, status;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = req.query.activation;
            _context2.next = 3;
            return _userService["default"].setUserToActive(token);

          case 3:
            status = _context2.sent;
            _context2.t0 = status;
            _context2.next = _context2.t0 === "activated" ? 7 : _context2.t0 === "activation_expired" ? 9 : _context2.t0 === "not_found" ? 11 : 12;
            break;

          case 7:
            res.status(200).json({
              success: 'User activated!'
            });
            return _context2.abrupt("break", 12);

          case 9:
            res.status(400).json({
              message: 'You activation link has expired, check your email for a new one.'
            });
            return _context2.abrupt("break", 12);

          case 11:
            res.status(404).json({
              error: 'User not found'
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function confirm(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var identify = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var token, status, payloadUser, userKingdom;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = req.headers['authorization'];
            console.log(token);
            status = _userService["default"].identifyUser(token);
            _context3.t0 = status;
            _context3.next = _context3.t0 === 403 ? 6 : _context3.t0 === 200 ? 8 : 16;
            break;

          case 6:
            res.sendStatus(403);
            return _context3.abrupt("break", 16);

          case 8:
            _context3.next = 10;
            return _authenticationMiddleware["default"].getUserFromPayload(token);

          case 10:
            payloadUser = _context3.sent;
            _context3.next = 13;
            return _kingdomService["default"].findKingdomsByUserId(payloadUser.id);

          case 13:
            userKingdom = _context3.sent;
            res.json({
              username: payloadUser.username,
              kingdom: userKingdom
            });
            return _context3.abrupt("break", 16);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function identify(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var login = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var status, userInDatabase, token;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _userService["default"].loginUser(req.body);

          case 2:
            status = _context4.sent;
            _context4.t0 = status;
            _context4.next = _context4.t0 === 200 ? 6 : _context4.t0 === 400 ? 14 : _context4.t0 === 403 ? 16 : _context4.t0 === 409 ? 18 : _context4.t0 === 404 ? 20 : _context4.t0 === 412 ? 22 : 24;
            break;

          case 6:
            _context4.next = 8;
            return _userService["default"].findByUsername(req.body.username);

          case 8:
            userInDatabase = _context4.sent;
            _context4.next = 11;
            return _authenticationMiddleware["default"].authentication(userInDatabase);

          case 11:
            token = _context4.sent;
            res.header('access_token', token).json({
              token: token,
              message: "user logged in successfully"
            });
            return _context4.abrupt("break", 24);

          case 14:
            res.status(400).json({
              error: "One of the required fields is missing"
            });
            return _context4.abrupt("break", 24);

          case 16:
            res.status(403).json({
              error: "User did not finish registration!"
            });
            return _context4.abrupt("break", 24);

          case 18:
            res.status(409).json({
              error: "Password doesn't match"
            });
            return _context4.abrupt("break", 24);

          case 20:
            res.status(404).json({
              error: "Wrong username"
            });
            return _context4.abrupt("break", 24);

          case 22:
            res.status(412).json({
              error: "No kingdom registered, please register the kingdom first."
            });
            return _context4.abrupt("break", 24);

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function login(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var forgotPassword = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var status;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _userService["default"].forgotPassword(req.body.email);

          case 2:
            status = _context5.sent;
            _context5.t0 = status;
            _context5.next = _context5.t0 === "no_records" ? 6 : _context5.t0 === "ok_token_generated" ? 8 : 10;
            break;

          case 6:
            res.status(400).json({
              error: "No records found!"
            });
            return _context5.abrupt("break", 10);

          case 8:
            res.status(200).json({
              success: "Please check your email address"
            });
            return _context5.abrupt("break", 10);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function forgotPassword(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var resetPassword = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var firstPsw, secondPsw, status;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            firstPsw = req.body.firstPsw;
            secondPsw = req.body.secondPsw;
            _context6.next = 4;
            return _userService["default"].resetPassword(req.query.token, firstPsw, secondPsw);

          case 4:
            status = _context6.sent;
            _context6.t0 = status;
            _context6.next = _context6.t0 === "no_user" ? 8 : _context6.t0 === "expired" ? 10 : _context6.t0 === "no_match" ? 12 : _context6.t0 === "no_psw_provided" ? 14 : _context6.t0 === "old_psw_entered" ? 16 : _context6.t0 === "no_regex_match" ? 18 : _context6.t0 === "ok" ? 20 : 21;
            break;

          case 8:
            res.status(400).json({
              error: "No user"
            });
            return _context6.abrupt("break", 21);

          case 10:
            res.status(400).json({
              error: "Reset link has expired please generate the new one"
            });
            return _context6.abrupt("break", 21);

          case 12:
            res.status(400).json({
              error: "Passwords do not match"
            });
            return _context6.abrupt("break", 21);

          case 14:
            res.status(400).json({
              error: "No passwords provided!"
            });
            return _context6.abrupt("break", 21);

          case 16:
            res.status(400).json({
              error: "You have entered your old password!"
            });
            return _context6.abrupt("break", 21);

          case 18:
            res.status(400).json({
              error: "Password does not meet the requirements!"
            });
            return _context6.abrupt("break", 21);

          case 20:
            res.status(200).json({
              success: "Password changed!"
            });

          case 21:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function resetPassword(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var _default = {
  create: create,
  confirm: confirm,
  login: login,
  identify: identify,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword
};
exports["default"] = _default;
//# sourceMappingURL=user-controller.js.map