"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _building = _interopRequireDefault(require("../models/building"));

var _database = _interopRequireDefault(require("../config/database"));

var _kingdom = _interopRequireDefault(require("../models/kingdom"));

var _sequelize = require("sequelize");

var _userService = _interopRequireDefault(require("../services/user-service"));

var getKingdomsBuildingPoints = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _userService["default"].findByUsername('AI-ruler');

          case 2:
            user = _context.sent;
            return _context.abrupt("return", _building["default"].findAll({
              include: {
                model: _kingdom["default"],
                as: 'buildings',
                where: {
                  'userId': (0, _defineProperty2["default"])({}, _sequelize.Op.not, user.id)
                },
                attributes: []
              },
              attributes: ['kingdomId', [_database["default"].fn('sum', _database["default"].col("level")), 'total']],
              group: ['kingdomId'],
              raw: true,
              order: _database["default"].literal('total DESC')
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getKingdomsBuildingPoints() {
    return _ref.apply(this, arguments);
  };
}();

var getRulerBuildingPoints = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _userService["default"].findByUsername('AI-ruler');

          case 2:
            user = _context2.sent;
            return _context2.abrupt("return", _building["default"].findAll({
              include: {
                model: _kingdom["default"],
                as: 'buildings',
                where: {
                  'userId': (0, _defineProperty2["default"])({}, _sequelize.Op.not, user.id)
                },
                attributes: []
              },
              attributes: ['kingdomId', 'buildings.userId', [_database["default"].fn('sum', _database["default"].col("level")), 'total']],
              group: ['userId'],
              raw: true,
              order: _database["default"].literal('total DESC')
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getRulerBuildingPoints() {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  getKingdomsBuildingPoints: getKingdomsBuildingPoints,
  getRulerBuildingPoints: getRulerBuildingPoints
};
exports["default"] = _default;
//# sourceMappingURL=leaderboard-repository.js.map