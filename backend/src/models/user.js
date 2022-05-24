import Sequelize, {DataTypes, DATE} from "sequelize";
import sequelize from "../config/database";
import generateConfirmationToken
  from "../utilities/generate-confirmation-token";
import expiresIn from '../utilities/generate-day-expiration-number'

const User = sequelize.define('user', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      hadKingdomAlready: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      registrationToken: {
        type: Sequelize.STRING(24),
        validate: {
          is: /^[a-z A-Z0-9]+$/i
        },
        unique: true,
        defaultValue: generateConfirmationToken
      },
      registrationTokenExpiresAt: {
        type: Sequelize.DOUBLE,
        defaultValue: expiresIn,
        allowNull: false
      },
      forgottenPasswordToken: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
        defaultValue: null
      },
      forgottenPasswordTokenExpiresAt: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: null
      },
      registeredAt: {
        type: Sequelize.DOUBLE
      }
    }, {
      timestamps: false,
      hooks: {
        beforeCreate: (record) => {
          record.registeredAt = Math.floor(Date.now() / 1000);
        }
      }
    }
)

export default User;
