"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _kingdomRepository = _interopRequireDefault(require("../../repositories/kingdom-repository"));

var _troopsRules = require("../../rules/troops-rules");

var _generateTroopCreationTime = _interopRequireDefault(require("../../utilities/generate-troop-creation-time"));

var _troopsInBarracksRepository = _interopRequireDefault(require("../../repositories/troops-repositories/troops-in-barracks-repository"));

var _troopCreationCheck = require("../../utilities/troop-creation-check");

var _troopsRepository = _interopRequireDefault(require("../../repositories/troops-repositories/troops-repository"));

var trainTroop = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(type, quantity, kingdomId, user) {
    var authenticatedUserKingdom, settlersInBarracks, settlers, troops, i, troop, kingdomTroopsInBarracksByType, maxEndtime, _i;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _kingdomRepository["default"].findKingdomById(kingdomId);

          case 2:
            authenticatedUserKingdom = _context.sent;

            if (!(!type || !quantity)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", "missing_field");

          case 7:
            if (authenticatedUserKingdom) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", "kingdom_not_exists");

          case 11:
            if (!(user.id !== authenticatedUserKingdom.userId)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", "wrong_kingdom_id");

          case 15:
            if ((0, _troopsRules.troopRules)().type.includes(type)) {
              _context.next = 19;
              break;
            }

            return _context.abrupt("return", "wrong_type");

          case 19:
            if (!(type === "settlers" && quantity > 1)) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", "settler_only_one");

          case 23:
            _context.next = 25;
            return (0, _troopCreationCheck.canAfford)(kingdomId, type, quantity);

          case 25:
            if (_context.sent) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", "no_gold");

          case 29:
            if (!(type === "settlers")) {
              _context.next = 38;
              break;
            }

            _context.next = 32;
            return _troopsInBarracksRepository["default"].findKingdomTroopsInBarracksByTypeAndOrderByEndtimeDesc(kingdomId);

          case 32:
            settlersInBarracks = _context.sent;
            _context.next = 35;
            return _troopsRepository["default"].findRecruitedTroopTypeByKingdomId(kingdomId, type);

          case 35:
            settlers = _context.sent;

            if (!(settlersInBarracks || settlers.quantity > 0 || settlers.quantityInBattle > 0)) {
              _context.next = 38;
              break;
            }

            return _context.abrupt("return", "already_built_settler");

          case 38:
            troops = [];

            for (i = 1; i <= quantity; i++) {
              troop = {
                kingdomId: kingdomId,
                type: type,
                isTrained: false,
                startTime: 0,
                endTime: 0
              };
              troops.push(troop);
            } // -----> necessary to look into troops in barracks table and check whether same type of troop is training <-----


            _context.next = 42;
            return _troopsInBarracksRepository["default"].findKingdomTroopsInBarracksByTypeAndOrderByEndtimeDesc(kingdomId, type);

          case 42:
            kingdomTroopsInBarracksByType = _context.sent;

            // -----> check if such troop is still training by accesing returned object and get into array <-----
            if (kingdomTroopsInBarracksByType[0].length !== 0) {
              maxEndtime = kingdomTroopsInBarracksByType[0][0].endTime;
            }

            for (_i = 0; _i < troops.length; _i++) {
              // ----> firstly access first element of array - first troop to create <----
              if (_i === 0) {
                // ----> then check if maxEndtime is truthy - if yes, it means there is already a troop of same type still training <----
                if (maxEndtime && !(Math.floor(Date.now() / 1000) >= maxEndtime)) {
                  // ----> if there is a troop still, we need to set the start of  next batch of sent to academy
                  // according to the latest time of troop which is still training <----
                  troops[_i].startTime = maxEndtime;
                  troops[_i].endTime = _generateTroopCreationTime["default"].createsAtWhenPreviousExists(type, maxEndtime);
                } else {
                  // ---> if maxEndtime is falsy or smaller than Date.now set start time of first troop in batch according to Date.now
                  troops[_i].startTime = Math.floor(Date.now() / 1000);
                  troops[_i].endTime = _generateTroopCreationTime["default"].createsAt(type);
                }
              } else {
                // ---> this sets time of next troop in the loop after 0 index troop
                troops[_i].startTime = troops[_i - 1].endTime;
                troops[_i].endTime = troops[_i - 1].endTime + _generateTroopCreationTime["default"].createsAtNextTroop(type);
              }
            }

            _context.next = 47;
            return _troopsInBarracksRepository["default"].bulkCreateTroops(troops);

          case 47:
            return _context.abrupt("return", "ok");

          case 48:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function trainTroop(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var findKingdomTroopsInBarracks = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(kingdomId) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _troopsInBarracksRepository["default"].findKingdomTroopsInBarracks(kingdomId);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findKingdomTroopsInBarracks(_x5) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  trainTroop: trainTroop,
  findKingdomTroopsInBarracks: findKingdomTroopsInBarracks
};
exports["default"] = _default;
//# sourceMappingURL=troops-in-barracks-service.js.map