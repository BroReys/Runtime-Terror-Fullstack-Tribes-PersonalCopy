import bcrypt from "bcrypt";

const hash = (password) => {
  const pass = bcrypt.hashSync(password, 5);
  return pass;
}
export default hash;