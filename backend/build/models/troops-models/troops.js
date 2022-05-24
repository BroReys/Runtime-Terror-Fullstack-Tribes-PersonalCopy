"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../../config/database"));

var _kingdom = _interopRequireDefault(require("../kingdom"));

var _unitLevel = _interopRequireDefault(require("../unit-level"));

var Troops = _database["default"].define("troops", {
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
  unitLevelId: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: _unitLevel["default"],
      key: 'id'
    }
  },
  type: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  quantity: {
    type: _sequelize["default"].INTEGER,
    allowNull: false
  },
  quantityInBattle: {
    type: _sequelize["default"].INTEGER,
    defaultValue: 0
  },
  destroyTime: {
    type: _sequelize["default"].STRING,
    defaultValue: null
  },
  timeOfArrival: {
    type: _sequelize["default"].DOUBLE,
    defaultValue: null
  },
  timeOfComeback: {
    type: _sequelize["default"].DOUBLE,
    defaultValue: null
  },
  coordinateX: {
    type: _sequelize["default"].INTEGER,
    defaultValue: null
  },
  coordinateY: {
    type: _sequelize["default"].INTEGER,
    defaultValue: null
  }
}, {
  timestamps: false
});

var _default = Troops;
exports["default"] = _default;
//# sourceMappingURL=troops.js.map