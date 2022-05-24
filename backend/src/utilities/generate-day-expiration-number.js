const expiresIn = () => {
  let result = Math.floor(Date.now()/1000 + 60 * 60 * 24);
  return result;
}

export default expiresIn;