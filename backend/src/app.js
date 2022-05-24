import 'dotenv/config';
import express from 'express';
import User_router from "./routes/user-router";
import createRelationships from "./config/sql-relationships";
import ChatRouter from "./routes/chat-router";
import resourcesMiddleware from "./middlewares/resources-middleware";
import winnerMiddleware from "./middlewares/winner-middleware";
import Map_router from "./routes/map-router";
import cookieParser from 'cookie-parser'
import Kingdom_router from "./routes/kingdom-router";
import Troops_router from "./routes/troops-router";
import Building_router from "./routes/building-router";
import BattleRouter from "./routes/battle-router";
import Unit_level_router from "./routes/unit-level-router";
import Leaderboard_router from "./routes/leaderboard-router";
import battleMiddleware from "./middlewares/battle-middleware";
import loginMiddleware from "./middlewares/login-middleware";
import Settlers_Router from "./routes/settlers-router";
import settleMiddleware from "./middlewares/settlers-middleware";
import banditsMiddleware from "./middlewares/bandits-middleware";
import cors from "cors";

const app = express();

app.use(cors());
createRelationships();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(User_router);
// ↑↑↑↑↑↑↑↑↑↑↑ everything without login
app.use(loginMiddleware);
// ↓↓↓↓↓↓↓↓↓↓↓ only for logged in users
app.use(winnerMiddleware);
app.use(resourcesMiddleware);
app.use(battleMiddleware);
app.use(settleMiddleware);
app.use(banditsMiddleware);
app.use(Kingdom_router);
app.use(ChatRouter);
app.use(Map_router);
app.use(Troops_router);
app.use(Building_router);
app.use(BattleRouter);
app.use(Settlers_Router);
app.use(Unit_level_router);
app.use(Leaderboard_router);
app.listen(process.env.PORT || 3000);
