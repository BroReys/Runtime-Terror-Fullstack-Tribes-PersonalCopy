import UserService from '../services/user-service';
import AuthenticationMiddleware from "../middlewares/authentication-middleware";
import KingdomService from "../services/kingdom-service";

const create = async (req, res) => {
  const user = req.body;
  const statusOfRegistration = await UserService.createUser(user);

  switch (statusOfRegistration) {
    case 409:
      res.status(409).json({error: "Username or email already exists!"});
      break;
    case 422:
      res.status(422).json({error: "Password does not match requirements"});
      break;
    case 400:
      res.status(400).json({error: "One of the required fields is missing"});
      break;
    case 201:
      res.json({message: "User registered successfully. Please follow activation link in your e-mail."});
  }
}

const confirm = async (req, res) => {
  let token = req.query.activation;
  const status = await UserService.setUserToActive(token);

  switch (status) {
    case "activated":
      res.status(200).json({success: 'User activated!'})
      break;
    case "activation_expired":
      res.status(400).json({message: 'You activation link has expired, check your email for a new one.'})
      break;
    case "not_found":
      res.status(404).json({error: 'User not found'})
  }
}

const identify = async (req, res) => {
  const token = req.headers['authorization'];
  console.log(token);
  const status = UserService.identifyUser(token);

  switch (status) {
    case 403:
      res.sendStatus(403);
      break;
    case 200:
      let payloadUser = await AuthenticationMiddleware.getUserFromPayload(token);
      let userKingdom = await KingdomService.getAllUsersKingdomsOrdered(payloadUser.id);
      res.json({username: payloadUser.username, kingdom: userKingdom})
      break;
  }
}

const login = async (req, res) => {
  let status = await UserService.loginUser(req.body);
  switch (status) {
    case 200:
      let userInDatabase = await UserService.findByUsername(req.body.username)
      const token = await AuthenticationMiddleware.authentication(
          userInDatabase);
      res
      .header('access_token', token)
      .json({
        token: token,
        message: "user logged in successfully"
      });
      break;
    case 400:
      res.status(400).json({error: "One of the required fields is missing"})
      break;
    case 403:
      res.status(403).json({error: "User did not finish registration!"});
      break;
    case 409:
      res.status(409).json({error: "Wrong username or password"});
      break;
    case 404:
      res.status(404).json({error: "Wrong username or password"});
      break;
    case 412:
      res.status(412).json({error: "No kingdom registered, please register the kingdom first."});
      break;
  }
}

const forgotPassword = async (req,res) => {
  let status = await UserService.forgotPassword(req.body.email);
  switch (status) {
    case "no_records":
      res.status(400).json({error: "No records found!"});
      break;
    case "ok_token_generated":
      res.status(200).json({success: "Password reset link sent successfully. Please check your inbox."});
      break;
  }
};

const resetPassword = async (req,res) => {
  let firstPsw = req.body.firstPsw;
  let secondPsw = req.body.secondPsw;
  let status = await UserService.resetPassword(req.query.token,firstPsw,secondPsw);

  switch (status) {
    case "no_user":
      res.status(400).json({error: "No user"});
      break;
    case "expired":
      res.status(400).json({error: "Reset link has expired please generate the new one"});
      break;
    case "no_match":
      res.status(400).json({error: "Passwords do not match"});
      break;
    case "no_psw_provided":
      res.status(400).json({error: "No passwords provided!"});
      break;
    case "old_psw_entered":
      res.status(400).json({error: "You have entered your old password!"});
      break;
    case "no_regex_match":
      res.status(400).json({error: "Password does not meet the requirements!"});
      break;
    case "ok":
      res.status(200).json({success: "Password changed!"})
  }
}

export default {
  create,
  confirm,
  login,
  identify,
  forgotPassword,
  resetPassword
}
