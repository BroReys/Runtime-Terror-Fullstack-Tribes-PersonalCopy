import {rules} from "../rules/rules";
import KingdomService from "../services/kingdom-service";
import BuildingService from "../services/building-service";
import TroopsService from "../services/troops-services/troops-service";
import resourcesService from "../services/resources-service";

const update_middleware = async (req, res, next) => {

  let kingdoms = await KingdomService.getAllKingdomsByUserId(req.user.id);
  if (kingdoms) {

    for (let kingdom of kingdoms) {
      //how many whole ticks elapsed from last sync
      let currentTick = Math.floor(Date.now() / 1000);
      let elapsedTicks = (currentTick - kingdom.lastTick) / rules().tick_length;
      elapsedTicks = Math.floor(elapsedTicks);

      //if no tick elapsed, skip to next Kingdom
      if (elapsedTicks === 0) {
        continue;
      }

      await resourcesService.updateResources(kingdom, currentTick);

    }
  }

  next();
};

export default update_middleware;
