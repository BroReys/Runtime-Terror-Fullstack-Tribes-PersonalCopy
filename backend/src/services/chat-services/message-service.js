import MessageRepository
  from "../../repositories/chat-repositories/message-repository";

const createMessage = async (textOfMessage, chat, author) => {
  await MessageRepository.createMessage(textOfMessage, chat, author);
};

export default {
  createMessage
};
