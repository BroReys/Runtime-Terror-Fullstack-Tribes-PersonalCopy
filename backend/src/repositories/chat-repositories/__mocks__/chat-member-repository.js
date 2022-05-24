const createChatMember = async (chat, user) => {
};

const findByChatIdAndUserId = async (chat, user) => {
  if (user == "test") {
    return {
      id: 1,
      username: "test",
      email: "mock@email.com",
      password: "$2b$05$Y/9Vfy5K0Ssxpo.rKtUFRuUPxgWzC31lQDGXtyzMd/jI.KITq1/Fu",
      active: true
    }
  } else {
    return null;
  }
};

export default {
  createChatMember,
  findByChatIdAndUserId
};
