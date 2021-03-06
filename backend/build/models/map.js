"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _kingdom = _interopRequireDefault(require("./kingdom"));

var _user = _interopRequireDefault(require("./user"));

var _sequelize = require("sequelize");

var get = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _kingdom["default"].findAll({
              attributes: ["name", "coordinateX", "coordinateY", [_sequelize.Sequelize.col("user.username"), "username"]],
              raw: true,
              nest: true,
              include: [{
                model: _user["default"],
                required: true,
                attributes: []
              }]
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
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