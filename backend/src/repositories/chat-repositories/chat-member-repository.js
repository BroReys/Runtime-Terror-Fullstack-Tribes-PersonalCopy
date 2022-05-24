import ChatMembers from "../../models/chat-models/chat-members";

const createChatMember = async (chat, user) => {
  let member = {
    chatId: chat.id,
    userId: user.id
  };
  await ChatMembers.create(member);
};

const findByChatIdAndUserId = async (chat, user) => {
  let chatMember = await ChatMembers.findOne({
    where: {
      chatId: chat.id,
      userId: user.id
    }
  });
  return chatMember;
};

const deleteChatMember = async (chat, user) => {

  await ChatMembers.destroy({
    where: {
      chatId: chat.id,
      userId: user.id
    }
  }).then(result => {
    return result;
  }).catch(error => {
    console.error(error)
  })
}

export default {
  createChatMember,
  findByChatIdAndUserId,
  deleteChatMember
};
