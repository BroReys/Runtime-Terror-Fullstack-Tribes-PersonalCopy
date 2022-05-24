import User from "../models/user";

const generateForgottenPswToken = () => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 24; i++) {
    result += characters.charAt(Math.floor(Math.random() *
        characters.length));
  }

  const userWithLink = async (result) => {
    const user = await User.findOne({
      where: {
        forgottenPasswordToken: result
      }
    })
  }

  if (result === userWithLink(result).registrationToken) {
    generateForgottenPswToken();
  } else {
    return result;
  }
}

export default generateForgottenPswToken;