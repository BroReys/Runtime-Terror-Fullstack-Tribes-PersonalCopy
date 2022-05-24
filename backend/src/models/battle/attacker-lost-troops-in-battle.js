import sequelize from "../../config/database";
import Sequelize from "sequelize";

const AttackerLostTroops = sequelize.define('attacker_lost_troops', {
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

export default AttackerLostTroops;
