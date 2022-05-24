import MessageService from "../services/chat-services/message-service";
import generateErrorMessage from "../utilities/error-message";
import ChatService from "../services/chat-services/chat-service";
import ChatMemberService from "../services/chat-services/chat-member-service";
import UserService from "../services/user-service";

const addMessage = async (req, res) => {
  let textOfMessage = req.body.text;
  let chatId = req.params.id;
  let chat = await ChatService.findById(chatId);
  let author = await UserService.findById(req.user.id);

  if (author === null) {
    res.status(404).json(generateErrorMessage('User not found!'));

  } else if (chatId === null || chatId === undefined) {
    res.status(400).json(generateErrorMessage('Chat ID is missing!'));

  } else if (chat === null) {
    res.status(404).json(generateErrorMessage('Chat not found!'));

  } else if (await ChatMemberService.doMembersAlreadyExists(chat,
          author.username)
      === false) {
    res.status(403).json(
        generateErrorMessage('Only member of the chat can add messages!'));

  } else if (textOfMessage === null || textOfMessage === undefined) {
    res.status(400).json(generateErrorMessage('Text cannot be empty!'));

  } else {
    await MessageService.createMessage(textOfMessage, chat, author);
    res.sendStatus(200);
  }
};

export default {
  addMessage
};

