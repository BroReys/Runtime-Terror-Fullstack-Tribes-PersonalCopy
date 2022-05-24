const findUserByEmailOrUsername = async (username, email) => {
  if (username === 'existingUser' || email === "existingEmail") {
    return Promise.resolve({
      id: '1',
      username: 'createUserTest',
      email: 'createUserTest@some.exmaple',
      password: '$2b$05$usD89zffT5sdcpFl41LQZO4Ij8TaawVhTGprLQVkFqMYBNtAOYtAgFb6',
      active: false
    })
  } else {
    return Promise.resolve(null);
  }
}

const createUser = async (possibleUser) => {
  return Promise.resolve({
        id: '1',
        username: 'createUserTest',
        email: 'createUserTest@some.exmaple',
        password: '$2b$05$usD89zffT5sdcpFl41LQZO4Ij8TaawVhTGprLQVkFqMYBNtAOYtAgFb6',
        active: false,
      }
  );
}

const findUserByToken = async (token) => {
  if (!token) {
    return Promise.resolve(null);
  } else {
    return Promise.resolve({
      id: '1',
      username: 'createUserTest',
      email: 'createUserTest@some.exmaple',
      password: '$2b$05$usD89zffT5sdcpFl41LQZO4Ij8TaawVhTGprLQVkFqMYBNtAOYtAgFb6',
      active: false,
      registrationToken: "JAhuWXXUBFaloub6SDmVrnYrqwd",
      registrationTokenExpiresAt: Date.now() + 864000000
    });
  }
}

const updateUser = async (user) => {
};

const findUserByUsername = (user) => {
  if (user === "MockTester") {
    return {
      id: 1,
      username: "MockTester",
      email: "mock@email.com",
      password: "$2b$05$Y/9Vfy5K0Ssxpo.rKtUFRuUPxgWzC31lQDGXtyzMd/jI.KITq1/Fu",
      active: true
    }
  } else if (user === "MockTesterNotActive") {
    return {
      username: "MockTesterNotActive",
      email: "mock@email.com",
      password: "$2b$05$1E2UND34Fp5dhSpWYsk3POqLuCNF5CTiqnSliProIZ5ztcIMeWld6",
      active: false
    }
  } else if (user === "MockNoPassword") {
    return {
      id: 1,
      username: "MockTesterNoPassword",
      email: "mock@email.com",
      password: "$2b$05$RAx0fKtYe0eOxRO9eO3ZbOSTjn4mqW5Xg/9W7locePSg3PFlKa/HX",
      active: true
    }
  } else if (user === "MockTesterNoKingdom") {
    return {
      id: 2,
      username: "MockTesterNoKingdom",
      email: "mock@email.com",
      password: "$2b$05$1E2UND34Fp5dhSpWYsk3POqLuCNF5CTiqnSliProIZ5ztcIMeWld6",
      active: true
    }
  } else if (user === "MockTesterInvalid") {
    return null;
  } else if (user === "chatUser1") {
    return {
      id: '1',
      username: "chatUser1",
      email: "mock@email.com",
      password: "$2b$05$Y/9Vfy5K0Ssxpo.rKtUFRuUPxgWzC31lQDGXtyzMd/jI.KITq1/Fu",
      active: true
    }
  } else if (user === 'chatUser2') {
    return {
      id: '2',
      username: "chatUser2",
      email: "mock@email.com",
      password: "$2b$05$Y/9Vfy5K0Ssxpo.rKtUFRuUPxgWzC31lQDGXtyzMd/jI.KITq1/Fu",
      active: true
    }
  } else {
    return null;
  }
}

export default {
  findUserByEmailOrUsername,
  createUser,
  findUserByToken,
  updateUser,
  findUserByUsername
};
