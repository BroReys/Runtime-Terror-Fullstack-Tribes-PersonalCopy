"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../../config/database"));

var _kingdom = _interopRequireDefault(require("../kingdom"));

var Troops_in_barracks = _database["default"].define("troops_in_barracks", {
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
  startTime: {
    type: _sequelize["default"].DOUBLE,
    allowNull: false
  },
  endTime: {
    type: _sequelize["default"].DOUBLE,
    allowNull: false
  }
}, {
  timestamps: false,
  hooks: {
    beforeCreate: function beforeCreate(record) {
      record.lastTick = Math.floor(Date.now() / 1000);
    }
  }
});

var _default = Troops_in_barracks;
exports["default"] = _default;
//# sourceMappingURL=troops-in-barracks.js.map