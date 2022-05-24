"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _rules = require("../rules/rules");

var _map = _interopRequireDefault(require("../models/map"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var mapSize = (0, _rules.rules)(1).board_size;

var identifyKingdom = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(coordinateX, coordinateY) {
    var error, map, result, _iterator, _step, kingdom;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            error = "One or both provided coordinates are out of range!";

            if (!(!Number.isSafeInteger(coordinateX) || !Number.isSafeInteger(coordinateY))) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", {
              "error": error
            });

          case 3:
            if (!(coordinateX == null || coordinateY == null)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", {
              "error": error
            });

          case 5:
            if (!(coordinateX >= mapSize || coordinateX < 0 || coordinateY >= mapSize || coordinateY < 0)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", {
              "error": error
            });

          case 7:
            _context.next = 9;
            return _map["default"].get();

          case 9:
            map = _context.sent;
            result = {
              "username": null,
              "kingdomName": null,
              "status": "free"
            };
            _iterator = _createForOfIteratorHelper(map);
            _context.prev = 12;

            _iterator.s();

          case 14:
            if ((_step = _iterator.n()).done) {
              _context.next = 21;
              break;
            }

            kingdom = _step.value;

            if (!(kingdom.coordinateX === coordinateX && kingdom.coordinateY === coordinateY)) {
              _context.next = 19;
              break;
            }

            result = {
              "username": kingdom.username,
              "kingdomName": kingdom.name,
              "status": "taken"
            };
            return _context.abrupt("return", result);

          case 19:
            _context.next = 14;
            break;

          case 21:
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](12);

            _iterator.e(_context.t0);

          case 26:
            _context.prev = 26;

            _iterator.f();

            return _context.finish(26);

          case 29:
            return _context.abrupt("return", result);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[12, 23, 26, 29]]);
  }));

  return function identifyKingdom(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  identifyKingdom: identifyKingdom
};
exports["default"] = _default;
//# sourceMappingURL=map-service.js.map