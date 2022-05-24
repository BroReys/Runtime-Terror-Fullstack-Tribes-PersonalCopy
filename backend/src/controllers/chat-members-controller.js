import ChatService from "../services/chat-services/chat-service";
import generateErrorMessage from "../utilities/error-message";
import ChatMemberService from "../services/chat-services/chat-member-service";
import UserService from "../services/user-service";
import ChatMemberRepository
  from "../repositories/chat-repositories/chat-member-repository";

const addChatMembers = async (req, res) => {
  let members = req.body.members;
  let chatId = req.params.id;
  let chat = await ChatService.findById(chatId);
  let owner = await UserService.findById(req.user.id);

  if (owner === null) {
    res.status(404).json(generateErrorMessage('User not found!'));

  } else if (chatId === null || chatId === undefined) {
    res.status(400).json(generateErrorMessage('Chat ID is missing!'));

  } else if (chat === null) {
    res.status(404).json(generateErrorMessage('Chat not found!'));

  } else if (owner.id != chat.owner_id) {
    res.status(401).json(generateErrorMessage(
        'Only owner of the chat can add members to the chat!'));

  } else if (members === null || members === undefined) {
    res.status(400).json(
        generateErrorMessage('At least one member must be added to the chat!'));

  } else {
    let membersResult = await ChatMemberService.createMultipleMembers(chat,
        members);
    res.json(membersResult);
  }
};

const removeChatMember = async (req, res) => {

  console.log("remove member");

  let chatId = req.params.id;
  console.log(chatId + " chat ID");
  let user = await UserService.findById(req.user.id);
  let chat = await ChatService.findById(chatId);
  let owner = await chat.getOwner();
  let ownerUsername = owner.username;

  if (!user) {
    res.status(404).json(generateErrorMessage('User not found!'));

  } else if (!chat) {
    res.status(404).json(generateErrorMessage('Chat not found!'));

  } else if (!await ChatMemberRepository.findByChatIdAndUserId(chat,
      user)) {
    res.status(401).json(
        generateErrorMessage('Only member of the chat can leave it!'))
  } else {
    if (user.username === ownerUsername) { // if Owner is leaving the chat this will move the ownership to other user if there are any
      await ChatMemberService.updateOwner(chat);
    }
    let memberDeleteResult = await ChatMemberService.deleteMember(chat, user);
    res.json(memberDeleteResult);
  }
}

export default {
  addChatMembers,
  removeChatMember
};

