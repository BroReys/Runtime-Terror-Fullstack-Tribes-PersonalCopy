import UnitLevel from "../models/unit-level";
import Troops from "../models/troops-models/troops";


const generateUnitLevel = async (unitLevel) => UnitLevel.create(unitLevel);

const findUnitLevelByTroopTypeAndByKingdomId = async (kingdomId, type) => {
  const unitLevel = await UnitLevel.findOne({
    where: {
      kingdomId: kingdomId,
      type: type
    }
  })
  return unitLevel;
}

const findAllUnitLevelsByKingdomId = async (kingdomId) => {
  return UnitLevel.findAll( {
    where: {
      kingdomId: kingdomId
    }
  })
}

const findAllUnitLevelsByKingdomIdRaw = async (kingdomId) => {
  return UnitLevel.findAll( {raw:true},{
    where: {
      kingdomId: kingdomId
    }
  })
}

const save = async (unitLevel) => {
  unitLevel.save();
}

export default {
  generateUnitLevel,
  findUnitLevelByTroopTypeAndByKingdomId,
  findAllUnitLevelsByKingdomId,
  findAllUnitLevelsByKingdomIdRaw,
  save
}