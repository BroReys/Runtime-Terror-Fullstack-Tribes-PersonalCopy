import User from '../models/user';
import {Op} from 'sequelize';

const createUser = async (possibleUser) => {
  const user = await User.create(possibleUser);
  return user;
}

const findUserByEmailOrUsername = async (username, email) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [
        {username: username},
        {email: email}
      ]
    }
  })
  return user;
}

const findUserByToken = async (token) => {
  if (token !== null) {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {registrationToken: token},
          {forgottenPasswordToken: token}
        ]
      }
    })
    return user
  } else {
    return null;
  }
}

const updateUser = async (user) => {
  await User.update(user, {
    where: {
      id: user.id
    }
  });
  await user.save();
}

const findUserByUsername = async (username) => {
  const user = await User.findOne({
    where: {
      username: username
    }
  });
  return user;
};

const findById = async (id) => {
  return await User.findOne({
    where: {
      id: id
    }
  });
};

const findUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email
    }
  });
};

export default {
  createUser,
  findUserByEmailOrUsername,
  findUserByToken,
  updateUser,
  findUserByUsername,
  findById,
  findUserByEmail
};
