import {Router} from "express";
import LeaderboardController from "../controllers/leaderboard-controller";

const Leaderboard_router = Router();

Leaderboard_router.get('/leaderboards/kingdoms', LeaderboardController.getKingdomPoints);
Leaderboard_router.get('/leaderboards/rulers', LeaderboardController.getRulerPoints);

export default Leaderboard_router;