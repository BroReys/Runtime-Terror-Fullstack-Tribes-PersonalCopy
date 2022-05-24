"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _settleService = _interopRequireDefault(require("../services/settle-service"));

var settleMiddleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var arrivedSettlers, returnedSettlers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _settleService["default"].findArrivedSettlers();

          case 2:
            arrivedSettlers = _context.sent;
            _context.next = 5;
            return _settleService["default"].findReturnedSettlers();

          case 5:
            returnedSettlers = _context.sent;

            if (!arrivedSettlers) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return _settleService["default"].tileCheckOfArrivedSettlers(arrivedSettlers);

          case 9:
            if (!returnedSettlers) {
              _context.next = 12;
              break;
            }

            _context.next = 12;
            return _settleService["default"].setPropertiesOfReturnedSettlers(returnedSettlers);

          case 12:
            next();

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function settleMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = settleMiddleware;
exports["default"] = _default;
//# sourceMappingURL=settlers-middleware.js.map