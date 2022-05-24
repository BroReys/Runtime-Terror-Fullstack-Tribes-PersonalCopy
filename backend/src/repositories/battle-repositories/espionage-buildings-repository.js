import EspionageBuildings from "../../models/espionage/espionage-buildings";

const create = async (espionageBuilding) => {
  let saved = await EspionageBuildings.create(espionageBuilding);
  return saved;
};
export default {
  create
};
