import ChatMemberRepository
  from "../../repositories/chat-repositories/chat-member-repository";
import UserService from "../user-service";

const createChatMember = async (chat, user) => {
  await ChatMemberRepository.createChatMember(chat, user);
};

const createMultipleMembers = async (chat, members) => {
  let addedMembers = [];
  let notAddedMembers = [];

  if (Array.isArray(members)) {
    for (let i = 0; i < members.length; i++) { // add listed members as members of the chat

      let user = await UserService.findByUsername(members[i]);
      if (user != null && (await doMembersAlreadyExists(chat, user.username)
          === false)) {
        await ChatMemberRepository.createChatMember(chat, user);
        addedMembers[i] = user.username;
      } else {
        notAddedMembers[i] = members[i];
      }
    }
  } else {
    let user = await UserService.findByUsername(members);
    if (user != null && await doMembersAlreadyExists(chat, members) === false) {
      await createChatMember(chat, user);
      addedMembers[0] = user.username;
    } else {
      notAddedMembers[0] = members[0];
    }
  }
  return {
    addedMembers: addedMembers.filter(element => {
      return element != null;
    }),
    notAddedMembers: notAddedMembers.filter(element => {
      return element != null;
    })
  };
};

const doMembersAlreadyExists = async (chat, members) => {
  let isAlreadyMember;

  if (Array.isArray(members)) {
    for (let i = 0; i < members.length; i++) { //
      let user = await UserService.findByUsername(members[i]);
      if (user != null) {
        let chatMember = await ChatMemberRepository.findByChatIdAndUserId(chat,
            user);
        if (chatMember == null || chatMember === undefined) {
          return false;
        } else {
          isAlreadyMember = true;
        }
      }
    }
  } else {
    let user = await UserService.findByUsername(members);
    if (user != null) {
      let chatMember = await ChatMemberRepository.findByChatIdAndUserId(chat,
          user);
      if (chatMember == null || chatMember == undefined) {
        return false;
      } else {
        isAlreadyMember = true;
      }
    }
  }
  return isAlreadyMember;
};

const deleteMember = async (chat, user) => {
  await ChatMemberRepository.deleteChatMember(chat, user);
};

const updateOwner = async (chat) => {
  let members = await chat.getUsers();
  let owner = await chat.getOwner();
  let ownerUsername = owner.username;

  for (let j = 0; j < members.length; j++) {
    if (members[j].username !== ownerUsername) {
      chat.owner_id = members[j].id;
      await chat.save();
      break;
    }
  }

}

export default {
  createChatMember,
  createMultipleMembers,
  doMembersAlreadyExists,
  deleteMember,
  updateOwner
};
