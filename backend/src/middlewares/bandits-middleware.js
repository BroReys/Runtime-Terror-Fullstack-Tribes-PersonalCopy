import UserService from "../services/user-service";
import banditsUtil from '../utilities/bandits'
import KingdomService from "../services/kingdom-service";
import {aiRules} from "../rules/ai-rules";

const banditsMiddleware = async (res, req, next) => {
  let aiRuler = await UserService.findByUsername('AI-ruler');
  let kingdoms = await aiRuler.getKingdoms();
  kingdoms = kingdoms.filter(kingdom => kingdom.deletedAt === null);
  let banditsKingdoms = kingdoms.filter(
      kingdom => kingdom.name.startsWith('Bandits'));

  if (banditsKingdoms) {
    for (let i = 0; i < banditsKingdoms.length; i++) {
      if (banditsKingdoms[i].createdAt + 86400 < Date.now() / 1000) {
        banditsKingdoms[i].deletedAt = Date.now() / 1000;
        banditsKingdoms[i].coordinateX = null;
        banditsKingdoms[i].coordinateY = null;
        await banditsKingdoms[i].save();
        await banditsUtil.destroyBandits(banditsKingdoms[i].id);
      }
    }
  }
  let reloadedKingdoms = await aiRuler.getKingdoms();
  reloadedKingdoms = reloadedKingdoms.filter(kingdom => kingdom.deletedAt === null);
  reloadedKingdoms = reloadedKingdoms.filter(kingdom => kingdom.name.startsWith('Bandits'));

  if (reloadedKingdoms.length === 0) {
    let firstPlayer = await KingdomService.getFirstPlayer();
    let timeDiff = Math.floor(
        (Math.floor(Date.now() / 1000) - firstPlayer.registeredAt) / 86400);
    timeDiff = timeDiff > aiRules().maxDays ? aiRules().maxDays : timeDiff;
    await banditsUtil.createBandits(timeDiff)
  }

  next();
};

export default banditsMiddleware;
