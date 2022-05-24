import {Router} from "express";
import UnitLevelController from "../controllers/unit-level-controller";

const Unit_level_router = Router();

Unit_level_router.put('/kingdoms/:id/troops',UnitLevelController.upgradeTroop);
Unit_level_router.get('/mapped-troop-rules/:id', UnitLevelController.getMappedTroopRules);
Unit_level_router.get('/unit-level/:id/:type', UnitLevelController.showActualUnitLevel);

export default Unit_level_router;