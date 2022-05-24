import KingdomService from "../services/kingdom-service";
import UserService from "../services/user-service";
import {rules} from "../rules/rules";

const winner_middleware = async (req, res, next) => {
  let gameOver = false;
  let winner;

  let total_kingdoms = await KingdomService.getKingdomsCount();

  //Game is over when one ruler owns more than {rules}/ratio % of kingdoms.
  //And when first player started before more than {rules}/registration_window seconds (days)

  let game_stats = await KingdomService.getWinnerStats();
  let current_ratio = game_stats.count / total_kingdoms;

  if (current_ratio > rules().winning_rules.ratio) {

    winner = await UserService.findById(game_stats.userId);
    if(winner.username !== "AI-ruler"){
      let first_player = await KingdomService.getFirstPlayer();
      let registration_length = Math.floor(Date.now() / 1000)
          - first_player.user.registeredAt;

      if (registration_length > rules().winning_rules.registration_window) {
        gameOver = true;
      }
    }
  }

  //If game is over, send info to user, otherwise continue to endpoint
  if (gameOver) {
    res.send({status: "Game over! Winner is: " + winner.username});
  } else {
    next();
  }

}

export default winner_middleware;