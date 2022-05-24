"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../../config/database"));

var _chat = _interopRequireDefault(require("./chat"));

var _user = _interopRequireDefault(require("../user"));

var ChatMembers = _database["default"].define('chat_members', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  chatId: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: _chat["default"],
      key: 'id'
    }
  },
  userId: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: _user["default"],
      key: 'id'
    }
  },
  lastViewed: {
    type: 'TIMESTAMP',
    defaultValue: _sequelize["default"].literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
});

var _default = ChatMembers;
exports["default"] = _default;
//# sourceMappingURL=chat-members.js.map