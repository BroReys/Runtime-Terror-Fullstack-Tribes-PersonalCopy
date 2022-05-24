import sequelize from "../../config/database";
import Sequelize from "sequelize";

const AttackerTroopsToBattle = sequelize.define('attacker_troops_to_battle', {
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

export default AttackerTroopsToBattle;
