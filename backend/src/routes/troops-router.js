import TroopsController from "../controllers/troops-controller";
import express, {Router} from "express";

const Troops_router = Router();

Troops_router.post('/kingdoms/:id/troops', TroopsController.create);
Troops_router.get('/kingdoms/:id/troops', TroopsController.showTroopArmies);
Troops_router.get('/kingdoms/:id/troops/:type',TroopsController
    .showKingdomTroopsInBarracksByType);
Troops_router.post('/kingdoms/:id/troops/:type/remove',TroopsController
    .removeTroopsFromQueuePerType);
export default Troops_router;
