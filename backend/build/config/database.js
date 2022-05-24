"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

require("dotenv/config");

var _process$env = process.env,
    DATABASE_NAME = _process$env.DATABASE_NAME,
    DATABASE_USERNAME = _process$env.DATABASE_USERNAME,
    DATABASE_PASSWORD = _process$env.DATABASE_PASSWORD,
    DATABASE_HOST = _process$env.DATABASE_HOST,
    DIALECT = _process$env.DIALECT;
var sequelize = new _sequelize.Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  dialect: DIALECT || "mysql",
  host: DATABASE_HOST
});
var _default = sequelize;
exports["default"] = _default;
//# sourceMappingURL=database.js.map