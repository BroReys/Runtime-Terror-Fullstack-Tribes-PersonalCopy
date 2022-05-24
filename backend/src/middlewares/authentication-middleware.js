import jwt from 'jsonwebtoken';
import 'dotenv/config';
import UserRepository from "../repositories/user-repository";

// if login passes then authenticate -> returns token
const authentication = async (user) => {

  if (user.username === undefined || user.password === undefined) {
    return null;
  }
  let privateKey = process.env.ACCESS_TOKEN_SECRET;
  return await jwt.sign({
    id: user.id,
    username: user.username
  }, privateKey, {expiresIn: "48h"});
}

//verifies the token
const authorization = (authToken) => {
  if (authToken === null || authToken === undefined) {
    return 403;
  }
  const token = authToken.split(' ')[1];
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return 200;
  } catch {
    return 403;
  }
};

const getUserFromPayload = async (token) => {
  try {
    let tokenPayloadInfo = token.split(".");
    let user = JSON.parse(atob(tokenPayloadInfo[1]));
    return await UserRepository.findById(user.id);
  } catch {
    console.error("Token parameter in method getUserFromPayload was udefined or null!")
    return null
  }
}

export default {
  authentication,
  authorization,
  getUserFromPayload
}
