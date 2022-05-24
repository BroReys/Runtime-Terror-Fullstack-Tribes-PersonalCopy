import Battle from "../../models/battle/battle";
import sequelize from "../../config/database";
import EspionageReport from "../../models/espionage/espionage-report";
import {Op} from "sequelize";

const create = async (battleToSave) => {
  let savedBattle = await Battle.create(battleToSave);
  return savedBattle;
};

const findAll = async () => {
  return await Battle.findAll();
};

const findById = async (id) => {
  return await Battle.findOne({
    where: {
      id: id
    }
  });
};

const findAllUnfinished = async () => {
  return await Battle.findAll({
    where: {
      isFinished: false
    }
  })
};

const findAllFinished = async () => {
  return await Battle.findAll({
    where: {
      isFinished: true
    }
  })
};

const findAllAsAttackingKingdom = async (kingdomId) => {
  return await Battle.findAll({
    where: {
      attacking_kingdom_id: kingdomId
    },
    order: [
      ['beenRead'],
      sequelize.literal('timeOfComeback DESC'),
      ['isFinished']
    ]
  });
};

const findAllAsDefendingKingdom = async (kingdomId) => {
  return await Battle.findAll({
    where: {
      defending_kingdom_id: kingdomId
    },
    order: [
      ['beenRead'],
      sequelize.literal('timeOfArrival DESC'),
      ['isFinished']
    ]
  });
};

const findFinishedByAttackingAndDefendingKingdom = async (attackingKingdomId,
    defendingKingdomId) => {
  return await Battle.findOne({
    include: {
      model: EspionageReport, as: 'espionageReport',
      where: {
        battleId: {
          [Op.ne]: null
        }
      }
    },
    where: {
      defending_kingdom_id: defendingKingdomId,
      attacking_kingdom_id: attackingKingdomId,
      isFinished: true
    },
    order: sequelize.literal('startedAt DESC')
  });
};

const findAllUnfinishedIncoming = async (kingdomId) => {
  return await Battle.findAll({
    where: {
      defending_kingdom_id: kingdomId,
      isFinished: false
    },
    order: sequelize.literal('timeOfArrival ASC'),
  });
};

const findAllUnfinishedOutgoing = async (kingdomId) => {
  return await Battle.findAll({
    where: {
      attacking_kingdom_id: kingdomId,
      isFinished: false
    },
    order: sequelize.literal('timeOfComeback ASC')
  });
};

export default {
  create,
  findById,
  findAllUnfinished,
  findAllFinished,
  findAllAsAttackingKingdom,
  findAllAsDefendingKingdom,
  findFinishedByAttackingAndDefendingKingdom,
  findAllUnfinishedIncoming,
  findAllUnfinishedOutgoing
};

