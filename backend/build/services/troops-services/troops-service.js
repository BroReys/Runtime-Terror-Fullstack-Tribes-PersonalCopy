"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _troopsRepository = _interopRequireDefault(require("../../repositories/troops-repositories/troops-repository"));

var _kingdomRepository = _interopRequireDefault(require("../../repositories/kingdom-repository"));

var _troopsRules = require("../../rules/troops-rules");

var _unitLevelService = _interopRequireDefault(require("../unit-level-service"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var listAllRecruitedKingdomTroops = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(kingdomId, user) {
    var authenticatedUserKingdom;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _kingdomRepository["default"].findKingdomById(kingdomId);

          case 2:
            authenticatedUserKingdom = _context.sent;

            if (authenticatedUserKingdom) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", "kingdom_not_exists");

          case 7:
            if (!(user.id !== authenticatedUserKingdom.userId)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", "no_authorized");

          case 11:
            return _context.abrupt("return", "ok");

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function listAllRecruitedKingdomTroops(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // --->used in middleware to join the troop army<---


var joinTroopArmy = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(type, quantity, kingdomId) {
    var troops, unitLevel, unitLevelId, troop;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _troopsRepository["default"].findRecruitedTroopTypeByKingdomId(kingdomId, type);

          case 2:
            troops = _context2.sent;

            if (!troops) {
              _context2.next = 9;
              break;
            }

            troops.quantity += quantity;
            _context2.next = 7;
            return troops.save();

          case 7:
            _context2.next = 18;
            break;

          case 9:
            _context2.next = 11;
            return _unitLevelService["default"].findUnitLevelByTroopTypeAndKingdomId(kingdomId, type);

          case 11:
            unitLevel = _context2.sent;

            if (unitLevel) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", null);

          case 14:
            unitLevelId = unitLevel.id;
            troop = {
              type: type,
              kingdomId: kingdomId,
              quantity: quantity,
              unitLevelId: unitLevelId
            };
            _context2.next = 18;
            return _troopsRepository["default"].createTroop(troop);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function joinTroopArmy(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var countTroopsInKingdom = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(kingdomId) {
    var sum, kingdomTroops, _iterator, _step, troop;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            sum = 0;
            _context3.next = 3;
            return _troopsRepository["default"].findRecruitedKingdomTroops(kingdomId);

          case 3:
            kingdomTroops = _context3.sent;

            if (kingdomTroops) {
              _iterator = _createForOfIteratorHelper(kingdomTroops);

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  troop = _step.value;
                  sum += troop.quantity;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }

            console.log(sum);
            return _context3.abrupt("return", sum);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function countTroopsInKingdom(_x6) {
    return _ref3.apply(this, arguments);
  };
}();

var countTroopsInBattle = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(kingdomId) {
    var sum, kingdomTroops, _iterator2, _step2, troop;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            sum = 0;
            _context4.next = 3;
            return _troopsRepository["default"].findRecruitedKingdomTroops(kingdomId);

          case 3:
            kingdomTroops = _context4.sent;

            if (kingdomTroops) {
              _iterator2 = _createForOfIteratorHelper(kingdomTroops);

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  troop = _step2.value;
                  sum += troop.quantityInBattle;
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }

            console.log(sum);
            return _context4.abrupt("return", sum);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function countTroopsInBattle(_x7) {
    return _ref4.apply(this, arguments);
  };
}();

var countFoodConsumption = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(kingdomId) {
    var food, kingdomTroops, _iterator3, _step3, troop;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            food = 0;
            _context5.next = 3;
            return _troopsRepository["default"].findRecruitedKingdomTroops(kingdomId);

          case 3:
            kingdomTroops = _context5.sent;

            if (kingdomTroops) {
              _iterator3 = _createForOfIteratorHelper(kingdomTroops);

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  troop = _step3.value;
                  food += (0, _troopsRules.troopRules)()[troop.type].foodConsumption * (troop.quantity + troop.quantityInBattle);
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }

            return _context5.abrupt("return", food);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function countFoodConsumption(_x8) {
    return _ref5.apply(this, arguments);
  };
}();

var killRandomTroop = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(kingdomId) {
    var randomTroop;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _troopsRepository["default"].findRandomKingdomTroop(kingdomId);

          case 2:
            randomTroop = _context6.sent;
            randomTroop.quantity -= 1;
            _context6.next = 6;
            return randomTroop.save();

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function killRandomTroop(_x9) {
    return _ref6.apply(this, arguments);
  };
}();

var killRandomTroopInBattle = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(kingdomId) {
    var randomTroop, randomTroopInBattle;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _troopsRepository["default"].findRandomKingdomTroopInBattle(kingdomId);

          case 2:
            randomTroop = _context7.sent;

            if (!(randomTroop.type !== "settlers")) {
              _context7.next = 7;
              break;
            }

            _context7.next = 6;
            return _troopsRepository["default"].findTroopInBattle(randomTroop.type, kingdomId);

          case 6:
            randomTroopInBattle = _context7.sent;

          case 7:
            if (!randomTroop) {
              _context7.next = 11;
              break;
            }

            randomTroop.quantityInBattle -= 1;
            _context7.next = 11;
            return randomTroop.save();

          case 11:
            if (!randomTroopInBattle) {
              _context7.next = 15;
              break;
            }

            randomTroopInBattle.quantity -= 1;
            _context7.next = 15;
            return randomTroopInBattle.save();

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function killRandomTroopInBattle(_x10) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = {
  listAllRecruitedKingdomTroops: listAllRecruitedKingdomTroops,
  joinTroopArmy: joinTroopArmy,
  countTroopsInKingdom: countTroopsInKingdom,
  countTroopsInBattle: countTroopsInBattle,
  countFoodConsumption: countFoodConsumption,
  killRandomTroop: killRandomTroop,
  killRandomTroopInBattle: killRandomTroopInBattle
};
exports["default"] = _default;
//# sourceMappingURL=troops-service.js.map