"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userRepository = _interopRequireDefault(require("../repositories/user-repository"));

var _hashPassword = _interopRequireDefault(require("../utilities/hash-password"));

var _mailSender = _interopRequireDefault(require("../utilities/mail-sender"));

var _generateConfirmationToken = _interopRequireDefault(require("../utilities/generate-confirmation-token"));

var _generateDayExpirationNumber = _interopRequireDefault(require("../utilities/generate-day-expiration-number"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _authenticationMiddleware = _interopRequireDefault(require("../middlewares/authentication-middleware"));

var _kingdomRepository = _interopRequireDefault(require("../repositories/kingdom-repository"));

var _generateForgottenPswToken = _interopRequireDefault(require("../utilities/generate-forgotten-psw-token"));

var _generateForgottenPswExpirationTime = _interopRequireDefault(require("../utilities/generate-forgotten-psw-expiration-time"));

var _mailSenderForgottenPsw = _interopRequireDefault(require("../utilities/mail-sender-forgotten-psw"));

var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(possibleUser) {
    var status, userInDatabase, regex, userToDatabase;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!possibleUser.username || !possibleUser.email || !possibleUser.password)) {
              _context.next = 4;
              break;
            }

            status = 400;
            _context.next = 24;
            break;

          case 4:
            _context.next = 6;
            return _userRepository["default"].findUserByEmailOrUsername(possibleUser.username, possibleUser.email);

          case 6:
            userInDatabase = _context.sent;
            regex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";

            if (!(userInDatabase == null)) {
              _context.next = 23;
              break;
            }

            if (possibleUser.password.match(regex)) {
              _context.next = 13;
              break;
            }

            status = 422;
            _context.next = 21;
            break;

          case 13:
            _context.next = 15;
            return (0, _hashPassword["default"])(possibleUser.password);

          case 15:
            possibleUser.password = _context.sent;
            _context.next = 18;
            return _userRepository["default"].createUser(possibleUser);

          case 18:
            userToDatabase = _context.sent;
            (0, _mailSender["default"])(userToDatabase.email, userToDatabase.registrationToken);
            status = 201;

          case 21:
            _context.next = 24;
            break;

          case 23:
            status = 409;

          case 24:
            return _context.abrupt("return", status);

          case 25:
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

var setUserToActive = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(possibleToken) {
    var user, currentTime;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _userRepository["default"].findUserByToken(possibleToken);

          case 2:
            user = _context2.sent;
            currentTime = Math.floor(Date.now() / 1000);

            if (!(user !== null)) {
              _context2.next = 20;
              break;
            }

            if (!(currentTime <= user.registrationTokenExpiresAt)) {
              _context2.next = 12;
              break;
            }

            user.active = true;
            _context2.next = 9;
            return _userRepository["default"].updateUser(user);

          case 9:
            return _context2.abrupt("return", "activated");

          case 12:
            user.registrationToken = (0, _generateConfirmationToken["default"])();
            user.registrationTokenExpiresAt = (0, _generateDayExpirationNumber["default"])();
            _context2.next = 16;
            return _userRepository["default"].updateUser(user);

          case 16:
            (0, _mailSender["default"])(user.email, user.registrationToken);
            return _context2.abrupt("return", "activation_expired");

          case 18:
            _context2.next = 21;
            break;

          case 20:
            return _context2.abrupt("return", "not_found");

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function setUserToActive(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var areMembersInDatabases = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(members) {
    var areTheyInDatabase, i, user, _user;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!Array.isArray(members)) {
              _context3.next = 12;
              break;
            }

            i = 0;

          case 2:
            if (!(i < members.length)) {
              _context3.next = 10;
              break;
            }

            _context3.next = 5;
            return _userRepository["default"].findUserByUsername(members[i]);

          case 5:
            user = _context3.sent;
            areTheyInDatabase = user !== null;

          case 7:
            i++;
            _context3.next = 2;
            break;

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.next = 14;
            return _userRepository["default"].findUserByUsername(members);

          case 14:
            _user = _context3.sent;
            areTheyInDatabase = _user !== null;

          case 16:
            return _context3.abrupt("return", areTheyInDatabase);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function areMembersInDatabases(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var loginUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(possibleUser) {
    var userInDatabase, hashedPassword, sentPassword, doesPasswordMatch, registeredKingdom;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(!possibleUser.username || !possibleUser.password)) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", 400);

          case 2:
            _context4.next = 4;
            return _userRepository["default"].findUserByUsername(possibleUser.username);

          case 4:
            userInDatabase = _context4.sent;

            if (!(userInDatabase !== null)) {
              _context4.next = 27;
              break;
            }

            hashedPassword = userInDatabase.password;
            sentPassword = possibleUser.password;
            doesPasswordMatch = _bcrypt["default"].compareSync(sentPassword, hashedPassword);
            _context4.next = 11;
            return _kingdomRepository["default"].findKingdomByUserId(userInDatabase.id);

          case 11:
            registeredKingdom = _context4.sent;

            if (doesPasswordMatch) {
              _context4.next = 16;
              break;
            }

            return _context4.abrupt("return", 409);

          case 16:
            if (userInDatabase.active) {
              _context4.next = 20;
              break;
            }

            return _context4.abrupt("return", 403);

          case 20:
            if (!(registeredKingdom === null)) {
              _context4.next = 24;
              break;
            }

            return _context4.abrupt("return", 412);

          case 24:
            return _context4.abrupt("return", 200);

          case 25:
            _context4.next = 28;
            break;

          case 27:
            return _context4.abrupt("return", 404);

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function loginUser(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var identifyUser = function identifyUser(token) {
  var authorizationResponseStatus = _authenticationMiddleware["default"].authorization(token);

  switch (authorizationResponseStatus) {
    case 403:
      return authorizationResponseStatus = 403;

    case 200:
      return authorizationResponseStatus = 200;
  }
};

var forgotPassword = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(email) {
    var user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _userRepository["default"].findUserByEmail(email);

          case 2:
            user = _context5.sent;

            if (user) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", "no_records");

          case 7:
            user.forgottenPasswordToken = (0, _generateForgottenPswToken["default"])();
            user.forgottenPasswordTokenExpiresAt = (0, _generateForgottenPswExpirationTime["default"])();
            _context5.next = 11;
            return user.save();

          case 11:
            (0, _mailSenderForgottenPsw["default"])(user.email, user.forgottenPasswordToken);
            return _context5.abrupt("return", "ok_token_generated");

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function forgotPassword(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var resetPassword = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(pswToken, firstPsw, secondPsw) {
    var currentTime, user, regex, pswExpirationTokenTime, userOldPassword, doesPasswordMatch, hashedPasswordNewPassword;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            currentTime = Math.floor(Date.now() / 1000);
            _context6.next = 3;
            return _userRepository["default"].findUserByToken(pswToken);

          case 3:
            user = _context6.sent;
            regex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";

            if (user) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", "no_user");

          case 7:
            if (!(!firstPsw || !secondPsw)) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", "no_psw_provided");

          case 9:
            pswExpirationTokenTime = user.forgottenPasswordTokenExpiresAt;

            if (!(pswExpirationTokenTime <= currentTime)) {
              _context6.next = 12;
              break;
            }

            return _context6.abrupt("return", "expired");

          case 12:
            if (!(firstPsw !== secondPsw)) {
              _context6.next = 14;
              break;
            }

            return _context6.abrupt("return", "no_match");

          case 14:
            if (secondPsw.match(regex)) {
              _context6.next = 16;
              break;
            }

            return _context6.abrupt("return", "no_regex_match");

          case 16:
            userOldPassword = user.password;
            doesPasswordMatch = _bcrypt["default"].compareSync(secondPsw, userOldPassword);

            if (!doesPasswordMatch) {
              _context6.next = 22;
              break;
            }

            return _context6.abrupt("return", "old_psw_entered");

          case 22:
            _context6.next = 24;
            return (0, _hashPassword["default"])(secondPsw);

          case 24:
            hashedPasswordNewPassword = _context6.sent;
            user.password = hashedPasswordNewPassword;
            user.forgottenPasswordTokenExpiresAt = Math.floor(Date.now() / 1000);
            _context6.next = 29;
            return user.save();

          case 29:
            return _context6.abrupt("return", "ok");

          case 30:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function resetPassword(_x6, _x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

var findByUsername = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(username) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (!(username !== undefined)) {
              _context7.next = 6;
              break;
            }

            _context7.next = 3;
            return _userRepository["default"].findUserByUsername(username);

          case 3:
            _context7.t0 = _context7.sent;
            _context7.next = 7;
            break;

          case 6:
            _context7.t0 = null;

          case 7:
            return _context7.abrupt("return", _context7.t0);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function findByUsername(_x9) {
    return _ref7.apply(this, arguments);
  };
}();

var findById = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _userRepository["default"].findById(id);

          case 2:
            return _context8.abrupt("return", _context8.sent);

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function findById(_x10) {
    return _ref8.apply(this, arguments);
  };
}();

var _default = {
  createUser: createUser,
  setUserToActive: setUserToActive,
  areMembersInDatabases: areMembersInDatabases,
  findById: findById,
  findByUsername: findByUsername,
  loginUser: loginUser,
  identifyUser: identifyUser,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword
};
exports["default"] = _default;
//# sourceMappingURL=user-service.js.map