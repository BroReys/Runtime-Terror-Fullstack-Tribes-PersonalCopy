import Sequelize from "sequelize";
import sequelize from "../../config/database";
import Chat from "./chat";
import User from "../user";

const ChatMembers = sequelize.define('chat_members', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      chatId: {
        type: Sequelize.INTEGER,
        references: {
          model: Chat,
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: User, key: 'id'
        }
      },
      lastViewed: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    }, {timestamps: false}
);

export default ChatMembers;

