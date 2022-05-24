"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _unitLevel = _interopRequireDefault(require("../models/unit-level"));

var _troops = _interopRequireDefault(require("../models/troops-models/troops"));

var generateUnitLevel = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(unitLevel) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _unitLevel["default"].create(unitLevel));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateUnitLevel(_x) {
    return _ref.apply(this, arguments);
  };
}();

var findUnitLevelByTroopTypeAndByKingdomId = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(kingdomId, type) {
    var unitLevel;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _unitLevel["default"].findOne({
              where: {
                kingdomId: kingdomId,
                type: type
              }
            });

          case 2:
            unitLevel = _context2.sent;
            return _context2.abrupt("return", unitLevel);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findUnitLevelByTroopTypeAndByKingdomId(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var save = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(unitLevel) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            unitLevel.save();

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function save(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  generateUnitLevel: generateUnitLevel,
  findUnitLevelByTroopTypeAndByKingdomId: findUnitLevelByTroopTypeAndByKingdomId,
  save: save
};
exports["default"] = _default;
//# sourceMappingURL=unit-level-repository.js.map