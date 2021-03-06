"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var get = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", Promise.resolve([{
              name: 'kingdom',
              coordinateX: 3,
              coordinateY: 6,
              username: 'user'
            }, {
              name: 'kingdom2',
              coordinateX: 5,
              coordinateY: 4,
              username: 'user2'
            }]));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function get() {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  get: get
};
exports["default"] = _default;
//# sourceMappingURL=map.js.map