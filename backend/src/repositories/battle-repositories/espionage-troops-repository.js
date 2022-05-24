import EspionageTroops from "../../models/espionage/espionage-troops";

const create = async (espionageTroop) => {
  let saved = await EspionageTroops.create(espionageTroop);
  return saved;
};
export default {
  create
};
