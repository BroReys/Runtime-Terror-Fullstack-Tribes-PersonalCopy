import ChatService from "../services/chat-services/chat-service";
import generateErrorMessage from "../utilities/error-message";
import UserService from "../services/user-service";

const storeChat = async (req, res) => {
  let members = req.body.members;
  let subject = req.body.subject;
  let textOfMessage = req.body.text;
  let owner = await UserService.findById(req.user.id);

  if (owner === null) {
    res.status(404).json(generateErrorMessage('User not found!'));

  } else if (members === null || members === undefined) {
    res.status(400).json(
        generateErrorMessage('At least one member must be added to the chat!'));

  } else if (subject === null || subject === undefined) {
    res.status(400).json(generateErrorMessage('Subject cannot be empty!'));

  } else if (textOfMessage === null || textOfMessage === undefined) {
    res.status(400).json(generateErrorMessage('Text cannot be empty!'));

  } else {
    let membersResult = await ChatService.createChat(subject, owner, members,
        textOfMessage);
    res.json(membersResult);
  }
};

const showChats = async (req, res) => {
  let user = await UserService.findById(req.user.id);

  if (user === null) {
    res.status(404).json(generateErrorMessage('User not found!'));

  } else {
    res.json(await ChatService.getChatDTOs(user.id));
  }
}

const showChat = async (req, res) => {

  let chatId = req.params.id;
  let user = await UserService.findById(req.user.id);
  let chat = await ChatService.findById(chatId)

  if (user === null) {
    res.status(404).json(generateErrorMessage('User not found!'));

  } else if (!chat) {
    res.status(404).json(generateErrorMessage('Chat not found!'));

  } else {
    const chatDTO = await ChatService.getSpecificChatDTO(chat.id, user.id);

    if (chatDTO) {
      res.json(chatDTO);
    } else {
      res.status(403).json(generateErrorMessage('Chat not found!'));
    }
  }

}

export default {
  storeChat,
  showChats,
  showChat
};
