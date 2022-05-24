import Sequelize from "sequelize";
import sequelize from "../../config/database";
import Kingdom from "../kingdom";
import UnitLevel from "../unit-level";

const Troops = sequelize.define("troops", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      kingdomId: {
        type: Sequelize.INTEGER,
        references: {
          model: Kingdom,
          key: 'id'
        }
      },
      unitLevelId: {
        type: Sequelize.INTEGER,
        references: {
          model: UnitLevel,
          key: 'id'
        }
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantityInBattle: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      destroyTime: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      timeOfArrival: {
        type: Sequelize.DOUBLE,
        defaultValue: null
      },
      timeOfComeback: {
        type: Sequelize.DOUBLE,
        defaultValue: null
      },
      coordinateX: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      coordinateY: {
        type: Sequelize.INTEGER,
        defaultValue: null
      }
    }, {
      timestamps: false
    }
);

export default Troops
