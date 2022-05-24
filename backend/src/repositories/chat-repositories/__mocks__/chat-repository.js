import Chat from "../../../models/chat-models/chat";

const createChat = async (subjectOfChat, ownerOfChat) => {

  let chat = {
    subject: subjectOfChat,
    owner_id: ownerOfChat.id
  }
  return chat;
};

const findById = async (id) => {

  let chat = {
    id: id,
    subject: "test",
    owner_id: "6"
  }
  return chat;
};

export default {
  createChat,
  findById
};