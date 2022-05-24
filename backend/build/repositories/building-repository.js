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

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../config/database"));

var findAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _building["default"].findAll());

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findAll() {
    return _ref.apply(this, arguments);
  };
}();

var findAllByKingdomIdAndStatusTrue = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(kingdomId) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _building["default"].findAll({
              attributes: ["position", "id", "type", "level", "status", "startTime", "endTime", "destroyTime"],
              where: {
                kingdomId: kingdomId,
                status: true
              },
              raw: true,
              nest: true
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findAllByKingdomIdAndStatusTrue(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var findAllByKingdomIdAndStatusFalse = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(kingdomId) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", _building["default"].findAll({
              attributes: ["position", "id", "type", "level", "status", "startTime", "endTime", "destroyTime"],
              where: {
                kingdomId: kingdomId,
                status: false
              }
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findAllByKingdomIdAndStatusFalse(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var findTownhallByKingdomId = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(kingdomId) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", _building["default"].findOne({
              attributes: ["position", "id", "type", "level", "status", "startTime", "endTime", "destroyTime"],
              where: {
                kingdomId: kingdomId,
                type: "townhall"
              }
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findTownhallByKingdomId(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var findAllByKingdomIdWhereType = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(kingdomId, type) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", _building["default"].findAll({
              where: {
                kingdomId: kingdomId,
                type: type
              }
            }));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function findAllByKingdomIdWhereType(_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();

var findOneByKingdomIdWhereType = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(kingdomId, type) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", _building["default"].findOne({
              where: {
                kingdomId: kingdomId,
                type: type
              }
            }));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function findOneByKingdomIdWhereType(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();

var createBuilding = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(building) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", _building["default"].create(building));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function createBuilding(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

var saveBuilding = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(building) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", building.save());

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function saveBuilding(_x9) {
    return _ref8.apply(this, arguments);
  };
}();

var destroyBuilding = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(building) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", building.destroy());

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function destroyBuilding(_x10) {
    return _ref9.apply(this, arguments);
  };
}();

var findBuildingByPk = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(buildingId) {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.abrupt("return", _building["default"].findByPk(buildingId));

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function findBuildingByPk(_x11) {
    return _ref10.apply(this, arguments);
  };
}();

var findAllBuiltAndActiveByKingdomId = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(kingdomId) {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            return _context11.abrupt("return", _building["default"].findAll({
              where: {
                kingdomId: kingdomId,
                status: true,
                endTime: (0, _defineProperty2["default"])({}, _sequelize.Op.lte, Date.now() / 1000)
              }
            }));

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function findAllBuiltAndActiveByKingdomId(_x12) {
    return _ref11.apply(this, arguments);
  };
}();

var findAllInProgressUntil = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(kingdomId, currentTick) {
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            return _context12.abrupt("return", _building["default"].findAll({
              where: {
                kingdomId: kingdomId,
                status: false,
                endTime: (0, _defineProperty2["default"])({}, _sequelize.Op.lte, currentTick)
              }
            }));

          case 1:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function findAllInProgressUntil(_x13, _x14) {
    return _ref12.apply(this, arguments);
  };
}();

var countDestroyableBuildingsExcept = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(kingdomId, buildingType) {
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            return _context13.abrupt("return", _building["default"].count({
              where: (0, _defineProperty2["default"])({
                kingdomId: kingdomId,
                status: true
              }, _sequelize.Op.and, [{
                type: (0, _defineProperty2["default"])({}, _sequelize.Op.ne, buildingType)
              }, {
                type: (0, _defineProperty2["default"])({}, _sequelize.Op.ne, "townhall")
              }])
            }));

          case 1:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function countDestroyableBuildingsExcept(_x15, _x16) {
    return _ref13.apply(this, arguments);
  };
}();

var getRandomBuildingExcept = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(kingdomId, buildingType) {
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            return _context14.abrupt("return", _building["default"].findOne({
              where: (0, _defineProperty2["default"])({
                kingdomId: kingdomId,
                status: true
              }, _sequelize.Op.and, [{
                type: (0, _defineProperty2["default"])({}, _sequelize.Op.ne, buildingType)
              }, {
                type: (0, _defineProperty2["default"])({}, _sequelize.Op.ne, "townhall")
              }]),
              order: _database["default"].random()
            }));

          case 1:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function getRandomBuildingExcept(_x17, _x18) {
    return _ref14.apply(this, arguments);
  };
}();

var findAcademyByKingdomId = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(kingdomId) {
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            return _context15.abrupt("return", _building["default"].findOne({
              attributes: ["position", "id", "type", "level", "status", "startTime", "endTime", "destroyTime"],
              where: {
                kingdomId: kingdomId,
                type: "academy"
              }
            }));

          case 1:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function findAcademyByKingdomId(_x19) {
    return _ref15.apply(this, arguments);
  };
}();

var _default = {
  findAll: findAll,
  findAllByKingdomIdAndStatusTrue: findAllByKingdomIdAndStatusTrue,
  findAllByKingdomIdAndStatusFalse: findAllByKingdomIdAndStatusFalse,
  createBuilding: createBuilding,
  saveBuilding: saveBuilding,
  destroyBuilding: destroyBuilding,
  findBuildingByPk: findBuildingByPk,
  findAllByKingdomIdWhereType: findAllByKingdomIdWhereType,
  findOneByKingdomIdWhereType: findOneByKingdomIdWhereType,
  findTownhallByKingdomId: findTownhallByKingdomId,
  findAllBuiltAndActiveByKingdomId: findAllBuiltAndActiveByKingdomId,
  findAcademyByKingdomId: findAcademyByKingdomId,
  countDestroyableBuildingsExcept: countDestroyableBuildingsExcept,
  getRandomBuildingExcept: getRandomBuildingExcept,
  findAllInProgressUntil: findAllInProgressUntil
};
exports["default"] = _default;
//# sourceMappingURL=building-repository.js.map