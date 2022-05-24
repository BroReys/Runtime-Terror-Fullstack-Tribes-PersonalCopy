import {Router} from 'express';
import KingdomController from "../controllers/kingdom-controller";

const Kingdom_router = Router();

Kingdom_router.put('/kingdoms/:id',KingdomController.updateKingdomName);
Kingdom_router.get('/kingdoms/:id',KingdomController.getKingdomDetails);
Kingdom_router.get('/getKingdoms', KingdomController.getKingdoms);

export default Kingdom_router;
