"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../../config/database"));

var Chat = _database["default"].define('chat', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  subject: {
    type: _sequelize["default"].STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

var _default = Chat;
exports["default"] = _default;
//# sourceMappingURL=chat.js.map