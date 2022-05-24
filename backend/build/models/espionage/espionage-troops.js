"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var EspionageTroops = _database["default"].define('espionage_troop', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  type: {
    type: _sequelize["default"].STRING,
    defaultValue: null,
    allowNull: true
  },
  level: {
    type: _sequelize["default"].INTEGER,
    defaultValue: null,
    allowNull: true
  }
}, {
  timestamps: false
});

var _default = EspionageTroops;
exports["default"] = _default;
//# sourceMappingURL=espionage-troops.js.map