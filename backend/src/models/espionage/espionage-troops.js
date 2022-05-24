import sequelize from "../../config/database";
import Sequelize from "sequelize";

const EspionageTroops = sequelize.define('espionage_troop', {
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

export default EspionageTroops;
