import UnitLevelService from "../services/unit-level-service";


const upgradeTroop = async (req,res) => {
  let type = req.body.type;
  let kingdomId = req.params.id;
  let user = req.user;

  const status = await UnitLevelService.upgradeUnitLevel(type,kingdomId,user);

  switch (status) {
    case "wrong_type":
      res.status(400).json({error: "One of the required fields missing!"});
      break;
    case "kingdom_not_exists":
      res.status(400).json({error: "Kingdom does not exists!"});
      break;
    case "wrong_kingdom_id":
      res.status(403).json({error: "You are not authorized, wrong kingdom ID"});
      break;
    case "wrong_troop_type":
      res.status(400).json({error: "Wrong troop type inserted!"});
      break;
    case "no_gold":
      res.status(400).json({error: "You have not enough gold!"});
      break;
    case "no_academy":
      res.status(400).json({error: "You have no academy built!"});
      break;
    case "still_upgrading":
      res.status(400).json({error: "Troops are still upgrading!"});
      break;
    case "academy_destroyed":
      res.status(400).json({error: "Your academy was destroyed. You can't upgrade troops!"});
      break;
    case "max_level":
      res.status(400).json({error: "Already reached max level!"});
      break;
    case "ok":
      res.status(200).json({success: "Successfully queued for upgrade! "});
      break;
  }
}

const getMappedTroopRules = async (req,res) => {
  let kingdomId = req.params.id;

  let mappedTroopRules = await UnitLevelService
  .mapAndGetCorrespondingUnitLevelsByKingdomId(kingdomId);
  res.status(200).json(mappedTroopRules);
}

const showActualUnitLevel = async (req,res) => {
  let kingdomId = req.params.id;
  let troopType = req.params.type;
  let currentUnitLevel = await UnitLevelService.getCurrentUnitLevelByKingdomId(kingdomId,troopType);
  if (currentUnitLevel === "error") {
    res.status(400).json({error: " Error"});
  }
  res.status(200).json(currentUnitLevel);

}

export default {
  upgradeTroop,
  getMappedTroopRules,
  showActualUnitLevel
}