import BuildingController from "../controllers/building-controller";
import express, {Router} from "express";

const Building_router = Router();

Building_router.use(express.json());
Building_router.use(express.urlencoded({extended: true}));
Building_router.get("/kingdoms/:kingdomId/buildings", BuildingController.getBuildingsByKingdomId);
Building_router.post("/kingdoms/:kingdomId/buildings", BuildingController.addBuildingToKingdom);
Building_router.put("/kingdoms/:kingdomId/buildings/:buildingId", BuildingController.upgradeOrTeardownBuilding);
Building_router.get("/rules/building/:positionId/:levelId", BuildingController.exportRules);

export default Building_router;