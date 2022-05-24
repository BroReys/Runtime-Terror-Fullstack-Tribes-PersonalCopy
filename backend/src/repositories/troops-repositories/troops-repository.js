import Troops from "../../models/troops-models/troops";
import AttackerTroopsToBattle
  from "../../models/battle/attacker-troops-to-battle";
import Battle from "../../models/battle/battle";
import sequelize from "../../config/database";
import {Op} from 'sequelize';

const createTroop = async (troop) => {
  const newTroop = await Troops.create(troop);
  return newTroop;
}

const findRecruitedTroopTypeByKingdomId = async (kingdomId, type) => {
  const troopType = await Troops.findOne({
    where: {
      kingdomId: kingdomId,
      type: type
    }
  })
  return troopType;
}

const findRecruitedKingdomTroops = async (kingdomId) => {
  return Troops.findAll({
    where: {kingdomId},
    attributes: {exclude: ['kingdomId', 'unitLevelId', 'destroyTime']}
  });
}

const findAllKingdomTroops = async (kingdomId) => {
  return Troops.findAll({
    where: {
      kingdomId: kingdomId
    }
  })
}

const findRandomKingdomTroop = async (kingdomId) => {
  return Troops.findOne({
    where: {
      [Op.and]: [
        {kingdomId},
        {quantity: {[Op.gt]: 0}}
      ],
    },
    order: sequelize.random()
  });
}

const findRandomKingdomTroopInBattle = async (kingdomId) => {
  return Troops.findOne({
    where: {
      [Op.and]: [
        {kingdomId},
        {quantityInBattle: {[Op.gt]: 0}}
      ],
    },
    order: sequelize.random()
  });
}

const findTroopInBattle = async (type, kingdomId) => {

  return AttackerTroopsToBattle.findOne({
    include: [{model: Battle, as: 'attackerTroopsToBattle'}],
    where: {
      [Op.and]: [
        {type},
        sequelize.literal('attacking_kingdom_id = ' + kingdomId)
      ],
    }
  });

}

const findArrivedSettlers = async () => {
  return Troops.findAll({
    where: {
      timeOfArrival: {
        [Op.lte]: Math.floor(Date.now() / 1000)
      }
    }
  });
}

const findReturnedSettlers = async () => {
  return Troops.findAll({
    where: {
      timeOfComeback: {
        [Op.lte]: Math.floor(Date.now() / 1000)
      }
    }
  });
}

export default {
  createTroop,
  findRecruitedKingdomTroops,
  findRecruitedTroopTypeByKingdomId,
  findRandomKingdomTroop,
  findRandomKingdomTroopInBattle,
  findTroopInBattle,
  findArrivedSettlers,
  findReturnedSettlers,
  findAllKingdomTroops
}
