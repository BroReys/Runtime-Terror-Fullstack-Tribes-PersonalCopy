import {aiRules} from "../rules/ai-rules";
import KingdomRepository from "../repositories/kingdom-repository";
import convertToRoman from "./romanize";
import Map from "../models/map";
import {rules} from "../rules/rules";
import {troopRules} from "../rules/troops-rules";
import TroopsService from "../services/troops-services/troops-service";
import UnitLevelRepository from "../repositories/unit-level-repository";
import Kingdom from "../models/kingdom";
import UserService from "../services/user-service";
import TroopsRepository from "../repositories/troops-repositories/troops-repository";

const createBandits = async (days) => {
    const numberOfBandits = getRandomBetweenTwoIntegers(1, 5);
    const map = await Map.get();
    const troopTypes = troopRules(1).type;

    for (let i = 0; i < numberOfBandits; i++) {
        let coordinates = getRandomCoordinatesThatAreNotInMap(map);
        map.push(coordinates);

        let kingdom = {
            name: "Bandits camp " + convertToRoman(i + 1),
            coordinateX: coordinates.coordinateX,
            coordinateY: coordinates.coordinateY
        }

        const savedKingdom = await Kingdom.create(kingdom);
        await savedKingdom.setUser(await UserService.findById(1));
        await savedKingdom.save();

        await createRandomTroops(troopTypes, days, savedKingdom.id);
    }
}

const destroyBandits = async (banditsKingdomId) => {
    let bandits = await KingdomRepository.findKingdomById(banditsKingdomId);
    let troops = await bandits.getTroops();
    for (let i = 0; i < troops.length; i++) {
        let unitLevel = await troops[i].getUnitLevel();
        await troops[i].destroy();
        await unitLevel.destroy();
    }
};

const getBanditsReward = async (banditsKingdomId) => {
    let troops = await TroopsRepository.findAllKingdomTroops(banditsKingdomId);
    let totalGoldCost = 0;
    for (const troop of troops) {
        let troopType = troop.get({ plain : true }).type;
        let quantity = troop.get({ plain : true }).quantity;
        for (let val in troopRules()) {
            if (val === troopType) {
                totalGoldCost += troopRules()[val].gold_cost * quantity;
            }
        }
    }

    return totalGoldCost * getRandomBetweenTwoIntegers(0.5, 5);
};

const createRandomTroops = async (troopTypes, days, kingdomId) => {
    for (let i = 0; i < troopTypes.length; i++) {
        if (troopTypes[i] !== "diplomat" && troopTypes[i] !== "catapult" && troopTypes[i] !== "settlers") {
            console.log(troopTypes[i]);

            await UnitLevelRepository.generateUnitLevel({
                type: troopTypes[i],
                kingdomId: kingdomId,
                upgradeLevel: days
            });

            await TroopsService.joinTroopArmy(troopTypes[i], aiRules(days).number_of_troops, kingdomId);

            let unitLevel = await UnitLevelRepository.findUnitLevelByTroopTypeAndByKingdomId(kingdomId, troopTypes[i]);
            unitLevel.upgradeLevel = days;
            await unitLevel.save();
        }
    }
}


const getRandomBetweenTwoIntegers = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomCoordinatesThatAreNotInMap = (map) => {
    let coordinateX = getRandomBetweenTwoIntegers(0, rules(0).max_position - 1);
    let coordinateY = getRandomBetweenTwoIntegers(0, rules(0).max_position - 1);
    let found = map.filter(kingdom => kingdom.coordinateX === coordinateX && kingdom.coordinateY === coordinateY);
    if (found.length > 0) {
        return getRandomCoordinatesThatAreNotInMap(map);
    }

    return {coordinateX, coordinateY};
}

export default {
    createBandits,
    destroyBandits,
    getBanditsReward
}
