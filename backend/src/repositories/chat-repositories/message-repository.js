import Message from "../../models/chat-models/message";

const createMessage = async (textOfMessage, chat, author) => {
  let message = {
    text: textOfMessage,
    chatId: chat.id,
    author_id: author.id
  };
  await Message.create(message);
};

export default {
  createMessage
};
