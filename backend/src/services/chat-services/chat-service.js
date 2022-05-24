import ChatRepository
  from "../../repositories/chat-repositories/chat-repository";
import ChatMemberService from "./chat-member-service";
import MessageService from "./message-service";
import UserService from "../user-service";
import ChatMemberRepository
  from "../../repositories/chat-repositories/chat-member-repository";
import Sequelize from "sequelize";

const createChat = async (subjectOfChat, ownerOfChat, members,
    textOfMessage) => {

  const chat = await ChatRepository.createChat(subjectOfChat, ownerOfChat);
  await ChatMemberService.createChatMember(chat, ownerOfChat);
  let membersResult = await ChatMemberService.createMultipleMembers(chat,
      members);
  await MessageService.createMessage(textOfMessage, chat, ownerOfChat);
  return membersResult;
};

const findById = async (id) => {
  return await ChatRepository.findById(id);
};

const getChatDTOs = async (userId) => {
  const user = await UserService.findById(userId); // find user
  const chatsFromUser = await user.getChats(); // get chats where he's a chat member
  let chatDTOs = [];
  let chatsFromDB = [];

  for (let i = 0; i < chatsFromUser.length; i++) {
    chatsFromDB[i] = await findById(chatsFromUser[i].id) // in order to work with the chat as an object, needs to be found through db

    let chatDto = { // create the dto
      id: chatsFromDB[i].id,
      chatOwner: await getOwnerName(chatsFromDB[i]),
      subject: chatsFromDB[i].subject,
      lastViewed: chatsFromUser[i].chat_members.lastViewed,
      members: await editMembers(chatsFromDB[i]),
      messages: await editMessages(chatsFromDB[i])
    };
    chatDTOs[i] = chatDto;
  }
  return chatDTOs.sort((a, b) => parseFloat(
      Date.parse(b.messages[0].createdAt)) - parseFloat(
      Date.parse(a.messages[0].createdAt))); // compare chats with the newest message in the chat -> then on top of the list chat with latest
};

const getSpecificChatDTO = async (chatId, userId) => {
  const chat = await findById(chatId); // find chat
  const user = await UserService.findById(userId); // find user
  const specificChat = await ChatMemberRepository.findByChatIdAndUserId(chat,
      user); //find the chat_members row to see if this user is associated with this chat
  specificChat.lastViewed = Sequelize.literal('CURRENT_TIMESTAMP'); //each time specific chat is called lastViewed time is updated
  await specificChat.save();

  if (specificChat !== null) { //check if user is part of this chat
    let chatDto = { // create the dto
      id: chat.id,
      chatOwner: await getOwnerName(chat),
      subject: chat.subject,
      lastViewed: specificChat.lastViewed,
      members: await editMembers(chat),
      messages: await editMessages(chat)
    }
    return chatDto;
  }
  return null;
};

const editMembers = async (chat) => { // edit members to have only username and id, dont show owner again
  let members = await chat.getUsers();
  let editedMembers = [];
  for (let j = 0; j < members.length; j++) {
    if (members[j].username != await getOwnerName(chat)) {
      let member = {
        id: members[j].id,
        username: members[j].username
      };
      editedMembers[j] = member;
    }
  }
  return editedMembers.filter(element => { // filter out null = owner
    return element != null;
  });
};

const editMessages = async (chat) => { // edit messages to show id, author username, text and created at
  let messages = await chat.getMessages();
  let editedMessages = [];
  for (let j = 0; j < messages.length; j++) {
    let author = await messages[j].getAuthor();
    let message = {
      id: messages[j].id,
      author: author.username,
      text: messages[j].text,
      createdAt: messages[j].createdAt
    };
    editedMessages[j] = message;
  }
  return editedMessages.sort((a, b) => parseFloat( // return sorted messages by newest at the top
      Date.parse(b.createdAt) - parseFloat(Date.parse(a.createdAt))));
};

const getOwnerName = async (chat) => {
  let owner = await chat.getOwner();
  let ownerUsername = owner.username;
  return ownerUsername;
}; // get owner username

export default {
  createChat,
  findById,
  getChatDTOs,
  getSpecificChatDTO,
};
