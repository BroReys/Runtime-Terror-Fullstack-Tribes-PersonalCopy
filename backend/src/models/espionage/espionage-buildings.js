import sequelize from "../../config/database";
import Sequelize from "sequelize";

const EspionageBuildings = sequelize.define('espionage_building', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  type: {
    type: Sequelize.STRING,
    defaultValue: null,
    allowNull: true
  },
  level: {
    type: Sequelize.INTEGER,
    defaultValue: null,
    allowNull: true
  }
}, {timestamps: false});

export default EspionageBuildings;
