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

var _kingdom = _interopRequireDefault(require("../../models/kingdom"));

var _database = _interopRequireDefault(require("../../config/database"));

var _troopsInBarracks = _interopRequireDefault(require("../../models/troops-models/troops-in-barracks"));

var _sequelize = require("sequelize");

var createTroop = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(troop) {
    var newTroop;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _troopsInBarracks["default"].create(troop);

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

var findKingdomTroopsInBarracks = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(kingdomId) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _troopsInBarracks["default"].findAll({
              where: {
                kingdomId: kingdomId
              }
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findKingdomTroopsInBarracks(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var findAllByKingdomIdAndUntil = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(kingdomId, currentTick) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", _troopsInBarracks["default"].findAll({
              where: {
                kingdomId: kingdomId,
                endTime: (0, _defineProperty2["default"])({}, _sequelize.Op.lte, currentTick)
              }
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findAllByKingdomIdAndUntil(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var findKingdomTroopsInBarracksByTypeAndOrderByEndtimeDesc = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(kingdomId, type) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _database["default"].query("SELECT * FROM troops_in_barracks WHERE type = '".concat(type, "' AND kingdomId = ").concat(kingdomId, " ORDER BY endTime DESC"));

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findKingdomTroopsInBarracksByTypeAndOrderByEndtimeDesc(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var findTrainedKingdomTroopsInBarracksByType = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(kingdomId, type, currentTick) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!currentTick) {
              currentTick = Date.now() / 1000;
            }

            _context5.next = 3;
            return _database["default"].query("SELECT * FROM troops_in_barracks WHERE type = '".concat(type, "' AND kingdomId = ").concat(kingdomId, " AND endTime <= ").concat(currentTick, ";"));

          case 3:
            return _context5.abrupt("return", _context5.sent);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function findTrainedKingdomTroopsInBarracksByType(_x7, _x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

var deleteAllAlreadyTrainedTroops = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _database["default"].query("DELETE FROM troops_in_barracks WHERE endTime <= ".concat(Date.now() / 1000, ";"));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function deleteAllAlreadyTrainedTroops() {
    return _ref6.apply(this, arguments);
  };
}();

var bulkCreateTroops = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(troops) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _troopsInBarracks["default"].bulkCreate(troops);

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function bulkCreateTroops(_x10) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = {
  createTroop: createTroop,
  findKingdomTroopsInBarracks: findKingdomTroopsInBarracks,
  findKingdomTroopsInBarracksByTypeAndOrderByEndtimeDesc: findKingdomTroopsInBarracksByTypeAndOrderByEndtimeDesc,
  findTrainedKingdomTroopsInBarracksByType: findTrainedKingdomTroopsInBarracksByType,
  deleteAllAlreadyTrainedTroops: deleteAllAlreadyTrainedTroops,
  bulkCreateTroops: bulkCreateTroops,
  findAllByKingdomIdAndUntil: findAllByKingdomIdAndUntil
};
exports["default"] = _default;
//# sourceMappingURL=troops-in-barracks-repository.js.map