"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _kingdomService = _interopRequireDefault(require("../services/kingdom-service"));

var _errorMessage = _interopRequireDefault(require("../utilities/error-message"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _yield$KingdomService, status, error, message;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _kingdomService["default"].createKingdom(_objectSpread({}, req.body));

          case 2:
            _yield$KingdomService = _context.sent;
            status = _yield$KingdomService.status;
            error = _yield$KingdomService.error;
            message = _yield$KingdomService.message;

            if (!error) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(status).json((0, _errorMessage["default"])(error)));

          case 10:
            return _context.abrupt("return", res.status(status).json(message));

          case 11:
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

var updateKingdomName = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userId, _yield$KingdomService2, status, error, message;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = req.user.id;
            _context2.next = 3;
            return _kingdomService["default"].updateKingdomName(req.params.id, req.body.kingdomName, userId);

          case 3:
            _yield$KingdomService2 = _context2.sent;
            status = _yield$KingdomService2.status;
            error = _yield$KingdomService2.error;
            message = _yield$KingdomService2.message;

            if (error) {
              res.status(status).json((0, _errorMessage["default"])(error));
            } else {
              res.status(status).json({
                status: message
              });
            }

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateKingdomName(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getKingdomDetails = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var userId, _yield$KingdomService3, status, error, details;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = req.user.id;
            _context3.next = 3;
            return _kingdomService["default"].getKingdomDetails(req.params.id, userId);

          case 3:
            _yield$KingdomService3 = _context3.sent;
            status = _yield$KingdomService3.status;
            error = _yield$KingdomService3.error;
            details = _yield$KingdomService3.details;

            if (error) {
              res.status(status).json((0, _errorMessage["default"])(error));
            } else {
              res.status(status).json(details);
            }

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getKingdomDetails(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getAllKingdoms = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var allKingdoms;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _kingdomService["default"].getDTOAllKingdoms();

          case 2:
            allKingdoms = _context4.sent;
            res.json(allKingdoms);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getAllKingdoms(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var _default = {
  create: create,
  updateKingdomName: updateKingdomName,
  getKingdomDetails: getKingdomDetails,
  getAllKingdoms: getAllKingdoms
};
exports["default"] = _default;
//# sourceMappingURL=kingdom-controller.js.map