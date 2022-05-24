"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var Battle = _database["default"].define('battle', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  startedAt: {
    type: _sequelize["default"].DOUBLE,
    defaultValue: Math.floor(Date.now() / 1000),
    allowNull: false
  },
  timeOfArrival: {
    type: _sequelize["default"].DOUBLE,
    allowNull: true
  },
  timeOfComeback: {
    type: _sequelize["default"].DOUBLE,
    allowNull: true
  },
  isFinished: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  // when listing battles -> sorted by not finished at the top, then by time of arrival
  result: {
    type: _sequelize["default"].STRING,
    defaultValue: null
  },
  stolenFood: {
    type: _sequelize["default"].INTEGER,
    defaultValue: null
  },
  stolenGold: {
    type: _sequelize["default"].INTEGER,
    defaultValue: null
  },
  possibleBanditsReward: {
    type: _sequelize["default"].INTEGER,
    defaultValue: null
  }
}, {
  timestamps: false
});

var _default = Battle;
exports["default"] = _default;
//# sourceMappingURL=battle.js.map