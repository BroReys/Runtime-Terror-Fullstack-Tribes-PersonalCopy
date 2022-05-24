"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../config/database"));

var Kingdom = _database["default"].define('kingdom', {
  //TODO DEFAULT VALUES FOR RESOURCES
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  name: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  coordinateX: {
    type: _sequelize["default"].INTEGER,
    allowNull: true
  },
  coordinateY: {
    type: _sequelize["default"].INTEGER,
    allowNull: true
  },
  gold: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    min: 0,
    defaultValue: 0
  },
  food: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    min: 0,
    defaultValue: 0
  },
  goldProduction: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    min: 0,
    defaultValue: 0
  },
  foodProduction: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    min: 0,
    defaultValue: 0
  },
  lastTick: {
    type: _sequelize["default"].DOUBLE
  },
  loyalty: {
    type: _sequelize["default"].INTEGER,
    defaultValue: 100,
    min: 0,
    max: 100
  },
  createdAt: {
    type: _sequelize["default"].DOUBLE,
    defaultValue: Math.floor(Date.now() / 1000)
  },
  deletedAt: {
    type: _sequelize["default"].DOUBLE,
    defaultValue: null,
    allowNull: true
  }
}, {
  hooks: {
    beforeCreate: function beforeCreate(record) {
      record.lastTick = Math.floor(Date.now() / 1000);
    }
  }
});

var _default = Kingdom;
exports["default"] = _default;
//# sourceMappingURL=kingdom.js.map