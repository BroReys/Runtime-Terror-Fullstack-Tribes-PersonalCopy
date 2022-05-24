"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mapService = _interopRequireDefault(require("../services/map-service"));

var postMap = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, coordinateX, coordinateY, response;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, coordinateX = _req$body.coordinateX, coordinateY = _req$body.coordinateY;
            _context.next = 3;
            return _mapService["default"].identifyKingdom(coordinateX, coordinateY);

          case 3:
            response = _context.sent;

            if (response.error) {
              res.status(400).json(response);
            } else {
              res.status(200).json(response);
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function postMap(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  postMap: postMap
};
exports["default"] = _default;
//# sourceMappingURL=map-controller.js.map