import Sequelize from "sequelize";
import sequelize from "../config/database";

const Kingdom = sequelize.define('kingdom', {
      //TODO DEFAULT VALUES FOR RESOURCES
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      coordinateX: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      coordinateY: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      gold: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 0,
        defaultValue: 0
      },
      food: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 0,
        defaultValue: 0
      },
      goldProduction: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 0,
        defaultValue: 0
      },
      foodProduction: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 0,
        defaultValue: 0
      },
      lastTick: {
        type: Sequelize.DOUBLE
      },
      loyalty: {
        type: Sequelize.INTEGER,
        defaultValue: 100,
        min: 0,
        max: 100
      },
      createdAt: {
        type: Sequelize.DOUBLE,
        defaultValue: Math.floor(Date.now() / 1000)
      },
      deletedAt: {
        type: Sequelize.DOUBLE,
        defaultValue: null,
        allowNull: true
      },
      acquiredAt: {
        type: Sequelize.DOUBLE,
        defaultValue: Math.floor(Date.now() / 1000)
      },
    }, {
      hooks: {
        beforeCreate: (record) => {
          record.lastTick = Math.floor(Date.now() / 1000);
        }
      }
    }
);

export default Kingdom;
