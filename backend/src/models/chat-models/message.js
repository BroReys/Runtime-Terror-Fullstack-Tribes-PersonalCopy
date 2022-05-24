import Sequelize from "sequelize";
import sequelize from "../../config/database";

const Message = sequelize.define('message', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
    },
    {updatedAt: false}
);

export default Message;


