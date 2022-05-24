import EspionageReport from "../../models/espionage/espionage-report";

const create = async (totalTroops, totalAttackPower, totalDefensePower, gold,
    food, loyalty, battle) => {
  let espionageReport = {
    totalTroops: totalTroops,
    totalAttackPower: totalAttackPower,
    totalDefensePower: totalDefensePower,
    gold: gold,
    food: food,
    loyalty: loyalty,
    battleId: battle.id
  };
  let savedReport = await EspionageReport.create(espionageReport);
  return savedReport;
};

export default {
  create
};
