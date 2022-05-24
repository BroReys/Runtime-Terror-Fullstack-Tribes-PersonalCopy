"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var AttackerLostTroops = _database["default"].define('attacker_lost_troops', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  type: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  quantity: {
    type: _sequelize["default"].INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

var _default = AttackerLostTroops;
exports["default"] = _default;
//# sourceMappingURL=attacker-lost-troops-in-battle.js.map