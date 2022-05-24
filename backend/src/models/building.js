import Sequelize from "sequelize";
import sequelize from "../config/database";

const Building = sequelize.define("building", {
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
        position: {
            type: Sequelize.INTEGER,
            min: 0,
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        level: {
            type: Sequelize.INTEGER,
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
        destroyTime: {
            type: Sequelize.DOUBLE,
            allowNull: true
        }
    }, {
        timestamps: false
    })
;

export default Building;
