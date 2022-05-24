import Troops from "../../models/troops-models/troops";
import kingdom from "../../models/kingdom";
import sequelize from "../../config/database";
import Troops_in_barracks from "../../models/troops-models/troops-in-barracks";
import {Op} from "sequelize";

const createTroop = async (troop) => {
  const newTroop = await Troops_in_barracks.create(troop);
  return newTroop;
}

const findKingdomTroopsInBarracks = async (kingdomId) => {
  return Troops_in_barracks.findAll({where: {kingdomId}});
}

const findAllByKingdomIdAndUntil = async (kingdomId, currentTick) => {
  return Troops_in_barracks.findAll({
    where: {
      kingdomId: kingdomId,
      endTime: {[Op.lte]: currentTick}
    }
  });
}

const findKingdomTroopsInBarracksByTypeAndOrderByEndtimeDesc = async (kingdomId, type) => {
  return await sequelize
  .query(`SELECT * FROM troops_in_barracks WHERE type = '${type}' AND kingdomId = ${kingdomId} ORDER BY endTime DESC`);
}

const findTrainedKingdomTroopsInBarracksByType = async (kingdomId, type, currentTick) => {
  if(!currentTick){
    currentTick = Date.now()/1000;
  }
  return await sequelize
  .query(`SELECT * FROM troops_in_barracks WHERE type = '${type}' AND kingdomId = ${kingdomId} AND endTime <= ${currentTick};`);
}

const deleteAllAlreadyTrainedTroops = async () => {
  await sequelize
  .query(`DELETE FROM troops_in_barracks WHERE endTime <= ${Date.now()/1000};`)
}

const bulkCreateTroops = async (troops) => {
  await Troops_in_barracks.bulkCreate(troops);
}

const bulkDestroyTroopsInBarracks = async (arrayOfTroopsIds) => {
  await Troops_in_barracks.destroy({
    where: { id : arrayOfTroopsIds }
  });
}


export default {
  createTroop,
  findKingdomTroopsInBarracks,
  findKingdomTroopsInBarracksByTypeAndOrderByEndtimeDesc,
  findTrainedKingdomTroopsInBarracksByType,
  deleteAllAlreadyTrainedTroops,
  bulkCreateTroops,
  findAllByKingdomIdAndUntil,
  bulkDestroyTroopsInBarracks
}
