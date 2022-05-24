import Building from "../models/building";
import {Op} from "sequelize";
import sequelize from "../config/database";

const findAll = async () => {
  return Building.findAll();
}

const findAllByKingdomIdAndStatusTrue = async (kingdomId) => {
  return Building.findAll({
    attributes: ["position", "id", "type", "level", "status", "startTime", "endTime", "destroyTime"],
    where: {
      kingdomId: kingdomId,
      status: true
    },
    raw: true,
    nest: true
  })
}

const findAllByKingdomIdAndStatusFalse = async (kingdomId) => {
  return Building.findAll({
    attributes: ["position", "id", "type", "level", "status", "startTime", "endTime", "destroyTime"],
    where: {
      kingdomId: kingdomId,
      status: false
    },
  })
}

const findTownhallByKingdomId = async (kingdomId) => {
  return Building.findOne({
    attributes: ["position", "id", "type", "level", "status", "startTime", "endTime", "destroyTime"],
    where: {
      kingdomId: kingdomId,
      type: "townhall"
    },
  })
}

const findAllByKingdomIdWhereType = async (kingdomId, type) => {
  return Building.findAll({
    where: {
      kingdomId: kingdomId,
      type: type
    }
  })
}

const findOneByKingdomIdWhereType = async (kingdomId, type) => {
  return Building.findOne({
    where: {
      kingdomId: kingdomId,
      type: type
    }
  })
}

const createBuilding = async (building) => {
  return Building.create(building);
}

const saveBuilding = async (building) => {
  return building.save();
}

const destroyBuilding = async (building) => {
  return building.destroy();
}

const findBuildingByPk = async (buildingId) => {
  return Building.findByPk(buildingId);
}

const findAllBuiltAndActiveByKingdomId = async (kingdomId) => {
  return Building.findAll({
    where: {
      kingdomId: kingdomId,
      status: true,
      endTime: {[Op.lte]: Date.now() / 1000}
    }
  })
}

const findAllInProgressUntil = async (kingdomId, currentTick) => {
  return Building.findAll({
    where: {
      kingdomId: kingdomId,
      status: false,
      endTime: {[Op.lte]: currentTick}
    }
  })
}

const countDestroyableBuildingsExcept = async (kingdomId, buildingType) => {
  return Building.count({
    where: {
      kingdomId: kingdomId,
      status: true,
      [Op.and] : [
        {type: {[Op.ne] : buildingType}},
        {type: {[Op.ne] : "townhall"}}
      ]
    }
  });
}

const getRandomBuildingExcept = async (kingdomId, buildingType) => {
  return Building.findOne({
    where: {
      kingdomId: kingdomId,
      status: true,
      [Op.and] : [
        {type: {[Op.ne] : buildingType}},
        {type: {[Op.ne] : "townhall"}}
      ]
    },
    order: sequelize.random()
  })
}

const findAcademyByKingdomId = async (kingdomId) => {
  return Building.findOne({
    attributes: ["position", "id", "type", "level", "status", "startTime", "endTime", "destroyTime"],
    where: {
      kingdomId: kingdomId,
      type: "academy"
    },
   })
}

const findBarracksByKingdomId = async (kingdomId) => {
  return Building.findOne({
    attributes: ["position", "id", "type", "level", "status", "startTime", "endTime", "destroyTime"],
    where: {
      kingdomId: kingdomId,
      type: "barracks"
    },
  })
}

export default {
  findAll,
  findAllByKingdomIdAndStatusTrue,
  findAllByKingdomIdAndStatusFalse,
  createBuilding,
  saveBuilding,
  destroyBuilding,
  findBuildingByPk,
  findAllByKingdomIdWhereType,
  findOneByKingdomIdWhereType,
  findTownhallByKingdomId,
  findAllBuiltAndActiveByKingdomId,
  findAcademyByKingdomId,
  countDestroyableBuildingsExcept,
  getRandomBuildingExcept,
  findAllInProgressUntil,
  findBarracksByKingdomId
}
