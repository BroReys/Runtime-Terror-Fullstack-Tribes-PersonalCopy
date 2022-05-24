import UserRepository from "../repositories/user-repository";
import hashPassword from "../utilities/hash-password";
import sendMail from "../utilities/mail-sender";
import generateConfirmationToken
  from "../utilities/generate-confirmation-token";
import expiresIn from '../utilities/generate-day-expiration-number'
import bcrypt from 'bcrypt';
import AuthenticationMiddleware from "../middlewares/authentication-middleware";
import KingdomRepository from "../repositories/kingdom-repository";
import generateForgottenPswToken
  from "../utilities/generate-forgotten-psw-token";
import expiresInForgottenPswToken
  from "../utilities/generate-forgotten-psw-expiration-time";
import sendPasswordResetMail from "../utilities/mail-sender-forgotten-psw";

const createUser = async (possibleUser) => {
  // 400 missing fields
  // 422 wrong format password
  // 409 user with same fields
  // 201 created email send

  let status;
  if (!possibleUser.username || !possibleUser.email
      || !possibleUser.password) {
    status = 400;
  } else {
    const userInDatabase = await UserRepository.findUserByEmailOrUsername(
        possibleUser.username, possibleUser.email);
    let regex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";

    if (userInDatabase == null) {
      if (!possibleUser.password.match(regex)) {
        status = 422;
      } else {
        possibleUser.password = await hashPassword(possibleUser.password);
        const userToDatabase = await UserRepository.createUser(possibleUser);
        sendMail(userToDatabase.email, userToDatabase.registrationToken);
        status = 201;
      }
    } else {
      status = 409;
    }
  }
  return status;
}

const setUserToActive = async (possibleToken) => {

  const user = await UserRepository.findUserByToken(
      possibleToken)
  let currentTime = Math.floor(Date.now()/1000);

  if (user !== null) {
    if (currentTime <= user.registrationTokenExpiresAt) {
      user.active = true;
      await UserRepository.updateUser(user);
      return "activated";
    } else {
      user.registrationToken = generateConfirmationToken();
      user.registrationTokenExpiresAt = expiresIn();
      await UserRepository.updateUser(user);
      sendMail(user.email, user.registrationToken);
      return "activation_expired";
    }
  } else {
    return "not_found";
  }

}

const areMembersInDatabases = async (members) => {
  let areTheyInDatabase;
  if (Array.isArray(members)) {
    for (let i = 0; i < members.length; i++) {
      let user = await UserRepository.findUserByUsername(members[i]);
      areTheyInDatabase = user !== null;
    }
  } else {
    let user = await UserRepository.findUserByUsername(members);
    areTheyInDatabase = user !== null;
  }
  return areTheyInDatabase;
};

const loginUser = async (possibleUser) => {
  if (!possibleUser.username || !possibleUser.password) {
    return 400;
  }
  const userInDatabase = await UserRepository.findUserByUsername(
      possibleUser.username);
  if (userInDatabase !== null) {
    let hashedPassword = userInDatabase.password;
    let sentPassword = possibleUser.password;
    const doesPasswordMatch = bcrypt.compareSync(sentPassword, hashedPassword);
    let registeredKingdom = await KingdomRepository.findKingdomByUserId(userInDatabase.id)
    if (!doesPasswordMatch) {
      return 409;
    } else if (!userInDatabase.active) {
      return 403;
    } else if (registeredKingdom === null) {
      return 412;
    } else {
      return 200;
    }
  } else {
    return 404;
  }
}

const identifyUser = (token) => {
  let authorizationResponseStatus = AuthenticationMiddleware.authorization(
      token);

  switch (authorizationResponseStatus) {
    case 403:
      return authorizationResponseStatus = 403;
    case 200:
      return authorizationResponseStatus = 200;
  }
}

const forgotPassword = async (email) => {
  let user = await UserRepository.findUserByEmail(email);

  if (!user) {
    return "no_records";
  } else {
    user.forgottenPasswordToken = generateForgottenPswToken();
    user.forgottenPasswordTokenExpiresAt = expiresInForgottenPswToken();
    await user.save();
    sendPasswordResetMail(user.email,user.forgottenPasswordToken)
    return "ok_token_generated"
  }
}

const resetPassword = async (pswToken,firstPsw,secondPsw) => {
  let currentTime = Math.floor(Date.now()/1000);
  let user = await UserRepository.findUserByToken(pswToken);
  let regex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";
  if (!user) {
    return "no_user";
  }
  if (!firstPsw || !secondPsw) {
    return "no_psw_provided"
  }
  let pswExpirationTokenTime = user.forgottenPasswordTokenExpiresAt;
  if (pswExpirationTokenTime <= currentTime) {
    return "expired";
  }
  if (firstPsw !== secondPsw) {
    return "no_match"
  }
  if (!secondPsw.match(regex)) {
    return "no_regex_match"
  }
  let userOldPassword = user.password;
  const doesPasswordMatch = bcrypt.compareSync(secondPsw, userOldPassword);
  if (doesPasswordMatch) {
    return "old_psw_entered"
  } else {
    let hashedPasswordNewPassword = await hashPassword(secondPsw)
    user.password = hashedPasswordNewPassword;
    user.forgottenPasswordTokenExpiresAt = Math.floor(Date.now()/1000);
    await user.save();
    return "ok";
  }
};


const findByUsername = async (username) => {
  return username !== undefined ? await UserRepository.findUserByUsername(username) : null;
};

const findById = async (id) => {
  return await UserRepository.findById(id);
};

export default {
  createUser,
  setUserToActive,
  areMembersInDatabases,
  findById,
  findByUsername,
  loginUser,
  identifyUser,
  forgotPassword,
  resetPassword
};
