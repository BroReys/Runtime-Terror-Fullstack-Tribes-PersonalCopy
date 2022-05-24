"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../../config/database"));

var Message = _database["default"].define('message', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  text: {
    type: _sequelize["default"].STRING,
    allowNull: false
  }
}, {
  updatedAt: false
});

var _default = Message;
exports["default"] = _default;
//# sourceMappingURL=message.js.map