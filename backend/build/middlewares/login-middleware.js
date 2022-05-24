"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("dotenv/config");

var loginMiddleware = function loginMiddleware(req, res, next) {
  //get the token from the header if present
  var tokenInHeader = req.headers["authorization"];
  var token; //if no token found, return response (without going to the next middelware)

  if (!tokenInHeader) {
    return res.status(401).send("Access denied. No token provided.");
  } else {
    token = tokenInHeader.split(' ')[1];
  }

  try {
    //if can verify the token, set req.user and pass to next middleware
    var decoded = _jsonwebtoken["default"].verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};

var _default = loginMiddleware;
exports["default"] = _default;
//# sourceMappingURL=login-middleware.js.map