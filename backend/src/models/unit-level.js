import sequelize from "../config/database";
import Sequelize from "sequelize";
import Kingdom from "./kingdom";

const Unit_level = sequelize.define("unit_level", {
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
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  upgradeLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  endTime: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  },{
      timestamps: false
    }
);

export default Unit_level
