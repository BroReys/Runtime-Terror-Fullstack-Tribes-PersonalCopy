import Building from "../models/building";
import sequelize from "../config/database";
import Kingdom from "../models/kingdom";
import {Op} from "sequelize";
import UserService from "../services/user-service";

const getKingdomsBuildingPoints = async () => {
  let user = await UserService.findByUsername('AI-ruler');
  return Building.findAll({
    include: {
      model: Kingdom, as: 'buildings',
      where: {'userId': {[Op.not]: user.id}},
      attributes: [],
    },
    attributes: ['kingdomId',
      [sequelize.fn('sum', sequelize.col(`level`)), 'total'],
    ],
    group: ['kingdomId'],
    raw: true,
    order: sequelize.literal('total DESC')
  });
};

const getRulerBuildingPoints = async () => {
  let user = await UserService.findByUsername('AI-ruler');
  return Building.findAll({
    include: {
      model: Kingdom, as: 'buildings',
      where: {'userId': {[Op.not]: user.id}},
      attributes: [],
    },
    attributes: ['kingdomId','buildings.userId',
      [sequelize.fn('sum', sequelize.col(`level`)), 'total'],
    ],
    group: ['userId'],
    raw: true,
    order: sequelize.literal('total DESC')
  })
};

export default {getKingdomsBuildingPoints, getRulerBuildingPoints};
