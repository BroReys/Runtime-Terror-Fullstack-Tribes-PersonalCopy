import {Router} from 'express';
import SettleController from "../controllers/settle-controller";

const SettleRouter = Router();

SettleRouter.post('/kingdoms/:kingdomId/settle',
    SettleController.startSettlersPilgrimage);

export default SettleRouter;