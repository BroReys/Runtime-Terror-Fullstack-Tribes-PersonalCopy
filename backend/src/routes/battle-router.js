import {Router} from 'express';
import BattleController from "../controllers/battle-controller";

const BattleRouter = Router();

BattleRouter.post('/kingdoms/:kingdomId/battles', BattleController.storeBattle);

BattleRouter.get('/kingdoms/:kingdomId/battles/:battleId',
    BattleController.showBattleReport);

BattleRouter.get('/kingdoms/:kingdomId/battles',
    BattleController.showAllBattles);

BattleRouter.post('/kingdoms/:kingdomId/reports',
    BattleController.getLatestReport);

BattleRouter.get('/kingdoms/:kingdomId/active-battles',
    BattleController.getAllActiveBattles);

export default BattleRouter;
