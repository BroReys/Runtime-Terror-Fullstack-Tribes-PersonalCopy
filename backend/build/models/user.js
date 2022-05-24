"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireWildcard(require("sequelize"));

var _database = _interopRequireDefault(require("../config/database"));

var _generateConfirmationToken = _interopRequireDefault(require("../utilities/generate-confirmation-token"));

var _generateDayExpirationNumber = _interopRequireDefault(require("../utilities/generate-day-expiration-number"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var User = _database["default"].define('user', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  username: {
    type: _sequelize["default"].STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: _sequelize["default"].STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  active: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  hadKingdomAlready: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: false
  },
  registrationToken: {
    type: _sequelize["default"].STRING(24),
    validate: {
      is: /^[a-z A-Z0-9]+$/i
    },
    unique: true,
    defaultValue: _generateConfirmationToken["default"]
  },
  registrationTokenExpiresAt: {
    type: _sequelize["default"].DOUBLE,
    defaultValue: _generateDayExpirationNumber["default"],
    allowNull: false
  },
  forgottenPasswordToken: {
    type: _sequelize["default"].STRING,
    unique: true,
    allowNull: true,
    defaultValue: null
  },
  forgottenPasswordTokenExpiresAt: {
    type: _sequelize["default"].DOUBLE,
    allowNull: true,
    defaultValue: null
  },
  registeredAt: {
    type: _sequelize["default"].DOUBLE
  }
}, {
  timestamps: false,
  hooks: {
    beforeCreate: function beforeCreate(record) {
      record.registeredAt = Math.floor(Date.now() / 1000);
    }
  }
});

var _default = User;
exports["default"] = _default;
//# sourceMappingURL=user.js.map