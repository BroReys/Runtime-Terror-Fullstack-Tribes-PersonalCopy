import MapController from "../controllers/map-controller";
import express, {Router} from "express";

const Map_router = Router();

Map_router.use(express.json());
Map_router.use(express.urlencoded({extended: true}));
Map_router.post("/map", MapController.postMap);


export default Map_router;