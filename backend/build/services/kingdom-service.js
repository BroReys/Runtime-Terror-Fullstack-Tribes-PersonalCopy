"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _kingdomRepository = _interopRequireDefault(require("../repositories/kingdom-repository"));

var _mapService = _interopRequireDefault(require("./map-service"));

var _userService = _interopRequireDefault(require("./user-service"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _unitLevelService = _interopRequireDefault(require("./unit-level-service"));

var _kingdom = _interopRequireDefault(require("../models/kingdom"));

var _unitLevelRepository = _interopRequireDefault(require("../repositories/unit-level-repository"));

var _troopsRules = require("../rules/troops-rules");

var _buildingRules = require("../rules/building-rules");

var _buildingService = _interopRequireDefault(require("./building-service"));

var _troopsService = _interopRequireDefault(require("./troops-services/troops-service"));

var _buildingRepository = _interopRequireDefault(require("../repositories/building-repository"));

var _userRepository = _interopRequireDefault(require("../repositories/user-repository"));

var _user = _interopRequireDefault(require("../models/user"));

var _bandits = _interopRequireDefault(require("../utilities/bandits"));

var createKingdom = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var username, password, kingdomName, coordinateX, coordinateY, _yield$MapService$ide, error, status, userInDatabase, hashedPassword, doesPasswordMatch, kingdom, savedKingdom;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = _ref.username, password = _ref.password, kingdomName = _ref.kingdomName, coordinateX = _ref.coordinateX, coordinateY = _ref.coordinateY;
            _context.next = 3;
            return _mapService["default"].identifyKingdom(coordinateX, coordinateY);

          case 3:
            _yield$MapService$ide = _context.sent;
            error = _yield$MapService$ide.error;
            status = _yield$MapService$ide.status;
            _context.next = 8;
            return _userService["default"].findByUsername(username);

          case 8:
            userInDatabase = _context.sent;

            if (username) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", {
              status: 400,
              error: 'Username must be provided!'
            });

          case 13:
            if (password) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", {
              status: 400,
              error: 'Password must be provided!'
            });

          case 17:
            if (userInDatabase) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return", {
              status: 404,
              error: 'User not found!'
            });

          case 21:
            hashedPassword = userInDatabase.password;
            doesPasswordMatch = _bcrypt["default"].compareSync(password, hashedPassword);

            if (!userInDatabase.hadKingdomAlready) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", {
              status: 404,
              error: 'You already have a kingdom!'
            });

          case 27:
            if (userInDatabase.active) {
              _context.next = 31;
              break;
            }

            return _context.abrupt("return", {
              status: 403,
              error: 'User registration not completed!'
            });

          case 31:
            if (doesPasswordMatch) {
              _context.next = 35;
              break;
            }

            return _context.abrupt("return", {
              status: 403,
              error: 'Invalid password'
            });

          case 35:
            if (!(!coordinateX || !coordinateY)) {
              _context.next = 39;
              break;
            }

            return _context.abrupt("return", {
              status: 400,
              error: 'Coordinates must be provided!'
            });

          case 39:
            if (!error) {
              _context.next = 43;
              break;
            }

            return _context.abrupt("return", {
              status: 403,
              error: error
            });

          case 43:
            if (!(status === "taken")) {
              _context.next = 47;
              break;
            }

            return _context.abrupt("return", {
              status: 403,
              error: 'Coordinates already taken by another kingdom'
            });

          case 47:
            kingdom = {
              name: kingdomName || userInDatabase.username + "'s kingdom",
              coordinateX: coordinateX,
              coordinateY: coordinateY,
              userId: userInDatabase.id
            };
            _context.next = 50;
            return _kingdomRepository["default"].createKingdom(kingdom);

          case 50:
            savedKingdom = _context.sent;
            userInDatabase.hadKingdomAlready = true;
            _context.next = 54;
            return userInDatabase.save();

          case 54:
            _context.next = 56;
            return _unitLevelService["default"].generateBasicUnitLevels(savedKingdom.id);

          case 56:
            _context.next = 58;
            return _buildingService["default"].generateStarterBuildings(savedKingdom.id);

          case 58:
            return _context.abrupt("return", {
              status: 200,
              message: "Congratulations '".concat(username, "'! Your kingdom '").concat(kingdom.name, "' has been found at world map coordinates [").concat(coordinateX, ",").concat(coordinateY, "]!")
            });

          case 59:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createKingdom(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var createAiKingdoms = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var buildingTypes, troopTypes, user, savedUser, i, level, x, y, kingdom, newKingdom, j, building, unitQuantities, randomUnitQuantity, l, quantity, unitLevel;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _userRepository["default"].findUserByUsername('AI-ruler');

          case 2:
            if (_context2.sent) {
              _context2.next = 72;
              break;
            }

            //TODO exclude from middlewares
            buildingTypes = (0, _buildingRules.buildingRules)().type;
            troopTypes = (0, _troopsRules.troopRules)().type;
            user = {
              username: "AI-ruler",
              email: "airuler@hotmail.com",
              password: "Password123",
              role: "user"
            };
            _context2.next = 8;
            return _user["default"].create(user);

          case 8:
            savedUser = _context2.sent;
            i = 1;

          case 10:
            if (!(i <= Math.floor(Math.random() * 10 + 3))) {
              _context2.next = 70;
              break;
            }

            level = Math.floor(Math.random() * (15 - 1) + 1);
            x = Math.floor(Math.random() * 10); // TODO (10-1) + 1 vs (10) + 1

            y = Math.floor(Math.random() * 10);

          case 14:
            _context2.next = 16;
            return _mapService["default"].identifyKingdom(x, y);

          case 16:
            _context2.t1 = _context2.sent.status;
            _context2.t0 = _context2.t1 === 'taken';

            if (_context2.t0) {
              _context2.next = 22;
              break;
            }

            _context2.next = 21;
            return _mapService["default"].identifyKingdom(x, y);

          case 21:
            _context2.t0 = _context2.sent.error;

          case 22:
            if (!_context2.t0) {
              _context2.next = 27;
              break;
            }

            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            _context2.next = 14;
            break;

          case 27:
            kingdom = {
              name: "AI-kingdom".concat(i),
              coordinateX: x,
              coordinateY: y,
              gold: 1000 * level,
              food: 2000 * level,
              userId: savedUser.id
            };
            _context2.next = 30;
            return _kingdom["default"].create(kingdom);

          case 30:
            newKingdom = _context2.sent;
            _context2.next = 33;
            return _unitLevelService["default"].generateBasicUnitLevels(newKingdom.id);

          case 33:
            j = 0;

          case 34:
            if (!(j < buildingTypes.length)) {
              _context2.next = 46;
              break;
            }

            _context2.next = 37;
            return _buildingService["default"].addBuildingToKingdom(newKingdom.id, buildingTypes[j], newKingdom.userId);

          case 37:
            _context2.next = 39;
            return _buildingRepository["default"].findOneByKingdomIdWhereType(newKingdom.id, buildingTypes[j]);

          case 39:
            building = _context2.sent;

            if (buildingTypes[j] === 'townhall') {
              building.level = level + 1;
            } else {
              building.level = level;
            }

            _context2.next = 43;
            return building.save();

          case 43:
            j++;
            _context2.next = 34;
            break;

          case 46:
            unitQuantities = [{
              'phalanx': 0.25,
              'swordsman': 0.25,
              'scout': 0.25,
              'cavalry': 0.25
            }, {
              'phalanx': 0.50,
              'swordsman': 0.15,
              'scout': 0.10,
              'cavalry': 0.25
            }, {
              'phalanx': 0.75,
              'swordsman': 0.00,
              'scout': 0.25,
              'cavalry': 0.00
            }, {
              'phalanx': 0.50,
              'swordsman': 0.00,
              'scout': 0.50,
              'cavalry': 0.00
            }];
            randomUnitQuantity = Math.floor(Math.random() * unitQuantities.length);
            l = 0;

          case 49:
            if (!(l < troopTypes.length)) {
              _context2.next = 63;
              break;
            }

            if (!(troopTypes[l] !== 'diplomat' && troopTypes[l] !== 'settlers' && troopTypes[l] !== 'catapult')) {
              _context2.next = 60;
              break;
            }

            //TODO 100 * level ? 10 * level ?
            quantity = 100 * level * unitQuantities[randomUnitQuantity][troopTypes[l]];
            _context2.next = 54;
            return _troopsService["default"].joinTroopArmy(troopTypes[l], quantity, newKingdom.id);

          case 54:
            _context2.next = 56;
            return _unitLevelRepository["default"].findUnitLevelByTroopTypeAndByKingdomId(newKingdom.id, troopTypes[l]);

          case 56:
            unitLevel = _context2.sent;
            unitLevel.upgradeLevel = level;
            _context2.next = 60;
            return unitLevel.save();

          case 60:
            l++;
            _context2.next = 49;
            break;

          case 63:
            newKingdom.gold = 1000 * (level + 1);
            newKingdom.food = 2000 * (level + 1);
            _context2.next = 67;
            return newKingdom.save();

          case 67:
            i++;
            _context2.next = 10;
            break;

          case 70:
            _context2.next = 72;
            return _bandits["default"].createBandits(1);

          case 72:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createAiKingdoms() {
    return _ref3.apply(this, arguments);
  };
}();

var updateKingdomName = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(kingdomId, kingdomName, userId) {
    var kingdom, owner;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _kingdomRepository["default"].findKingdomById(kingdomId);

          case 2:
            kingdom = _context3.sent;
            _context3.next = 5;
            return _userService["default"].findById(userId);

          case 5:
            owner = _context3.sent;

            if (kingdomId) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", {
              status: 400,
              error: 'Id must be provided!'
            });

          case 10:
            if (kingdom) {
              _context3.next = 14;
              break;
            }

            return _context3.abrupt("return", {
              status: 404,
              error: 'No kingdom with this id found!'
            });

          case 14:
            if (kingdomName) {
              _context3.next = 18;
              break;
            }

            return _context3.abrupt("return", {
              status: 400,
              error: "Kingdom's name must be provided!"
            });

          case 18:
            if (!(kingdom.userId !== owner.id)) {
              _context3.next = 22;
              break;
            }

            return _context3.abrupt("return", {
              status: 403,
              error: 'Kingdom belongs to another user!'
            });

          case 22:
            kingdom.name = kingdomName;
            _context3.next = 25;
            return _kingdomRepository["default"].save(kingdom);

          case 25:
            return _context3.abrupt("return", {
              status: 200,
              message: "ok"
            });

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateKingdomName(_x2, _x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var getKingdomDetails = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(kingdomId, userId) {
    var kingdom, owner;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _kingdomRepository["default"].findKingdomById(kingdomId);

          case 2:
            kingdom = _context4.sent;
            _context4.next = 5;
            return _userService["default"].findById(userId);

          case 5:
            owner = _context4.sent;

            if (kingdomId) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", {
              status: 400,
              error: 'Id must be provided!'
            });

          case 10:
            if (kingdom) {
              _context4.next = 14;
              break;
            }

            return _context4.abrupt("return", {
              status: 404,
              error: 'No kingdom with this id found!'
            });

          case 14:
            if (!(kingdom.userId !== owner.id)) {
              _context4.next = 18;
              break;
            }

            return _context4.abrupt("return", {
              status: 403,
              error: 'Kingdom belongs to another user!'
            });

          case 18:
            _context4.t0 = {
              kingdomId: kingdom.id,
              kingdomName: kingdom.name,
              ruler: owner.username,
              location: {
                coordinateX: kingdom.coordinateX,
                coordinateY: kingdom.coordinateY
              }
            };
            _context4.t1 = [{
              type: 'food',
              amount: kingdom.food,
              production: kingdom.food.production
            }, {
              type: 'gold',
              amount: kingdom.gold,
              production: kingdom.gold.production
            }];
            _context4.next = 22;
            return _kingdomRepository["default"].getKingdomsBuildings(kingdom.id);

          case 22:
            _context4.t2 = _context4.sent;
            _context4.next = 25;
            return _kingdomRepository["default"].getKingdomsTroops(kingdom.id);

          case 25:
            _context4.t3 = _context4.sent;
            _context4.t4 = {
              kingdom: _context4.t0,
              resources: _context4.t1,
              buildings: _context4.t2,
              troops: _context4.t3
            };
            return _context4.abrupt("return", {
              status: 200,
              details: _context4.t4
            });

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getKingdomDetails(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

var findKingdomsByUserId = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userId) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", _kingdomRepository["default"].findKingdomByUserId(userId));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function findKingdomsByUserId(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

var getAllKingdoms = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", _kingdomRepository["default"].getAllKingdoms());

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getAllKingdoms() {
    return _ref7.apply(this, arguments);
  };
}();

var getAllKingdomsByUserId = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(userId) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", _kingdomRepository["default"].findKingdomsByUserId(userId));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getAllKingdomsByUserId(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

var getKingdomsBuildings = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", _kingdomRepository["default"].getKingdomsBuildings());

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getKingdomsBuildings() {
    return _ref9.apply(this, arguments);
  };
}();

var getKingdomsTroops = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", _kingdomRepository["default"].getKingdomsTroops());

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function getKingdomsTroops() {
    return _ref10.apply(this, arguments);
  };
}();

var getWinnerStats = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    var top_ruler;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _kingdomRepository["default"].getWinnerStats();

          case 2:
            top_ruler = _context10.sent;
            return _context10.abrupt("return", {
              userId: top_ruler[0].get('userId'),
              count: top_ruler[0].get('count')
            });

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function getWinnerStats() {
    return _ref11.apply(this, arguments);
  };
}();

var getKingdomsCount = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            return _context11.abrupt("return", _kingdomRepository["default"].count());

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function getKingdomsCount() {
    return _ref12.apply(this, arguments);
  };
}();

var getFirstPlayer = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            return _context12.abrupt("return", _kingdomRepository["default"].getFirstPlayer());

          case 1:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function getFirstPlayer() {
    return _ref13.apply(this, arguments);
  };
}();

var getKingdomById = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(kingdomId) {
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            return _context13.abrupt("return", _kingdomRepository["default"].findKingdomById(kingdomId));

          case 1:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function getKingdomById(_x9) {
    return _ref14.apply(this, arguments);
  };
}();

var getDTOAllKingdoms = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
    var kingdoms, DTOs, i, user, username, DTO;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _kingdomRepository["default"].getAllKingdoms();

          case 2:
            kingdoms = _context14.sent;
            DTOs = [];
            i = 0;

          case 5:
            if (!(i < kingdoms.length)) {
              _context14.next = 15;
              break;
            }

            _context14.next = 8;
            return _userService["default"].findById(kingdoms[i].userId);

          case 8:
            user = _context14.sent;
            username = user === null ? null : user.username;
            DTO = {
              id: kingdoms[i].id,
              name: kingdoms[i].name,
              ruler: username,
              coordinateX: kingdoms[i].coordinateX,
              coordinateY: kingdoms[i].coordinateY
            };
            DTOs[i] = DTO;

          case 12:
            i++;
            _context14.next = 5;
            break;

          case 15:
            return _context14.abrupt("return", DTOs);

          case 16:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function getDTOAllKingdoms() {
    return _ref15.apply(this, arguments);
  };
}();

var _default = {
  createKingdom: createKingdom,
  createAiKingdoms: createAiKingdoms,
  updateKingdomName: updateKingdomName,
  getKingdomDetails: getKingdomDetails,
  getKingdomsTroops: getKingdomsTroops,
  getKingdomsBuildings: getKingdomsBuildings,
  findKingdomsByUserId: findKingdomsByUserId,
  getAllKingdoms: getAllKingdoms,
  getWinnerStats: getWinnerStats,
  getKingdomsCount: getKingdomsCount,
  getFirstPlayer: getFirstPlayer,
  getKingdomById: getKingdomById,
  getAllKingdomsByUserId: getAllKingdomsByUserId,
  getDTOAllKingdoms: getDTOAllKingdoms
};
exports["default"] = _default;
//# sourceMappingURL=kingdom-service.js.map