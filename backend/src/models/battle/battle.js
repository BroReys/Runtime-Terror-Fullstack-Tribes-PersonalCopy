import sequelize from "../../config/database";
import Sequelize from "sequelize";

const Battle = sequelize.define('battle', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  startedAt: {
    type: Sequelize.DOUBLE,
    defaultValue: Math.floor(Date.now() / 1000),
    allowNull: false
  },
  timeOfArrival: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  timeOfComeback: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  isFinished: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }, // when listing battles -> sorted by not finished at the top, then by time of arrival
  result: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  stolenFood: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  stolenGold: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  possibleBanditsReward: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  beenRead: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {timestamps: false});

export default Battle;
