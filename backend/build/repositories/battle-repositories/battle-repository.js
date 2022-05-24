"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _battle = _interopRequireDefault(require("../../models/battle/battle"));

var _database = _interopRequireDefault(require("../../config/database"));

var create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(battleToSave) {
    var savedBattle;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _battle["default"].create(battleToSave);

          case 2:
            savedBattle = _context.sent;
            return _context.abrupt("return", savedBattle);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function create(_x) {
    return _ref.apply(this, arguments);
  };
}();

var findAll = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _battle["default"].findAll();

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findAll() {
    return _ref2.apply(this, arguments);
  };
}();

var findById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _battle["default"].findOne({
              where: {
                id: id
              }
            });

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findById(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var findAllUnfinished = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _battle["default"].findAll({
              where: {
                isFinished: false
              }
            });

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findAllUnfinished() {
    return _ref4.apply(this, arguments);
  };
}();

var findAllFinished = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _battle["default"].findAll({
              where: {
                isFinished: true
              }
            });

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function findAllFinished() {
    return _ref5.apply(this, arguments);
  };
}();

var findAllAsAttackingKingdom = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(kingdomId) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _battle["default"].findAll({
              where: {
                attacking_kingdom_id: kingdomId
              },
              order: [['isFinished'], ['timeOfComeback']]
            });

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function findAllAsAttackingKingdom(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

var findAllAsDefendingKingdom = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(kingdomId) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _battle["default"].findAll({
              where: {
                defending_kingdom_id: kingdomId
              },
              order: [['isFinished'], ['timeOfArrival']]
            });

          case 2:
            return _context7.abrupt("return", _context7.sent);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function findAllAsDefendingKingdom(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

var findFinishedByAttackingAndDefendingKingdom = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(attackingKingdomId, defendingKingdomId) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _battle["default"].findOne({
              where: {
                defending_kingdom_id: defendingKingdomId,
                attacking_kingdom_id: attackingKingdomId,
                isFinished: true
              },
              order: _database["default"].literal('startedAt DESC')
            });

          case 2:
            return _context8.abrupt("return", _context8.sent);

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function findFinishedByAttackingAndDefendingKingdom(_x5, _x6) {
    return _ref8.apply(this, arguments);
  };
}();

var _default = {
  create: create,
  findById: findById,
  findAllUnfinished: findAllUnfinished,
  findAllFinished: findAllFinished,
  findAllAsAttackingKingdom: findAllAsAttackingKingdom,
  findAllAsDefendingKingdom: findAllAsDefendingKingdom,
  findFinishedByAttackingAndDefendingKingdom: findFinishedByAttackingAndDefendingKingdom
};
exports["default"] = _default;
//# sourceMappingURL=battle-repository.js.map