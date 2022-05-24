"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _troops = _interopRequireDefault(require("../../models/troops-models/troops"));

var _attackerTroopsToBattle = _interopRequireDefault(require("../../models/battle/attacker-troops-to-battle"));

var _battle = _interopRequireDefault(require("../../models/battle/battle"));

var _database = _interopRequireDefault(require("../../config/database"));

var _sequelize = require("sequelize");

var createTroop = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(troop) {
    var newTroop;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _troops["default"].create(troop);

          case 2:
            newTroop = _context.sent;
            return _context.abrupt("return", newTroop);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createTroop(_x) {
    return _ref.apply(this, arguments);
  };
}();

var findRecruitedTroopTypeByKingdomId = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(kingdomId, type) {
    var troopType;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _troops["default"].findOne({
              where: {
                kingdomId: kingdomId,
                type: type
              }
            });

          case 2:
            troopType = _context2.sent;
            return _context2.abrupt("return", troopType);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findRecruitedTroopTypeByKingdomId(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var findRecruitedKingdomTroops = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(kingdomId) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", _troops["default"].findAll({
              where: {
                kingdomId: kingdomId
              },
              attributes: {
                exclude: ['kingdomId', 'unitLevelId', 'destroyTime']
              }
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findRecruitedKingdomTroops(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var findAllKingdomTroops = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(kingdomId) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", _troops["default"].findAll({
              where: {
                kingdomId: kingdomId
              }
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findAllKingdomTroops(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

var findRandomKingdomTroop = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(kingdomId) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", _troops["default"].findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                kingdomId: kingdomId
              }, {
                quantity: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, 0)
              }]),
              order: _database["default"].random()
            }));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function findRandomKingdomTroop(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

var findRandomKingdomTroopInBattle = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(kingdomId) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", _troops["default"].findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                kingdomId: kingdomId
              }, {
                quantityInBattle: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, 0)
              }]),
              order: _database["default"].random()
            }));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function findRandomKingdomTroopInBattle(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

var findTroopInBattle = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(type, kingdomId) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", _attackerTroopsToBattle["default"].findOne({
              include: [{
                model: _battle["default"],
                as: 'attackerTroopsToBattle'
              }],
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                type: type
              }, _database["default"].literal('attacking_kingdom_id = ' + kingdomId)])
            }));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function findTroopInBattle(_x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();

var findArrivedSettlers = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", _troops["default"].findAll({
              where: {
                timeOfArrival: (0, _defineProperty2["default"])({}, _sequelize.Op.lte, Math.floor(Date.now() / 1000))
              }
            }));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function findArrivedSettlers() {
    return _ref8.apply(this, arguments);
  };
}();

var findReturnedSettlers = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", _troops["default"].findAll({
              where: {
                timeOfComeback: (0, _defineProperty2["default"])({}, _sequelize.Op.lte, Math.floor(Date.now() / 1000))
              }
            }));

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function findReturnedSettlers() {
    return _ref9.apply(this, arguments);
  };
}();

var _default = {
  createTroop: createTroop,
  findRecruitedKingdomTroops: findRecruitedKingdomTroops,
  findRecruitedTroopTypeByKingdomId: findRecruitedTroopTypeByKingdomId,
  findRandomKingdomTroop: findRandomKingdomTroop,
  findRandomKingdomTroopInBattle: findRandomKingdomTroopInBattle,
  findTroopInBattle: findTroopInBattle,
  findArrivedSettlers: findArrivedSettlers,
  findReturnedSettlers: findReturnedSettlers,
  findAllKingdomTroops: findAllKingdomTroops
};
exports["default"] = _default;
//# sourceMappingURL=troops-repository.js.map