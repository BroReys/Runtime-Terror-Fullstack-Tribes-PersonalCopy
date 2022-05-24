import KingdomService from "../services/kingdom-service";
import generateErrorMessage from "../utilities/error-message";

const create = async (req, res) => {
  const {status, error, message} = await KingdomService.createKingdom({...req.body});

  if (error) {
    return res.status(status).json(generateErrorMessage(error));
  } else {
    return res.status(status).json(message);
  }
};

const updateKingdomName = async (req, res) => {
  let userId = req.user.id
  const {status, error, message} = await KingdomService.updateKingdomName(
      req.params.id,
      req.body.kingdomName,userId);

  if (error) {
    res.status(status).json(generateErrorMessage(error));
  } else {
    res.status(status).json({status: message});
  }
};

const getKingdomDetails = async (req,res) => {
  let userId = req.user.id
  const {status, error, details} = await KingdomService.getKingdomDetails(req.params.id,userId);

  if (error) {
    res.status(status).json(generateErrorMessage(error));
  } else {
    res.status(status).json(details);
  }
};

const getAllKingdoms = async (req, res) => {
  let allKingdoms = await KingdomService.getDTOAllKingdoms();
  res.json(allKingdoms);
}

const getKingdoms = async (req, res) => {
  let allKingdoms = await KingdomService.getAllUsersKingdomsOrdered(req.user.id);
  res.status(200).json(allKingdoms);
}

export default {
  create,
  updateKingdomName,
  getKingdomDetails,
  getAllKingdoms,
  getKingdoms
}
