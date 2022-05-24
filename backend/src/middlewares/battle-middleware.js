import BattleService from "../services/battle-service";
import resourcesService from "../services/resources-service";

const battleMiddleware = async (req, res, next) => {
  let finishedBattles = await BattleService.findAllFinished();
  let unfinishedBattles = await BattleService.findAllUnfinished();

  await startBattle(unfinishedBattles);
  await returnTroopsToKingdom(finishedBattles);
  next();
};

const startBattle = async (battles) => {
  if (battles) {
    for (let i = 0; i < battles.length; i++) {

      let currentTime = Math.floor(Date.now() / 1000);

      let timeDiff = Math.floor(
          battles[i].timeOfArrival - currentTime);

      if (timeDiff > 0) {
        continue;
      }
      let attackingKingdom = await battles[i].getAttackingKingdom();
      let defendingKingdom = await battles[i].getDefendingKingdom();

      try {
        await resourcesService.updateResourcesByKingdomId(attackingKingdom.id);
        await resourcesService.updateResourcesByKingdomId(defendingKingdom.id);
        await BattleService.startBattle(battles[i]);

      } catch (e) {
        battles[i].isFinished = true;

        try {
          await BattleService.returnTroopsToKingdom(battles[i]);
        } catch (ignoredException) {}

        await battles[i].save();
      }
    }
  }
};

const returnTroopsToKingdom = async (battles) => {
  if (battles) {
    for (let i = 0; i < battles.length; i++) {

      if (!(await areTroopsStillInBattle(battles[i]))) {
        continue
      }
      let currentTime = Math.floor(Date.now() / 1000);

      let timeDiff = Math.floor(
          battles[i].timeOfComeback - currentTime);

      if (timeDiff > 0) {
        continue;
      }
      await BattleService.returnTroopsToKingdom(battles[i]);
    }
  }
};

const areTroopsStillInBattle = async (battle) => {

  let areTroopsStillInBattle = false;
  try {
    let troopsInBattle = await battle.getAttackerTroopsToBattle();
    if (troopsInBattle.length > 0) {
      for (let j = 0; j < troopsInBattle.length; j++) {
        if (troopsInBattle[j].quantity > 0) {
          areTroopsStillInBattle = true;
          return areTroopsStillInBattle;
        }
      }
    }
  } catch (e) {
    areTroopsStillInBattle = false;
  }
  return areTroopsStillInBattle;
};

export default battleMiddleware;
