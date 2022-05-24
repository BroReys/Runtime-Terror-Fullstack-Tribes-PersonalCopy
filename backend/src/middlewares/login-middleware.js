import jwt from 'jsonwebtoken';
import 'dotenv/config';

const loginMiddleware = (req, res, next) =>{

  //get the token from the header if present
  const tokenInHeader = req.headers["authorization"];

  let token;

  //if no token found, return response (without going to the next middelware)
  if (!tokenInHeader) {
    return res.status(401).send("Access denied. No token provided.");
  } else{
    token = tokenInHeader.split(' ')[1];
  }

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();

  } catch (ex) {
    //if invalid token
    res.status(401).send("Invalid token.");
  }
}

export default loginMiddleware;