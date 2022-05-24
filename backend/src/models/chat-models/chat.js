import Sequelize from "sequelize";
import sequelize from "../../config/database";

const Chat = sequelize.define('chat', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {timestamps: false}
);

export default Chat;
