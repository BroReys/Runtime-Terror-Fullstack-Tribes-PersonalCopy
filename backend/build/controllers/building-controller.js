"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _buildingService = _interopRequireDefault(require("../services/building-service"));

var getBuildingsByKingdomId = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var kingdomId, userId, response, idError, authenticationError;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            kingdomId = req.params.kingdomId;
            userId = req.user.id;
            _context.next = 4;
            return _buildingService["default"].getBuildings(kingdomId, userId);

          case 4:
            response = _context.sent;
            idError = response.idError;
            authenticationError = response.authenticationError;

            if (idError) {
              res.status(400).json(idError);
            } else if (authenticationError) {
              res.status(401).json(authenticationError);
            } else {
              res.status(200).json(response);
            }

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getBuildingsByKingdomId(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var addBuildingToKingdom = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var kingdomId, type, userId, response, idError, inputError, resourceError, authenticationError;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            kingdomId = req.params.kingdomId;
            type = req.body.type;
            userId = req.user.id;
            _context2.next = 5;
            return _buildingService["default"].addBuildingToKingdom(kingdomId, type, userId);

          case 5:
            response = _context2.sent;
            idError = response.idError;
            inputError = response.inputError;
            resourceError = response.resourceError;
            authenticationError = response.authenticationError;

            if (idError) {
              res.status(400).json(idError);
            } else if (inputError) {
              res.status(400).json(inputError);
            } else if (resourceError) {
              res.status(400).json(resourceError);
            } else if (authenticationError) {
              res.status(401).json(authenticationError);
            } else {
              res.status(200).json(response);
            }

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addBuildingToKingdom(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var upgradeOrTeardownBuilding = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var kingdomId, buildingId, action, instant, response, inputError, resourceError, buildingIdError, kingdomIdError, authenticationError;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            kingdomId = req.params.kingdomId;
            buildingId = req.params.buildingId;
            action = req.body.action;
            instant = req.body.instant;
            _context3.next = 6;
            return _buildingService["default"].upgradeOrTeardownBuilding(kingdomId, buildingId, action, instant);

          case 6:
            response = _context3.sent;
            inputError = response.inputError;
            resourceError = response.resourceError;
            buildingIdError = response.buildingIdError;
            kingdomIdError = response.kingdomIdError;
            authenticationError = response.authenticationError;

            if (buildingIdError) {
              res.status(400).json(buildingIdError);
            } else if (kingdomIdError) {
              res.status(400).json(kingdomIdError);
            } else if (inputError) {
              res.status(400).json(inputError);
            } else if (resourceError) {
              res.status(400).json(resourceError);
            } else if (authenticationError) {
              res.status(401).json(authenticationError);
            } else {
              res.status(200).json(response);
            }

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function upgradeOrTeardownBuilding(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  getBuildingsByKingdomId: getBuildingsByKingdomId,
  addBuildingToKingdom: addBuildingToKingdom,
  upgradeOrTeardownBuilding: upgradeOrTeardownBuilding
};
exports["default"] = _default;
//# sourceMappingURL=building-controller.js.map