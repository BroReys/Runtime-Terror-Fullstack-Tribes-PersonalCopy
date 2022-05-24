"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _kingdom = _interopRequireDefault(require("./kingdom"));

var Unit_level = _database["default"].define("unit_level", {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  kingdomId: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: _kingdom["default"],
      key: 'id'
    }
  },
  type: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  upgradeLevel: {
    type: _sequelize["default"].INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  timestamps: false
});

var _default = Unit_level;
exports["default"] = _default;
//# sourceMappingURL=unit-level.js.map