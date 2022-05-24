import AttackerTroopsToBattle
  from "../../models/battle/attacker-troops-to-battle";

const create = async (troops, battle) => {
  for (let i = 0; i < troops.length; i++) {
    let attackerTroop = {
      type: troops[i].type,
      quantity: troops[i].quantity,
      battleId: battle.id
    };
    await AttackerTroopsToBattle.create(attackerTroop);
  }
};

export default {
  create
};
