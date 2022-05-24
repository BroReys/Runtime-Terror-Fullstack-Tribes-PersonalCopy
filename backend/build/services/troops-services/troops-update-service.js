"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _troopsInBarracksRepository = _interopRequireDefault(require("../../repositories/troops-repositories/troops-in-barracks-repository"));

var _troopsRules = require("../../rules/troops-rules");

var _troopsService = _interopRequireDefault(require("./troops-service"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getUpdateBreakpoints = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(kingdomId, currentTick) {
    var breakpoints, troopsInBarracks, _iterator, _step, troop;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            breakpoints = [];
            _context.next = 3;
            return _troopsInBarracksRepository["default"].findAllByKingdomIdAndUntil(kingdomId, currentTick);

          case 3:
            troopsInBarracks = _context.sent;
            _iterator = _createForOfIteratorHelper(troopsInBarracks);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                troop = _step.value;
                breakpoints.push(troop.endTime);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return _context.abrupt("return", breakpoints);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUpdateBreakpoints(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var updateTroops = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(kingdomId, currentTick) {
    var troopTypes, i, trainedTroopsInBarracks, quantity;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            troopTypes = (0, _troopsRules.troopRules)().type;
            i = 0;

          case 2:
            if (!(i < troopTypes.length)) {
              _context2.next = 12;
              break;
            }

            _context2.next = 5;
            return _troopsInBarracksRepository["default"].findTrainedKingdomTroopsInBarracksByType(kingdomId, troopTypes[i], currentTick);

          case 5:
            trainedTroopsInBarracks = _context2.sent;
            // --->u have to access first element, because sequalize returns object tree - [results][metadata]<---
            quantity = trainedTroopsInBarracks[0].length; //--->if there are troops, call joinTroopArmy

            _context2.next = 9;
            return _troopsService["default"].joinTroopArmy(troopTypes[i], quantity, kingdomId);

          case 9:
            i++;
            _context2.next = 2;
            break;

          case 12:
            _context2.next = 14;
            return _troopsInBarracksRepository["default"].deleteAllAlreadyTrainedTroops();

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateTroops(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  getUpdateBreakpoints: getUpdateBreakpoints,
  updateTroops: updateTroops
};
exports["default"] = _default;
//# sourceMappingURL=troops-update-service.js.map