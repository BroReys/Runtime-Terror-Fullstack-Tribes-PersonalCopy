import Sequelize from "sequelize";
import sequelize from "../../config/database";
import Kingdom from "../kingdom";

const Troops_in_barracks = sequelize.define("troops_in_barracks", {
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
      startTime: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      endTime: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
    },{
      timestamps: false,
      hooks: {
        beforeCreate: (record) => {
        record.lastTick = Math.floor(Date.now() / 1000);
    }
  }
    }
);

export default Troops_in_barracks
