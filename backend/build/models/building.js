"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../config/database"));

var Building = _database["default"].define("building", {
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
  position: {
    type: _sequelize["default"].INTEGER,
    min: 0,
    allowNull: false
  },
  status: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  level: {
    type: _sequelize["default"].INTEGER,
    allowNull: false
  },
  startTime: {
    type: _sequelize["default"].DOUBLE,
    allowNull: false
  },
  endTime: {
    type: _sequelize["default"].DOUBLE,
    allowNull: false
  },
  destroyTime: {
    type: _sequelize["default"].DOUBLE,
    allowNull: true
  }
}, {
  timestamps: false
});

var _default = Building;
exports["default"] = _default;
//# sourceMappingURL=building.js.map