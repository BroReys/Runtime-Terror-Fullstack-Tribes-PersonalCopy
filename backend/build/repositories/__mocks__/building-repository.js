"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var findAllByKingdomIdWhereType = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(kingdomId, type) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(type === "farm")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", ["farm"]);

          case 4:
            return _context.abrupt("return", []);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findAllByKingdomIdWhereType(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  findAllByKingdomIdWhereType: findAllByKingdomIdWhereType
};
exports["default"] = _default;
//# sourceMappingURL=building-repository.js.map