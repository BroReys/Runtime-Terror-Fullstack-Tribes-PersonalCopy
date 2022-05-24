import {Router} from 'express';
import UserController from '../controllers/user-controller'
import KingdomController from "../controllers/kingdom-controller";

const User_router = Router();

User_router.post('/registration', UserController.create);
User_router.get('/registration/confirmation', UserController.confirm);
User_router.post('/login', UserController.login);
User_router.get('/identify', UserController.identify);
User_router.post('/forgotten-password', UserController.forgotPassword);
User_router.put('/forgotten-password/reset', UserController.resetPassword);
User_router.post('/register/kingdom', KingdomController.create);
User_router.get('/kingdoms', KingdomController.getAllKingdoms);

export default User_router;
