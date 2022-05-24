import User from "../models/user";

const generateConfirmationToken = () => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 24; i++) {
    result += characters.charAt(Math.floor(Math.random() *
        characters.length));
  }

  const userWithLink = async (result) => {
    const user = await User.findOne({
      where: {
        registrationToken: result
      }
    })
  }

  if (result === userWithLink(result).registrationToken) {
    generateConfirmationToken();
  } else {
    return result;
  }
}

export default generateConfirmationToken;