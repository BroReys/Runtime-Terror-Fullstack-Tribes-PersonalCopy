import LeaderboardService from "../services/leaderboard-service";
import generateErrorMessage from "../utilities/error-message";

const getKingdomPoints = async (req, res) => {

  const {status, error, leaderboard} = await LeaderboardService.getLeaderboardsByKingdoms();

  if (error) {
    return res.status(status).json(generateErrorMessage(error));
  } else {
    return res.status(status).json(leaderboard);
  }
};

const getRulerPoints = async (req,res) => {

  const {status, error, leaderboard} = await LeaderboardService.getLeaderboardsByRulers();

  if (error) {
    return res.status(status).json(generateErrorMessage(error));
  } else {
    return res.status(status).json(leaderboard);
  }
};

export default {
  getKingdomPoints,
  getRulerPoints
}