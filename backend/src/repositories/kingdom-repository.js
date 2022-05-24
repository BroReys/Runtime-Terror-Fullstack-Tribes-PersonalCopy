import Kingdom from "../models/kingdom";
import Troops from "../models/troops-models/troops";
import Building from "../models/building";
import sequelize from "../config/database";
import User from "../models/user";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";
import kingdom from "../models/kingdom";

const createKingdom = async (kingdom) => Kingdom.create(kingdom);

const save = async (kingdom) => kingdom.save();

const findKingdomById = async (id) => Kingdom.findByPk(id);

const findKingdomByUserId = async (userId) => Kingdom.findOne(
    {where: {userId}});

const findKingdomsByUserId = async (userId) => Kingdom.findAll(
    {where: {userId}});

const findKingdomsByUserIdOrderedByAcquiredAt = async (userId) => Kingdom.findAll({
      where: {userId},
      order: sequelize.literal('acquiredAt ASC')
});

const getAllKingdoms = async () => Kingdom.findAll();

const getKingdomsTroops = async (kingdomId) => Troops.findAll({
    where: {kingdomId},
    attributes: {exclude: ['kingdomId','unitLevelId','destroyTime']}}
);

const getKingdomsBuildings = async (kingdomId) => Building.findAll({
    where: {kingdomId},
    attributes: {exclude: ['kingdomId']}}
);

const getWinnerStats = async () => await Kingdom.findAll({
      group: 'userId',
      attributes:
          [
            [sequelize.fn('COUNT', sequelize.col('userId')), 'count'],
            'userId'
          ],
      order: sequelize.literal('count DESC'),
      limit: 1
    }
);

const count = async () => Kingdom.count();

const getFirstPlayer = async () => await Kingdom.findOne({
  include: User,
  order: sequelize.literal('registeredAt ASC')
});

const destroyBandits = async () => Kingdom.destroy({
    where: {
        userId: null
    }
});

export default {
  save,
  createKingdom,
  findKingdomByUserId,
  findKingdomsByUserIdOrderedByAcquiredAt,
  getAllKingdoms,
  getKingdomsBuildings,
  getKingdomsTroops,
  findKingdomById,
  getWinnerStats,
  count,
  getFirstPlayer,
  findKingdomsByUserId,
  destroyBandits
};
