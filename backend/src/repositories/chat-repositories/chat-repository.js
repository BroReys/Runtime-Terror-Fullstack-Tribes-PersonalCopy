import Chat from "../../models/chat-models/chat";

const createChat = async (subjectOfChat, ownerOfChat) => {

  let chat = {
    subject: subjectOfChat,
    owner_id: ownerOfChat.id
  }
  let savedChat = await Chat.create(chat);
  return savedChat;
};

const findById = async (id) => {
  let chat = await Chat.findOne({
    where: {
      id: id
    }
  });
  return chat;
};

const updateOwnerId = async (chat, member) => {

}

export default {
  createChat,
  findById,
  updateOwnerId
};
