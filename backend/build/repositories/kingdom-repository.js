"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _kingdom = _interopRequireDefault(require("../models/kingdom"));

var _troops = _interopRequireDefault(require("../models/troops-models/troops"));

var _building = _interopRequireDefault(require("../models/building"));

var _database = _interopRequireDefault(require("../config/database"));

var _user = _interopRequireDefault(require("../models/user"));

var _importMetaResolve = require("@babel/core/lib/vendor/import-meta-resolve");

var createKingdom = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(kingdom) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _kingdom["default"].create(kingdom));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createKingdom(_x) {
    return _ref.apply(this, arguments);
  };
}();

var save = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(kingdom) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", kingdom.save());

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function save(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var findKingdomById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", _kingdom["default"].findByPk(id));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findKingdomById(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var findKingdomByUserId = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userId) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", _kingdom["default"].findOne({
              where: {
                userId: userId
              }
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findKingdomByUserId(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var findKingdomsByUserId = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userId) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", _kingdom["default"].findAll({
              where: {
                userId: userId
              }
            }));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function findKingdomsByUserId(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var getAllKingdoms = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", _kingdom["default"].findAll());

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getAllKingdoms() {
    return _ref6.apply(this, arguments);
  };
}();

var getKingdomsTroops = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(kingdomId) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", _troops["default"].findAll({
              where: {
                kingdomId: kingdomId
              },
              attributes: {
                exclude: ['kingdomId', 'unitLevelId', 'destroyTime']
              }
            }));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getKingdomsTroops(_x6) {
    return _ref7.apply(this, arguments);
  };
}();

var getKingdomsBuildings = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(kingdomId) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", _building["default"].findAll({
              where: {
                kingdomId: kingdomId
              },
              attributes: {
                exclude: ['kingdomId']
              }
            }));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getKingdomsBuildings(_x7) {
    return _ref8.apply(this, arguments);
  };
}();

var getWinnerStats = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _kingdom["default"].findAll({
              group: 'userId',
              attributes: [[_database["default"].fn('COUNT', _database["default"].col('userId')), 'count'], 'userId'],
              order: _database["default"].literal('count DESC'),
              limit: 1
            });

          case 2:
            return _context9.abrupt("return", _context9.sent);

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function getWinnerStats() {
    return _ref9.apply(this, arguments);
  };
}();

var count = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.abrupt("return", _kingdom["default"].count());

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function count() {
    return _ref10.apply(this, arguments);
  };
}();

var getFirstPlayer = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _kingdom["default"].findOne({
              include: _user["default"],
              order: _database["default"].literal('registeredAt ASC')
            });

          case 2:
            return _context11.abrupt("return", _context11.sent);

          case 3:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function getFirstPlayer() {
    return _ref11.apply(this, arguments);
  };
}();

var destroyBandits = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            return _context12.abrupt("return", _kingdom["default"].destroy({
              where: {
                userId: null
              }
            }));

          case 1:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function destroyBandits() {
    return _ref12.apply(this, arguments);
  };
}();

var _default = {
  save: save,
  createKingdom: createKingdom,
  findKingdomByUserId: findKingdomByUserId,
  getAllKingdoms: getAllKingdoms,
  getKingdomsBuildings: getKingdomsBuildings,
  getKingdomsTroops: getKingdomsTroops,
  findKingdomById: findKingdomById,
  getWinnerStats: getWinnerStats,
  count: count,
  getFirstPlayer: getFirstPlayer,
  findKingdomsByUserId: findKingdomsByUserId,
  destroyBandits: destroyBandits
};
exports["default"] = _default;
//# sourceMappingURL=kingdom-repository.js.map