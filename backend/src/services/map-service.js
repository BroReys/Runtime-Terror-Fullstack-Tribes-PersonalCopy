import {rules} from "../rules/rules";
import Map from "../models/map";

const mapSize = rules(1).board_size;

const identifyKingdom = async (coordinateX, coordinateY) => {
    let error = "One or both provided coordinates are out of range!";

    if (!Number.isSafeInteger(coordinateX) || !Number.isSafeInteger(coordinateY)) {
        return {"error": error};
    }

    if (coordinateX == null || coordinateY == null) {
        return {"error": error};
    }

    //TODO >= mapSize
    if (coordinateX >= mapSize || coordinateX < 0 || coordinateY >= mapSize || coordinateY < 0) {
        return {"error": error};
    }

    let map = await Map.get();
    let result = {"username": null, "kingdomName": null, "status": "free"};
    for (const kingdom of map) {
        if (kingdom.coordinateX === coordinateX && kingdom.coordinateY === coordinateY) {
            result = {"username": kingdom.username, "kingdomName": kingdom.name, "status": "taken"};
            return result;
        }
    }
    return result;
}

export default {
    identifyKingdom
}