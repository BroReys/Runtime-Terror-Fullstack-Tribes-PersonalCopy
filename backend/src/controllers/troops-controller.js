import TroopsInBarracksService
  from "../services/troops-services/troops-in-barracks-service";
import TroopsService from "../services/troops-services/troops-service";
import TroopsRepository
  from "../repositories/troops-repositories/troops-repository";

const create = async (req, res) => {
  let type = req.body.type;
  let quantity = req.body.quantity;
  let kingdomId = req.params.id;
  let user = req.user

  const status = await TroopsInBarracksService
  .trainTroop(type,quantity,kingdomId,user);

  switch (status) {
    case "missing_field":
      res.status(400).json({error: "One of the required fields missing!"});
      break;
    case "kingdom_not_exists":
      res.status(400).json({error: "Kingdom does not exists!"});
      break;
    case "wrong_kingdom_id":
      res.status(403).json({error: "You are not authorized, wrong kingdom ID"});
      break;
    case "no_gold":
      res.status(400).json({error: "Not enough gold for this amount of troops!"});
      break;
    case "wrong_type":
      res.status(400).json({error: "Wrong type of troop!"});
      break;
    case "settler_only_one":
      res.status(400).json({error: "You can have only one group of settlers in game!"});
      break;
    case "no_barracks":
      res.status(400).json({error: "You have no barracks! Build the barracks first."});
      break;
    case "barracks_destroyed":
      res.status(400).json({error: "Barracks is destroyed, build the new barracks!"});
      break;
    case "already_built_settler":
      res.status(400).json({error: "Settlers are already built!"});
      break;
    case "ok":
      const kingdomTroopsInBarracks = await TroopsInBarracksService
      .findKingdomTroopsInBarracks(kingdomId)
      res.status(200).json(kingdomTroopsInBarracks);
      break;
  }
}

const showTroopArmies = async (req,res) => {
  let kingdomId = req.params.id;
  let token = req.user;

  const status = await TroopsService
  .listAllRecruitedKingdomTroops(kingdomId,token);

  switch (status) {
    case "no_authorized":
      res.status(403).json({error: "You are not authorized!"});
      break;
    case "kingdom_not_exists":
      res.status(400).json({error: "Wrong kingdom ID"});
      break;
    case "ok":
      const recruitedKingdomTroops = await TroopsRepository
      .findRecruitedKingdomTroops(kingdomId);
      res.status(200).json(recruitedKingdomTroops);
      break;
  }
}

const showKingdomTroopsInBarracksByType = async (req,res) => {
  let kingdomId = req.params.id;
  let troopType = req.params.type;

  let kingdomTroopsInBarracksByType = await TroopsInBarracksService
  .findKingdomTroopsInBarracksByType(kingdomId,troopType);
  res.status(200).json(kingdomTroopsInBarracksByType);
}

const removeTroopsFromQueuePerType = async (req,res) => {
  let kingdomId = req.params.id;
  let troopType = req.params.type;
  let quantity = req.body.quantity;

  let status = await TroopsInBarracksService
  .removeKingdomTroopsInBarracksByType(kingdomId,troopType,quantity);

  switch (status) {
    case "wong_type":
      res.status(400).json({error: "Please select at least one unit to remove"});
      break;
    case "wrong_quantity":
      res.status(400).json({error: "Please select at least one unit to remove"});
      break;
    case "ok_removed":
      res.status(200).json('Troops removed!');
      break;
  }
}

export default {
  create,
  showTroopArmies,
  showKingdomTroopsInBarracksByType,
  removeTroopsFromQueuePerType
}