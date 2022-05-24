"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _troopsRules = require("../rules/troops-rules");

var _troopsRepository = _interopRequireDefault(require("../repositories/troops-repositories/troops-repository"));

var _mapService = _interopRequireDefault(require("./map-service"));

var _kingdomRepository = _interopRequireDefault(require("../repositories/kingdom-repository"));

var _userRepository = _interopRequireDefault(require("../repositories/user-repository"));

var _unitLevelService = _interopRequireDefault(require("./unit-level-service"));

var _buildingService = _interopRequireDefault(require("./building-service"));

var initiatePilgrimageToSettleKingdom = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(settlerRuler, settlerKingdom, coordinateX, coordinateY, troops) {
    var speedOfSettlers, timeOfTravel, troopsOfKingdom, settlers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getSpeedOfSettlers(settlerKingdom);

          case 2:
            speedOfSettlers = _context.sent;
            timeOfTravel = calculateDistance(settlerKingdom, coordinateX, coordinateY) / speedOfSettlers;
            _context.next = 6;
            return settlerKingdom.getTroops();

          case 6:
            troopsOfKingdom = _context.sent;
            settlers = troopsOfKingdom.filter(function (troop) {
              return troop.type === 'settlers';
            });
            settlers[0].timeOfArrival = Math.floor(Date.now() / 1000 + timeOfTravel * 60 * 60);
            settlers[0].quantityInBattle = settlers[0].quantityInBattle + troops[0].quantity;
            settlers[0].quantity = settlers[0].quantity - troops[0].quantity;
            settlers[0].coordinateX = coordinateX;
            settlers[0].coordinateY = coordinateY;
            _context.next = 15;
            return settlers[0].save();

          case 15:
            return _context.abrupt("return", settlers[0]);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initiatePilgrimageToSettleKingdom(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

function getSpeedOfSettlers(_x6) {
  return _getSpeedOfSettlers.apply(this, arguments);
}

function _getSpeedOfSettlers() {
  _getSpeedOfSettlers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(settlerKingdom) {
    var troops, settler, unitLevel, speed;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return settlerKingdom.getTroops();

          case 2:
            troops = _context6.sent;
            _context6.next = 5;
            return troops.filter(function (troop) {
              return troop.type === 'settlers';
            });

          case 5:
            settler = _context6.sent;
            _context6.next = 8;
            return settler[0].getUnitLevel();

          case 8:
            unitLevel = _context6.sent;
            speed = (0, _troopsRules.troopRules)(unitLevel.upgradeLevel).settlers.speed;
            return _context6.abrupt("return", speed);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getSpeedOfSettlers.apply(this, arguments);
}

function calculateDistance(settlerKingdom, coordinateX, coordinateY) {
  var x1 = settlerKingdom.coordinateX;
  var y1 = settlerKingdom.coordinateY;
  var x2 = coordinateX;
  var y2 = coordinateY;
  return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
}

var findArrivedSettlers = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _troopsRepository["default"].findArrivedSettlers();

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findArrivedSettlers() {
    return _ref2.apply(this, arguments);
  };
}();

var findReturnedSettlers = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _troopsRepository["default"].findReturnedSettlers();

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findReturnedSettlers() {
    return _ref3.apply(this, arguments);
  };
}();

var setPropertiesOfReturnedSettlers = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(returnedSettlers) {
    var i;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            for (i = 0; i < returnedSettlers.length; i++) {
              returnedSettlers[i].quantity = returnedSettlers[i].quantity + returnedSettlers[i].quantityInBattle;
              returnedSettlers[i].quantityInBattle = returnedSettlers[i].quantityInBattle - returnedSettlers[i].quantityInBattle;
              returnedSettlers[i].coordinateX = null;
              returnedSettlers[i].coordinateY = null;
              returnedSettlers[i].timeOfComeback = null;
              returnedSettlers[i].save();
            }

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function setPropertiesOfReturnedSettlers(_x7) {
    return _ref4.apply(this, arguments);
  };
}();

var tileCheckOfArrivedSettlers = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(arrivedSettlers) {
    var i, tile;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < arrivedSettlers.length)) {
              _context5.next = 15;
              break;
            }

            _context5.next = 4;
            return _mapService["default"].identifyKingdom(arrivedSettlers[i].coordinateX, arrivedSettlers[i].coordinateY);

          case 4:
            tile = _context5.sent;

            if (!(tile.status !== 'free')) {
              _context5.next = 10;
              break;
            }

            _context5.next = 8;
            return setTimeOfComeBack(arrivedSettlers[i]);

          case 8:
            _context5.next = 12;
            break;

          case 10:
            _context5.next = 12;
            return createKingdomFromSettlers(arrivedSettlers[i]);

          case 12:
            i++;
            _context5.next = 1;
            break;

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function tileCheckOfArrivedSettlers(_x8) {
    return _ref5.apply(this, arguments);
  };
}();

function setTimeOfComeBack(_x9) {
  return _setTimeOfComeBack.apply(this, arguments);
}

function _setTimeOfComeBack() {
  _setTimeOfComeBack = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(settlers) {
    var settlerKingdom, speedOfSettlers, timeOfTravel;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _kingdomRepository["default"].findKingdomById(settlers.kingdomId);

          case 2:
            settlerKingdom = _context7.sent;
            _context7.next = 5;
            return getSpeedOfSettlers(settlerKingdom);

          case 5:
            speedOfSettlers = _context7.sent;
            timeOfTravel = calculateDistance(settlerKingdom, settlers.coordinateX, settlers.coordinateY) / speedOfSettlers;
            settlers.timeOfComeback = Math.floor(Date.now() / 1000 + timeOfTravel);
            settlers.timeOfArrival = null;
            _context7.next = 11;
            return settlers.save();

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _setTimeOfComeBack.apply(this, arguments);
}

function createKingdomFromSettlers(_x10) {
  return _createKingdomFromSettlers.apply(this, arguments);
}

function _createKingdomFromSettlers() {
  _createKingdomFromSettlers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(settlers) {
    var originKingdom, user, userKingdoms, romanNum, kingdomName, kingdomFromSettlers, kingdomSavedFromSettlers;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _kingdomRepository["default"].findKingdomById(settlers.kingdomId);

          case 2:
            originKingdom = _context8.sent;
            _context8.next = 5;
            return _userRepository["default"].findById(originKingdom.userId);

          case 5:
            user = _context8.sent;
            _context8.next = 8;
            return user.getKingdoms();

          case 8:
            userKingdoms = _context8.sent;
            romanNum = romanizer(userKingdoms.length);
            kingdomName = "".concat(user.username, "\u2019s kingdom ").concat(romanNum);
            kingdomFromSettlers = {
              name: kingdomName,
              coordinateX: settlers.coordinateX,
              coordinateY: settlers.coordinateY,
              userId: user.id
            };
            _context8.next = 14;
            return _kingdomRepository["default"].createKingdom(kingdomFromSettlers);

          case 14:
            kingdomSavedFromSettlers = _context8.sent;
            _context8.next = 17;
            return _unitLevelService["default"].generateBasicUnitLevels(kingdomSavedFromSettlers.id);

          case 17:
            _context8.next = 19;
            return _buildingService["default"].generateStarterBuildings(kingdomSavedFromSettlers.id);

          case 19:
            settlers.quantityInBattle = settlers.quantityInBattle - settlers.quantityInBattle;
            settlers.timeOfArrival = null;
            settlers.coordinateX = null;
            settlers.coordinateY = null;
            settlers.save();

          case 24:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _createKingdomFromSettlers.apply(this, arguments);
}

function romanizer(num) {
  var lookup = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  },
      roman = '',
      i;

  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }

  return roman;
}

var _default = {
  initiatePilgrimageToSettleKingdom: initiatePilgrimageToSettleKingdom,
  findArrivedSettlers: findArrivedSettlers,
  tileCheckOfArrivedSettlers: tileCheckOfArrivedSettlers,
  setPropertiesOfReturnedSettlers: setPropertiesOfReturnedSettlers,
  findReturnedSettlers: findReturnedSettlers
};
exports["default"] = _default;
//# sourceMappingURL=settle-service.js.map