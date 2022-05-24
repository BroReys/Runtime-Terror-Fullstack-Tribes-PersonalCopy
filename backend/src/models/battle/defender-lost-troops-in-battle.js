import sequelize from "../../config/database";
import Sequelize from "sequelize";

const DefenderLostTroopsAndBuildings = sequelize.define(
    'defender_lost_troops_and_buildings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {timestamps: false});

export default DefenderLostTroopsAndBuildings;
