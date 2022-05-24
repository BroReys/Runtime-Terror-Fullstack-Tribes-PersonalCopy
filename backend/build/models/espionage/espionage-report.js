"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var EspionageReport = _database["default"].define('espionage_report', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  totalTroops: {
    type: _sequelize["default"].INTEGER,
    defaultValue: 0
  },
  totalAttackPower: {
    type: _sequelize["default"].INTEGER,
    defaultValue: 0
  },
  totalDefensePower: {
    type: _sequelize["default"].INTEGER,
    defaultValue: 0
  },
  gold: {
    type: _sequelize["default"].INTEGER,
    defaultValue: 0
  },
  food: {
    type: _sequelize["default"].INTEGER,
    defaultValue: 0
  },
  loyalty: {
    type: _sequelize["default"].INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: false
});

var _default = EspionageReport;
exports["default"] = _default;
//# sourceMappingURL=espionage-report.js.map