'use strict';

import generateConfirmationToken
  from "../../src/utilities/generate-confirmation-token";
import expiresIn from "../../src/utilities/generate-day-expiration-number";
import Sequelize, {DataTypes, DATE} from "sequelize";

export default {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
        allowNull: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
        type: Sequelize.STRING,
        defaultValue: expiresIn,
        allowNull: false
      }, forgottenPasswordToken: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
        defaultValue: null
      },
      forgottenPasswordTokenExpiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      registeredAt: {
        type: Sequelize.DOUBLE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
