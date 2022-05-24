"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var findKingdomByUserId = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(userId === 1)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", {
              name: "TestKingdom",
              coordinateX: 1,
              coordinateY: 1,
              userId: 1
            });

          case 4:
            if (!(userId === 2)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", null);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findKingdomByUserId(_x) {
    return _ref.apply(this, arguments);
  };
}();

var findKingdomById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(kingdomId) {
    var kingdom;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            kingdom = {
              id: 1,
              name: "Kingdom",
              coordinateX: 2,
              coordinateY: 2,
              userId: 1,
              gold: 10,
              food: 10
            };

            if (!(kingdomId !== kingdom.id)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", null);

          case 5:
            return _context2.abrupt("return", kingdom);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findKingdomById(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  findKingdomByUserId: findKingdomByUserId,
  findKingdomById: findKingdomById
};
exports["default"] = _default;
//# sourceMappingURL=kingdom-repository.js.map