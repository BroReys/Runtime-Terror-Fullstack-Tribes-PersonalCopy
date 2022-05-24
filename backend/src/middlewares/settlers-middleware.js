import SettleService from "../services/settle-service";

const settleMiddleware = async (req, res, next) => {

  let arrivedSettlers = await SettleService.findArrivedSettlers();
  let returnedSettlers = await SettleService.findReturnedSettlers();

  if (arrivedSettlers) {
    await SettleService.tileCheckOfArrivedSettlers(arrivedSettlers);

  }

  if (returnedSettlers) {
    await SettleService.setPropertiesOfReturnedSettlers(returnedSettlers);

  }

  next();
}

export default settleMiddleware;
