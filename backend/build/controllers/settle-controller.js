"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _authenticationMiddleware = _interopRequireDefault(require("../middlewares/authentication-middleware"));

var _mapService = _interopRequireDefault(require("../services/map-service"));

var _userService = _interopRequireDefault(require("../services/user-service"));

var _errorMessage = _interopRequireDefault(require("../utilities/error-message"));

var _troopsRules = require("../rules/troops-rules");

var _kingdomRepository = _interopRequireDefault(require("../repositories/kingdom-repository"));

var _settleService = _interopRequireDefault(require("../services/settle-service"));

var startSettlersPilgrimage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var token, settlerRuler, settlerKingdomId, settlerKingdom, coordinateX, coordinateY, tileStatus, troops, settlersOnPilgrimage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.user;
            _context.next = 3;
            return _userService["default"].findById(req.user.id);

          case 3:
            settlerRuler = _context.sent;
            settlerKingdomId = req.params.kingdomId;
            _context.next = 7;
            return _kingdomRepository["default"].findKingdomById(settlerKingdomId);

          case 7:
            settlerKingdom = _context.sent;
            coordinateX = req.body.coordinateX;
            coordinateY = req.body.coordinateY;
            _context.next = 12;
            return _mapService["default"].identifyKingdom(coordinateX, coordinateY);

          case 12:
            tileStatus = _context.sent;
            troops = req.body.troops;

            if (!(token === null || token === undefined)) {
              _context.next = 18;
              break;
            }

            res.status(401).json((0, _errorMessage["default"])('Token is missing!'));
            _context.next = 52;
            break;

          case 18:
            if (settlerRuler) {
              _context.next = 22;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('User not found!'));
            _context.next = 52;
            break;

          case 22:
            if (settlerKingdom) {
              _context.next = 26;
              break;
            }

            res.status(404).json((0, _errorMessage["default"])('Kingdom not found!'));
            _context.next = 52;
            break;

          case 26:
            if (!(tileStatus.status !== 'free')) {
              _context.next = 30;
              break;
            }

            res.status(403).json((0, _errorMessage["default"])('Target tile not valid or is not free!'));
            _context.next = 52;
            break;

          case 30:
            if (troops) {
              _context.next = 34;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Settlers must be defined!'));
            _context.next = 52;
            break;

          case 34:
            if (doTroopsHaveTypeSettlers(troops)) {
              _context.next = 38;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Only settlers can be part of pilgrimage to settle new Kingdom!'));
            _context.next = 52;
            break;

          case 38:
            if (isTroopQuantitySpecified(troops)) {
              _context.next = 42;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Valid quantity of troops must be specified!'));
            _context.next = 52;
            break;

          case 42:
            _context.next = 44;
            return doesRulerHaveEnoughSettlers(settlerKingdom, troops);

          case 44:
            if (_context.sent) {
              _context.next = 48;
              break;
            }

            res.status(400).json((0, _errorMessage["default"])('Not enough settlers in kingdom!'));
            _context.next = 52;
            break;

          case 48:
            _context.next = 50;
            return _settleService["default"].initiatePilgrimageToSettleKingdom(settlerRuler, settlerKingdom, coordinateX, coordinateY, troops);

          case 50:
            settlersOnPilgrimage = _context.sent;
            res.json(settlersOnPilgrimage);

          case 52:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function startSettlersPilgrimage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var doTroopsHaveTypeSettlers = function doTroopsHaveTypeSettlers(troops) {
  var doTroopsHaveTypeSettlers = true;

  for (var i = 0; i < troops.length; i++) {
    if (!troops[i].type && troops[i].type !== 'settlers') {
      var _doTroopsHaveTypeSettlers = false;
      return _doTroopsHaveTypeSettlers;
    }
  }

  return doTroopsHaveTypeSettlers;
};

var isTroopQuantitySpecified = function isTroopQuantitySpecified(troops) {
  var isTroopQuantitySpecified = true;

  for (var i = 0; i < troops.length; i++) {
    if (!troops[i].quantity || troops[i].quantity < 0 || isNaN(troops[i].quantity)) {
      isTroopQuantitySpecified = false;
      return isTroopQuantitySpecified;
    }
  }

  return isTroopQuantitySpecified;
};

function doesRulerHaveEnoughSettlers(_x3, _x4) {
  return _doesRulerHaveEnoughSettlers.apply(this, arguments);
}

function _doesRulerHaveEnoughSettlers() {
  _doesRulerHaveEnoughSettlers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(settlerKingdom, troopsToSettle) {
    var troops, settler, doesRulerHaveEnoughSettlers;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return settlerKingdom.getTroops();

          case 2:
            troops = _context2.sent;
            _context2.next = 5;
            return troops.filter(function (troop) {
              return troop.type === 'settlers';
            });

          case 5:
            settler = _context2.sent;
            doesRulerHaveEnoughSettlers = true;

            if (!(troopsToSettle[0].quantity > settler[0].quantity)) {
              _context2.next = 10;
              break;
            }

            doesRulerHaveEnoughSettlers = false;
            return _context2.abrupt("return", doesRulerHaveEnoughSettlers);

          case 10:
            return _context2.abrupt("return", doesRulerHaveEnoughSettlers);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _doesRulerHaveEnoughSettlers.apply(this, arguments);
}

var _default = {
  startSettlersPilgrimage: startSettlersPilgrimage
};
exports["default"] = _default;
//# sourceMappingURL=settle-controller.js.map