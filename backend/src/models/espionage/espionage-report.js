import sequelize from "../../config/database";
import Sequelize from "sequelize";

const EspionageReport = sequelize.define('espionage_report', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  totalTroops: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  totalAttackPower: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  totalDefensePower: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  gold: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  food: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  loyalty: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {timestamps: false});

export default EspionageReport;
