import AttackerLostTroops
  from "../../models/battle/attacker-lost-troops-in-battle";

const create = async (attackerTroop) => {
  await AttackerLostTroops.create(attackerTroop);
};

export default {
  create
};
