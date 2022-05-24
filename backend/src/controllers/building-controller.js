import BuildingService from "../services/building-service";
import {buildingRules} from "../rules/building-rules";


const getBuildingsByKingdomId = async (req, res) => {
    const kingdomId = req.params.kingdomId;
    const userId = req.user.id;

    const response = await BuildingService.getBuildings(kingdomId, userId);
    const idError = response.idError;
    const authenticationError = response.authenticationError;

    if (idError) {
        res.status(400).json(idError);
    } else if (authenticationError) {
        res.status(401).json(authenticationError);
    } else {
        res.status(200).json(response);
    }
}

const addBuildingToKingdom = async (req, res) => {
    const kingdomId = req.params.kingdomId;
    const type = req.body.type;
    const userId = req.user.id;

    const response = await BuildingService.addBuildingToKingdom(kingdomId, type, userId);

    const idError = response.idError;
    const inputError = response.inputError;
    const resourceError = response.resourceError;
    const authenticationError = response.authenticationError;

    if (idError) {
        res.status(400).json(idError);
    } else if (inputError) {
        res.status(400).json(inputError);
    } else if (resourceError) {
        res.status(400).json(resourceError);
    } else if (authenticationError) {
        res.status(401).json(authenticationError);
    } else {
        res.status(200).json(response);
    }
}

const upgradeOrTeardownBuilding = async (req, res) => {
    const kingdomId = req.params.kingdomId;
    const buildingId = req.params.buildingId;
    const action = req.body.action;
    const instant = req.body.instant;

    const response = await BuildingService.upgradeOrTeardownBuilding(kingdomId, buildingId, action, instant);

    const inputError = response.inputError;
    const resourceError = response.resourceError;
    const buildingIdError = response.buildingIdError;
    const kingdomIdError = response.kingdomIdError;
    const authenticationError = response.authenticationError;

    if (buildingIdError) {
        res.status(400).json(buildingIdError);
    } else if (kingdomIdError) {
        res.status(400).json(kingdomIdError);
    } else if (inputError) {
        res.status(400).json(inputError);
    } else if (resourceError) {
        res.status(400).json(resourceError);
    } else if (authenticationError) {
        res.status(401).json(authenticationError);
    } else {
        res.status(200).json(response);
    }
}

const exportRules = async (req, res) => {
    const positionId = req.params.positionId;
    const levelId = req.params.levelId;
    const rules = Object.entries(buildingRules(levelId));

    let response = null;

    for (let i = 2; i < 8; i++) {
        console.log(rules[i][1].position)
        console.log(positionId);
        if (rules[i][1].position == positionId) {
            response = rules[i][1];
        }
    }

    res.status(200).json(response);
}

export default {
    getBuildingsByKingdomId,
    addBuildingToKingdom,
    upgradeOrTeardownBuilding,
    exportRules
}