"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _rules = require("../rules/rules");

var _kingdomService = _interopRequireDefault(require("../services/kingdom-service"));

var _buildingService = _interopRequireDefault(require("../services/building-service"));

var _troopsService = _interopRequireDefault(require("../services/troops-services/troops-service"));

var _resourcesService = _interopRequireDefault(require("../services/resources-service"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var update_middleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var kingdoms, _iterator, _step, kingdom, currentTick, elapsedTicks;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _kingdomService["default"].getAllKingdomsByUserId(req.user.id);

          case 2:
            kingdoms = _context.sent;

            if (!kingdoms) {
              _context.next = 26;
              break;
            }

            _iterator = _createForOfIteratorHelper(kingdoms);
            _context.prev = 5;

            _iterator.s();

          case 7:
            if ((_step = _iterator.n()).done) {
              _context.next = 18;
              break;
            }

            kingdom = _step.value;
            //how many whole ticks elapsed from last sync
            currentTick = Math.floor(Date.now() / 1000);
            elapsedTicks = (currentTick - kingdom.lastTick) / (0, _rules.rules)().tick_length;
            elapsedTicks = Math.floor(elapsedTicks); //if no tick elapsed, skip to next Kingdom

            if (!(elapsedTicks === 0)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("continue", 16);

          case 14:
            _context.next = 16;
            return _resourcesService["default"].updateResources(kingdom, currentTick);

          case 16:
            _context.next = 7;
            break;

          case 18:
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](5);

            _iterator.e(_context.t0);

          case 23:
            _context.prev = 23;

            _iterator.f();

            return _context.finish(23);

          case 26:
            next();

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 20, 23, 26]]);
  }));

  return function update_middleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = update_middleware;
exports["default"] = _default;
//# sourceMappingURL=resources-middleware.js.map