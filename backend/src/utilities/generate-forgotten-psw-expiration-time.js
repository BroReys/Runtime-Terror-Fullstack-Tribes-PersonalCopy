const expiresInForgottenPswToken = () => {
  return Math.floor(Date.now()/1000) + 60 * 60;
}

export default expiresInForgottenPswToken;