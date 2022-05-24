import DefenderLostTroopsInBattle
  from "../../models/battle/defender-lost-troops-in-battle";

const create = async (defenderTroop) => {
  await DefenderLostTroopsInBattle.create(defenderTroop);
};

export default {
  create
};
